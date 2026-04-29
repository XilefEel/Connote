import { Elysia, t } from "elysia";
import { db } from "../db";
import {
  notesTable,
  tagsTable,
  noteTagsTable,
  noteVersionsTable,
  pullRequestsTable,
} from "../db/schema";
import { eq, and } from "drizzle-orm";

// get all tags for a note
export const getNoteTags = async (noteId: number) => {
  const result = await db
    .select({ name: tagsTable.name })
    .from(tagsTable)
    .innerJoin(noteTagsTable, eq(noteTagsTable.tagId, tagsTable.id))
    .where(eq(noteTagsTable.noteId, noteId));

  return result.map((t) => t.name);
};

// update tags for a note
// delete existing tags and reinsert it
const syncTags = async (noteId: number, tagNames: string[]) => {
  await db.delete(noteTagsTable).where(eq(noteTagsTable.noteId, noteId));

  for (const name of tagNames) {
    const trimmed = name.toLowerCase().trim();
    if (!trimmed) continue;

    const tag = db
      .insert(tagsTable)
      .values({ name: trimmed })
      .onConflictDoUpdate({ target: tagsTable.name, set: { name: trimmed } })
      .returning()
      .get();

    await db.insert(noteTagsTable).values({ noteId, tagId: tag.id });
  }
};

// create a new version entry for a note
const createVersion = async (
  noteId: number,
  version: string,
  author: string,
  changeSummary: string,
) => {
  await db.insert(noteVersionsTable).values({
    noteId,
    version,
    author,
    changeSummary,
    createdAt: new Date().toISOString(),
  });
};

export const notesRoutes = new Elysia({ prefix: "/notes" })
  // get all notes
  .get(
    "/",
    async ({ query }) => {
      const { q, sort, minForks, minContributors } = query;

      const allNotes = await db.select().from(notesTable);

      const withTags = await Promise.all(
        allNotes.map(async (note) => ({
          ...note,
          tags: await getNoteTags(note.id),
        })),
      );

      return withTags
        .filter(
          (n) =>
            !q ||
            n.title.toLowerCase().includes(q.toLowerCase()) ||
            n.description.toLowerCase().includes(q.toLowerCase()) ||
            n.tags.some((t) => t.includes(q.toLowerCase())),
        )

        .filter((n) => !minForks || n.forks >= minForks)

        .filter((n) => !minContributors || n.contributors >= minContributors)

        .sort((a, b) => {
          if (sort === "likes") return b.likes - a.likes;
          if (sort === "forks") return b.forks - a.forks;
          if (sort === "contributors") return b.contributors - a.contributors;
          if (sort === "recent")
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

          return b.likes - a.likes;
        });
    },
    {
      query: t.Object({
        q: t.Optional(t.String()),
        sort: t.Optional(t.String()),
        minForks: t.Optional(t.Numeric()),
        minContributors: t.Optional(t.Numeric()),
      }),
    },
  )

  // get single note
  .get("/:id", async ({ params, set }) => {
    const note = db
      .select()
      .from(notesTable)
      .where(eq(notesTable.id, Number(params.id)))
      .get();

    if (!note) {
      set.status = 404;
      return { message: "Note not found" };
    }

    return { ...note, tags: await getNoteTags(note.id) };
  })

  // create new note
  .post(
    "/",
    async ({ body }) => {
      const { tags: tagNames, ...noteData } = body;

      console.log("inserting note:", noteData);

      const note = db
        .insert(notesTable)
        .values({
          ...noteData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .returning()
        .get();

      console.log("note created:", note);

      await syncTags(note.id, tagNames);

      await createVersion(
        note.id,
        note.version,
        note.author,
        "Initial version",
      );

      return { ...note, tags: await getNoteTags(note.id) };
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        content: t.String(),
        author: t.String(),
        tags: t.Array(t.String()),
        visibility: t.Union([t.Literal("public"), t.Literal("private")]),
      }),
    },
  )

  // fork a note from id
  // (create a new note with same content but different author)
  .post(
    "/:id/fork",
    async ({ params, body, set }) => {
      const original = db
        .select()
        .from(notesTable)
        .where(eq(notesTable.id, Number(params.id)))
        .get();

      if (!original) {
        set.status = 404;
        return { message: "Note not found" };
      }

      const { id, createdAt, updatedAt, forks, ...rest } = original;

      // create new note
      const forked = db
        .insert(notesTable)
        .values({
          ...rest,
          author: body.author,
          forkedFrom: original.id,
          version: "1.0",
          likes: 0,
          comments: 0,
          forks: 0,
          contributors: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .returning()
        .get();

      const originalTags = await getNoteTags(original.id);
      await syncTags(forked.id, originalTags);

      await createVersion(
        forked.id,
        forked.version,
        forked.author,
        "forked note",
      );

      // increment fork count on original note
      await db
        .update(notesTable)
        .set({ forks: (original.forks ?? 0) + 1 })
        .where(eq(notesTable.id, original.id));

      return { ...forked, tags: await getNoteTags(forked.id) };
    },
    {
      body: t.Object({
        author: t.String(),
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body, set }) => {
      const existing = db
        .select()
        .from(notesTable)
        .where(eq(notesTable.id, Number(params.id)))
        .get();

      if (!existing) {
        set.status = 404;
        return { message: "Note not found" };
      }

      const [major, minor] = existing.version.split(".").map(Number);
      const newVersion = `${major}.${minor + 1}`;

      const { tags: tagNames, ...noteData } = body;

      const updated = db
        .update(notesTable)
        .set({
          ...noteData,
          version: newVersion,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(notesTable.id, Number(params.id)))
        .returning()
        .get();

      if (tagNames) await syncTags(updated.id, tagNames);

      await createVersion(
        updated.id,
        updated.version,
        body.commitAuthor || existing.author,
        body.changeSummary || "Updated note",
      );

      return { ...updated, tags: await getNoteTags(updated.id) };
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        description: t.Optional(t.String()),
        content: t.Optional(t.String()),
        tags: t.Optional(t.Array(t.String())),
        changeSummary: t.Optional(t.String()),
        commitAuthor: t.Optional(t.String()),
      }),
    },
  )

  .get("/:id/versions", async ({ params }) => {
    const versions = await db
      .select()
      .from(noteVersionsTable)
      .where(eq(noteVersionsTable.noteId, Number(params.id)));

    return { versions };
  })

  .post(
    "/:id/pull-requests",
    async ({ params, body, set }) => {
      const original = db
        .select()
        .from(notesTable)
        .where(eq(notesTable.id, Number(params.id)))
        .get();

      if (!original) {
        set.status = 404;
        return { message: "Note not found" };
      }

      const pr = db
        .insert(pullRequestsTable)
        .values({
          noteId: Number(params.id),
          author: body.author,
          title: body.title,
          content: body.content,
          status: "open",
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();

      return { pullRequest: pr };
    },
    {
      body: t.Object({
        author: t.String(),
        title: t.String(),
        content: t.String(),
      }),
    },
  )

  .get("/:id/pull-requests", async ({ params }) => {
    const prs = await db
      .select()
      .from(pullRequestsTable)
      .where(eq(pullRequestsTable.noteId, Number(params.id)));

    return { pullRequests: prs };
  })

  .patch(
    "/pull-requests/:id",
    async ({ params, body, set }) => {
      console.log("Updating PR with id:", params.id, "and body:", body);

      const pr = db
        .select()
        .from(pullRequestsTable)
        .where(eq(pullRequestsTable.id, Number(params.id)))
        .get();

      if (!pr) {
        set.status = 404;
        return { message: "Pull request not found" };
      }

      if (body.status === "merged") {
        const original = db
          .select()
          .from(notesTable)
          .where(eq(notesTable.id, pr.noteId))
          .get();

        if (original) {
          const [major, minor] = original.version.split(".").map(Number);
          const newVersion = `${major}.${minor + 1}`;

          const updated = db
            .update(notesTable)
            .set({
              content: pr.content,
              version: newVersion,
              updatedAt: new Date().toISOString(),
            })
            .where(eq(notesTable.id, pr.noteId))
            .returning()
            .get();

          await createVersion(
            updated.id,
            updated.version,
            pr.author,
            `Merged PR: ${pr.title}`,
          );
        }
      }

      const updatedPR = db
        .update(pullRequestsTable)
        .set({ status: body.status })
        .where(eq(pullRequestsTable.id, Number(params.id)))
        .returning()
        .get();

      return { pullRequest: updatedPR };
    },
    {
      body: t.Object({
        status: t.Optional(
          t.Union([
            t.Literal("open"),
            t.Literal("closed"),
            t.Literal("merged"),
          ]),
        ),
      }),
    },
  )

  .get("/:id/fork/:username", async ({ params }) => {
    const fork = db
      .select()
      .from(notesTable)
      .where(
        and(
          eq(notesTable.forkedFrom, Number(params.id)),
          eq(notesTable.author, params.username),
        ),
      )
      .get();

    return { fork: fork ?? null };
  });

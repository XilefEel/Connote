import { Elysia, t } from "elysia";
import { db } from "../db";
import { notesTable, tagsTable, noteTagsTable } from "../db/schema";
import { eq } from "drizzle-orm";

// get all tags for a note
async function getNoteTags(noteId: number) {
  const result = await db
    .select({ name: tagsTable.name })
    .from(tagsTable)
    .innerJoin(noteTagsTable, eq(noteTagsTable.tagId, tagsTable.id))
    .where(eq(noteTagsTable.noteId, noteId));

  return result.map((t) => t.name);
}

// update tags for a note
// delete existing tags and reinsert it
async function syncTags(noteId: number, tagNames: string[]) {
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
}

export const notesRoutes = new Elysia({ prefix: "/notes" })
  // get all notes
  .get("/", async () => {
    const allNotes = await db.select().from(notesTable);

    return await Promise.all(
      allNotes.map(async (note) => ({
        ...note,
        tags: await getNoteTags(note.id),
      })),
    );
  })

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

      const note = db
        .insert(notesTable)
        .values({
          ...noteData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        .returning()
        .get();

      await syncTags(note.id, tagNames);

      return { ...note, tags: await getNoteTags(note.id) };
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        content: t.String(),
        author: t.String(),
        tags: t.Array(t.String()),
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
  // src/routes/notes.ts
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

      return { ...updated, tags: await getNoteTags(updated.id) };
    },
    {
      body: t.Object({
        title: t.Optional(t.String()),
        description: t.Optional(t.String()),
        content: t.Optional(t.String()),
        tags: t.Optional(t.Array(t.String())),
        changeSummary: t.Optional(t.String()),
      }),
    },
  );

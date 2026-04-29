import { Elysia } from "elysia";
import { db } from "../db";
import { notesTable, pullRequestsTable } from "../db/schema";
import { eq, and, isNull, isNotNull } from "drizzle-orm";
import { getNoteTags } from "./note";

export const usersRoutes = new Elysia({ prefix: "/users" }).get(
  "/:username",
  async ({ params }) => {
    const allNotes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.author, params.username));

    const notes = allNotes.filter((n) => n.forkedFrom === null);
    const forks = allNotes.filter((n) => n.forkedFrom !== null);

    const [withTags, openPRs] = await Promise.all([
      Promise.all(
        allNotes.map(async (note) => ({
          ...note,
          tags: await getNoteTags(note.id),
        })),
      ),
      db
        .select()
        .from(pullRequestsTable)
        .where(
          and(
            eq(pullRequestsTable.author, params.username),
            eq(pullRequestsTable.status, "open"),
          ),
        ),
    ]);

    return {
      user: { username: params.username },
      stats: {
        notesCreated: notes.length,
        forksCount: forks.length,
        openPRsCount: openPRs.length,
      },
      notes: withTags,
      openPRs,
    };
  },
);

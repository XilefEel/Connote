import { Elysia } from "elysia";
import { db } from "../db";
import { notesTable, pullRequestsTable } from "../db/schema";
import { eq, and, isNull, isNotNull } from "drizzle-orm";
import { getNoteTags } from "./note";

export const usersRoutes = new Elysia({ prefix: "/users" }).get(
  "/:username",
  async ({ params, set }) => {
    const userNotes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.author, params.username));

    if (!userNotes.length) {
      set.status = 404;
      return { message: "User not found" };
    }

    const withTags = await Promise.all(
      userNotes.map(async (note) => ({
        ...note,
        tags: await getNoteTags(note.id),
      })),
    );

    const [notes, forks, openPRs] = await Promise.all([
      db
        .select()
        .from(notesTable)
        .where(
          and(
            eq(notesTable.author, params.username),
            isNull(notesTable.forkedFrom),
          ),
        ),

      db
        .select()
        .from(notesTable)
        .where(
          and(
            eq(notesTable.author, params.username),
            isNotNull(notesTable.forkedFrom),
          ),
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
      },
      notes: withTags,
      openPRs: openPRs,
    };
  },
);

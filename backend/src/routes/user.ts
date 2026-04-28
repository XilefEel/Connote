import { Elysia } from "elysia";
import { db } from "../db";
import { notesTable } from "../db/schema";
import { eq } from "drizzle-orm";
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

    return {
      user: { username: params.username },
      notes: withTags,
    };
  },
);

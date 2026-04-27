import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// notes table
export const notesTable = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  content: text("content").notNull().default(""),
  author: text("author").notNull(),
  version: text("version").notNull().default("1.0"),
  likes: integer("likes").notNull().default(0),
  comments: integer("comments").notNull().default(0),
  forks: integer("forks").notNull().default(0),
  contributors: integer("contributors").notNull().default(0),
  forkedFrom: integer("forked_from"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()),
});

// tags table
export const tagsTable = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

// join table for notes and tags
export const noteTagsTable = sqliteTable(
  "note_tags",
  {
    noteId: integer("note_id")
      .notNull()
      .references(() => notesTable.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tagsTable.id),
  },
  (table) => [uniqueIndex("note_tags_unique").on(table.noteId, table.tagId)],
);

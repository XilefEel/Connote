import type { NewNote, Note, NoteVersion } from "../types/note";

const BASE_URL = "http://localhost:3000";

export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) throw new Error("Failed to fetch notes");
    return response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const getNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`);
    if (!response.ok) throw new Error("Failed to fetch note");
    return response.json();
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

export const createNote = async (note: NewNote): Promise<Note> => {
  try {
    console.log("Creating note with data:", note);

    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    if (!response.ok) throw new Error("Failed to create note");
    return response.json();
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const forkNoteById = async (
  id: string,
  author: string,
): Promise<Note> => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/fork`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author }),
    });

    if (!response.ok) throw new Error("Failed to fork note");
    return response.json();
  } catch (error) {
    console.error("Error forking note:", error);
    throw error;
  }
};

export const updateNote = async (
  id: string,
  note: Partial<NewNote> & { changeSummary?: string; commitAuthor?: string },
): Promise<Note> => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    if (!response.ok) throw new Error("Failed to update note");
    return response.json();
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const getNoteVersionsById = async (
  id: string,
): Promise<NoteVersion[]> => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/versions`);
    if (!response.ok) throw new Error("Failed to fetch note versions");
    const data = await response.json();
    return data.versions;
  } catch (error) {
    console.error("Error fetching note versions:", error);
    throw error;
  }
};

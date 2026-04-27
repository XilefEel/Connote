import type { NewNote, Note } from "../types/note";

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

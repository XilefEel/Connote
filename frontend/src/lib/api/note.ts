import type { NewNote, Note, NoteVersion, PullRequest } from "../types/note";
import { BASE_URL } from "../utils";

export const getNotes = async (params?: {
  q?: string;
  sort?: string;
  minForks?: number;
  minContributors?: number;
}): Promise<Note[]> => {
  try {
    const query = new URLSearchParams();

    if (params?.q) query.set("q", params.q);
    if (params?.sort) query.set("sort", params.sort);
    if (params?.minForks) query.set("minForks", String(params.minForks));
    if (params?.minContributors)
      query.set("minContributors", String(params.minContributors));

    const response = await fetch(`${BASE_URL}/notes?${query.toString()}`);
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

    return response.json();
  } catch (error) {
    console.error("Error fetching note versions:", error);
    throw error;
  }
};

export const getPullRequests = async (
  noteId: string,
): Promise<PullRequest[]> => {
  const response = await fetch(`${BASE_URL}/notes/${noteId}/pull-requests`);
  if (!response.ok) throw new Error("Failed to fetch PRs");

  return response.json();
};

export const submitPullRequest = async (
  noteId: string,
  body: {
    author: string;
    title: string;
    content: string;
  },
): Promise<PullRequest> => {
  const response = await fetch(`${BASE_URL}/notes/${noteId}/pull-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("Failed to submit PR");
  return response.json();
};

export const updatePullRequest = async (
  prId: string,
  status: "merged" | "rejected",
): Promise<PullRequest> => {
  const response = await fetch(`${BASE_URL}/notes/pull-requests/${prId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Failed to update PR");
  return response.json();
};

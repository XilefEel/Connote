import type { Note, PullRequest } from "../types/note";
import type { User } from "../types/user";
import { BASE_URL } from "../utils";

export const getUserDataByUsername = async (
  username: string,
): Promise<{
  user: User;
  stats: {
    notesCreated: number;
    forksCount: number;
  };
  notes: Note[];
  openPRs: PullRequest[];
}> => {
  const response = await fetch(`${BASE_URL}/users/${username}`);

  if (!response.ok) throw new Error("User not found");
  return response.json();
};

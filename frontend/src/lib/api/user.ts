import type { Note } from "../types/note";
import type { User } from "../types/user";

const BASE_URL = "http://localhost:3000";

export const getUserByUsername = async (
  username: string,
): Promise<{ user: User; notes: Note[] }> => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) throw new Error("User not found");
  return response.json();
};

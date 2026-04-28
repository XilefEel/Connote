import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { NoteVersion } from "./types/note";
import type { Contributor } from "./types/user";

export const BASE_URL = "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getContributors = (versions: NoteVersion[]): Contributor[] => {
  const map = versions.reduce(
    (acc, version) => {
      acc[version.author] = (acc[version.author] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(map).map(([username, edits]) => ({
    username,
    edits,
    pfp: username.slice(0, 2).toUpperCase(),
  }));
};

export const timeAgo = (time: string) => {
  const diff = Date.now() - new Date(time).getTime();

  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

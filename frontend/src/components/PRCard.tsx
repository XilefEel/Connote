import { Link } from "react-router-dom";
import { timeAgo } from "../lib/utils";
import type { PullRequest } from "../lib/types/note";
import { getNoteById } from "../lib/api/note";
import { useState, useEffect } from "react";

export default function PRCard({ pr }: { pr: PullRequest }) {
  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const notes = await getNoteById(String(pr.noteId));
      setNoteTitle(notes.title);
    };

    fetchNote();
  }, [pr.noteId]);

  return (
    <div className="flex min-h-24 w-full flex-col gap-2 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-100">{pr.title}</h2>

        <span className="text-xs text-zinc-500">
          <Link
            to={`/profile/${pr.author}`}
            className="transition-colors hover:text-teal-400"
          >
            {pr.author}
          </Link>{" "}
          • {timeAgo(pr.createdAt)}
        </span>
      </div>

      <div className="mt-auto flex flex-row items-center justify-between border-t border-zinc-700 pt-2">
        <span className="text-xs text-zinc-500">
          on{" "}
          <Link
            to={`/note/${pr.noteId}`}
            className="transition-colors hover:text-teal-400"
          >
            {noteTitle}
          </Link>
        </span>

        <span className="ml-auto text-xs text-zinc-500">#{pr.id}</span>
      </div>
    </div>
  );
}

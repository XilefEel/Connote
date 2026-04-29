import { GitFork, MessageSquare, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import type { Note } from "../lib/types/note";
import { timeAgo } from "../lib/utils";

export default function NoteCard({
  note,
  compact,
}: {
  note: Note;
  compact?: boolean;
}) {
  return (
    <div className="flex min-h-40 w-full flex-col rounded-xl border border-zinc-700 bg-zinc-900 p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2">
          {note.tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full bg-teal-800 px-2 py-px transition-colors hover:text-zinc-200"
            >
              <span className="text-xs text-teal-100">{tag}</span>
            </div>
          ))}
        </div>

        <span className="text-xs text-zinc-500">
          <Link
            to={`/profile/${note.author}`}
            className="transition-colors hover:text-teal-400"
          >
            {note.author}{" "}
          </Link>
          • {timeAgo(note.updatedAt)}
        </span>
      </div>

      <div className="mt-1 flex flex-col gap-1">
        <Link to={`/note/${note.id}`}>
          <h2 className="text-base font-semibold text-zinc-100 transition-colors hover:text-teal-200">
            {note.title}
          </h2>
        </Link>

        <p className="text-xs text-zinc-400">{note.description}</p>
      </div>

      <div className="mt-auto flex flex-row gap-5 border-t border-zinc-700 pt-2 text-xs text-zinc-300">
        <div className="flex items-center gap-2 rounded transition-colors hover:text-zinc-200">
          <ThumbsUp size={12} />
          {note.likes} {!compact && "likes"}
        </div>

        <div className="flex items-center gap-2 rounded transition-colors hover:text-zinc-200">
          <MessageSquare size={12} />
          {note.comments} {!compact && "comments"}
        </div>

        <div className="flex items-center gap-2 rounded transition-colors hover:text-zinc-200">
          <GitFork size={12} />
          {note.forks} {!compact && "forked"}
        </div>

        <div className="ml-auto flex items-center gap-2 rounded bg-teal-900 px-2 py-0.5 text-teal-100 transition-colors hover:text-zinc-200">
          v{note.version} • {note.contributors} contributors
        </div>
      </div>
    </div>
  );
}

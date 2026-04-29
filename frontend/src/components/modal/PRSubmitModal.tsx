import { useState } from "react";
import { getCurrentUser } from "../../lib/api/auth";
import { submitPullRequest } from "../../lib/api/note";
import type { Note } from "../../lib/types/note";
import { GitMerge, X } from "lucide-react";

export default function PRSubmitModal({
  note,
  userFork,
  onClose,
}: {
  note: Note;
  userFork: Note;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const currentUser = getCurrentUser();

  const handleSubmit = async () => {
    await submitPullRequest(note.id.toString(), {
      author: currentUser.username,
      title,
      content: userFork.content,
    });

    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-400">
            <GitMerge size={18} />
            <span className="font-semibold">Submit Pull Request</span>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-zinc-500">
          You are proposing changes to
          <span className="mx-1 text-teal-400">{note.author}</span>
          's note
        </p>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="PR title..."
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-teal-500"
        />

        <div className="flex justify-between gap-2 pt-2">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-zinc-800 px-4 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-1.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-teal-400"
          >
            Submit PR
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { getCurrentUser } from "../../lib/api/auth";
import { submitPullRequest } from "../../lib/api/note";
import type { Note } from "../../lib/types/note";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-semibold text-zinc-200">Submit Pull Request</h2>

        <p className="text-xs text-zinc-500">
          You are proposing changes to
          <span className="mx-1 text-teal-400">{note.author}</span>
          's note
        </p>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="PR title — what did you change?"
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-teal-500"
        />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-800 py-2 text-sm text-zinc-400 hover:text-zinc-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 rounded-lg bg-teal-500 py-2 text-sm font-medium text-zinc-950 hover:bg-teal-400 disabled:opacity-50"
          >
            Submit PR
          </button>
        </div>
      </div>
    </div>
  );
}

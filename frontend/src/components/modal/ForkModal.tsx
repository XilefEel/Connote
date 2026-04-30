import { useNavigate } from "react-router-dom";
import { GitFork, X } from "lucide-react";
import { forkNoteById } from "../../lib/api/note";
import { getCurrentUser } from "../../lib/api/auth";
import type { Note } from "../../lib/types/note";

export default function ForkModal({
  note,
  onClose,
}: {
  note: Note;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const handleFork = async () => {
    const user = getCurrentUser();
    const forked = await forkNoteById(note.id.toString(), user.username);

    navigate(`/note/${forked.id}`);
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
            <GitFork size={18} />
            <span className="font-semibold">Fork catatan ini</span>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-zinc-400">
          Kamu akan membuat fork dari catatan
          <span className="font-medium text-zinc-200"> "{note.title}" </span>
          dari
          <span className="font-medium text-teal-400"> {note.author}</span>
        </p>

        <p className="text-xs text-zinc-600">
          Kamu akan membuat salinan catatan di bawah akunmu. Kamu dapat
          mengeditnya secara bebas dan mengirimkan PR kembali ke catatan
          aslinya.
        </p>

        <div className="flex justify-between gap-2 pt-2">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-zinc-800 px-4 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
          >
            Cancel
          </button>

          <button
            onClick={handleFork}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-1.5 text-sm font-medium text-zinc-100 transition-colors hover:bg-teal-400"
          >
            <GitFork size={14} />
            Fork
          </button>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import type { Note } from "../../lib/types/note";
import type { User } from "../../lib/types/user";

export default function ForkedFrom({
  note,
  originalNote,
  setShowPRModal,
  user,
}: {
  note: Note;
  originalNote: Note | null;
  setShowPRModal: (show: boolean) => void;
  user: User;
}) {
  return (
    <div className="border-t border-t-zinc-800 pt-4">
      <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        Forked From
      </h3>

      <p className="flex flex-col text-xs font-semibold text-zinc-600">
        <span>
          {originalNote ? (
            <div>
              This note is a fork of{" "}
              <Link
                to={`/note/${note.forkedFrom}`}
                className="text-teal-500 hover:text-teal-400"
              >
                {originalNote.title}
              </Link>
            </div>
          ) : (
            "this is an original note"
          )}
        </span>

        {note.forkedFrom && user.username === note.author && (
          <button
            onClick={() => setShowPRModal(true)}
            className="mt-3 cursor-pointer rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-500"
          >
            Submit PR
          </button>
        )}
      </p>
    </div>
  );
}

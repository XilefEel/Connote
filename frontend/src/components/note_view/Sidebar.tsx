import { type NoteVersion, type Note } from "../../lib/types/note";
import { useEffect, useState } from "react";
import { getNoteById, getNoteVersionsById } from "../../lib/api/note";
import PRSubmitModal from "../modal/PRSubmitModal";
import { getCurrentUser } from "../../lib/api/auth";
import type { Editor } from "@tiptap/react";
import Contributors from "./Contributors";
import VersionHistory from "./VersionHistory";
import ForkedFrom from "./ForkedFrom";
import PullRequests from "./PullRequests";

export default function Sidebar({
  note,
  setNote,
  editor,
}: {
  note: Note;
  setNote: (note: Note) => void;
  editor: Editor;
}) {
  const user = getCurrentUser();

  const [originalNote, setOriginalNote] = useState<Note | null>(null);
  const [showPRModal, setShowPRModal] = useState(false);
  const [versionHistory, setVersionHistory] = useState<NoteVersion[]>(
    [] as NoteVersion[],
  );

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNoteVersionsById(String(note.id));
      setVersionHistory(data.reverse());
    };

    fetchNote();
  }, [note.id]);

  useEffect(() => {
    const fetchOriginalNote = async () => {
      if (note.forkedFrom) {
        const data = await getNoteById(String(note.forkedFrom));
        setOriginalNote(data);
      }
    };

    fetchOriginalNote();
  }, [note.forkedFrom]);

  return (
    <div className="flex h-full w-64 flex-col gap-4 overflow-y-auto border-l border-l-zinc-700 p-3 px-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Deskripsi
        </h3>

        <p className="text-xs text-zinc-300">
          {note.description
            ? note.description
            : "Tidak ada deskripsi untuk catatan ini."}
        </p>
      </div>

      <Contributors versionHistory={versionHistory} />

      <VersionHistory versionHistory={versionHistory} />

      <ForkedFrom
        note={note}
        originalNote={originalNote}
        setShowPRModal={setShowPRModal}
        user={user}
      />

      {user.username === note.author && (
        <PullRequests note={note} setNote={setNote} editor={editor} />
      )}

      {originalNote && showPRModal && (
        <PRSubmitModal
          note={originalNote}
          userFork={note}
          onClose={() => setShowPRModal(false)}
        />
      )}
    </div>
  );
}

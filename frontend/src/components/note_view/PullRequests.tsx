import type { Editor } from "@tiptap/react";
import {
  updatePullRequest,
  getPullRequests,
  getNoteById,
} from "../../lib/api/note";
import type { Note, PullRequest } from "../../lib/types/note";
import { useEffect, useState } from "react";

export default function PullRequests({
  note,
  setNote,
  editor,
}: {
  note: Note;
  setNote: (note: Note) => void;
  editor: Editor;
}) {
  const [prs, setPrs] = useState<PullRequest[]>([]);

  const handleMerge = async (prId: number) => {
    await updatePullRequest(prId.toString(), "merged");

    const data = await getPullRequests(String(note.id));
    setPrs(data);

    const updatedNote = await getNoteById(String(note.id));
    setNote(updatedNote);
    editor?.commands.setContent(
      updatedNote.content ? JSON.parse(updatedNote.content) : "",
    );
  };

  const handleReject = async (prId: number) => {
    await updatePullRequest(prId.toString(), "rejected");
  };

  useEffect(() => {
    const fetchPRs = async () => {
      const data = await getPullRequests(String(note.id));
      setPrs(data);
    };

    fetchPRs();
  }, [note.id]);

  return (
    <div className="border-t border-t-zinc-800 pt-4">
      <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        Open Pull Requests
      </h3>

      {prs.filter((pr) => pr.status === "open").length === 0 ? (
        <p className="text-xs text-zinc-600">No open pull requests</p>
      ) : (
        <div className="flex flex-col gap-2">
          {prs
            .filter((pr) => pr.status === "open")
            .map((pr) => (
              <div
                key={pr.id}
                className="flex flex-col gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2"
              >
                <p className="text-sm text-zinc-200">{pr.title}</p>
                <p className="text-xs text-zinc-500">
                  by {pr.author} · {pr.createdAt.slice(0, 10)}
                </p>

                <div className="mt-1 flex gap-2">
                  <button
                    onClick={() => handleReject(pr.id)}
                    className="flex-1 rounded border border-zinc-700 py-1 text-xs text-zinc-400 hover:text-zinc-200"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleMerge(pr.id)}
                    className="flex-1 rounded bg-teal-600 py-1 text-xs text-white hover:bg-teal-500"
                  >
                    Merge
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

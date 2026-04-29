import { useState } from "react";
import { cn } from "../../lib/utils";
import { Check, CircleDot, Dot } from "lucide-react";
import type { NewNote } from "../../lib/types/note";
import { createNote, updateNote } from "../../lib/api/note";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../../lib/api/auth";

export default function Sidebar({
  mode,
  note,
  setNote,
}: {
  mode: "create" | "edit";
  note: NewNote;
  setNote: (note: NewNote) => void;
}) {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const [description, setDescription] = useState(note.description || "");
  const [changeSummary, setChangeSummary] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  const beforePublishing = [
    { criteria: "judul sudah diisi", complete: !!note.title },
    { criteria: "konten sudah diisi", complete: !!note.content },
    { criteria: "minimal ada 1 tag", complete: note.tags.length > 0 },
  ];

  const incompleteNote =
    !note.title ||
    !note.content ||
    note.tags.length === 0 ||
    (mode === "edit" && changeSummary.trim() === "");

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
    setNote({ ...note, description: newDescription });
  };

  const handleVisibilityChange = (newVisibility: "public" | "private") => {
    setVisibility(newVisibility);
    setNote({ ...note, visibility: newVisibility as "public" | "private" });
  };

  const handlePublish = () => {
    createNote(note);
    navigate(`/note/${id}`);
  };

  const handleCommit = () => {
    if (!id || incompleteNote) return;

    updateNote(id, {
      ...note,
      description,
      visibility,
      changeSummary,
      commitAuthor: user.username,
    });

    navigate(`/note/${id}`);
  };

  return (
    <div className="flex h-full w-64 flex-col gap-4 overflow-y-auto border-l border-l-zinc-700 p-3 px-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Deskripsi
        </h3>

        <textarea
          className="min-h-40 w-full rounded bg-zinc-900 p-3 text-xs text-zinc-100 outline-none"
          placeholder="Deskripsi catatan (opsional)"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
      </div>

      <div className="mb-auto">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Visibilitas
        </h3>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleVisibilityChange("public")}
            className={cn(
              "flex cursor-pointer flex-row items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors",
              visibility === "public"
                ? "border border-teal-600 bg-teal-950/50"
                : "border border-zinc-700 text-zinc-300 hover:border-zinc-500",
            )}
          >
            <CircleDot
              className={cn(
                "size-4 shrink-0",
                visibility === "public" ? "text-teal-500" : "text-zinc-500",
              )}
            />

            <div className="flex flex-col items-start">
              <span className="text-zinc-100">Publik</span>
              <span className="text-start text-zinc-500">
                dapat ditemukan dan di-fork oleh siapa saja
              </span>
            </div>
          </button>

          <button
            onClick={() => handleVisibilityChange("private")}
            className={cn(
              "flex cursor-pointer flex-row items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors",
              visibility === "private"
                ? "border border-teal-600 bg-teal-950/50"
                : "border border-zinc-700 text-zinc-300 hover:border-zinc-500",
            )}
          >
            <CircleDot
              className={cn(
                "size-4",
                visibility === "private" ? "text-teal-500" : "text-zinc-500",
              )}
            />
            <div className="flex flex-col items-start">
              <span className="text-zinc-100">Tersembunyi</span>
              <span className="text-zinc-500">hanya terlihat oleh kamu</span>
            </div>
          </button>
        </div>
      </div>

      {mode === "create" && (
        <div className="border-t border-t-zinc-800 pt-4">
          <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            Sebelum menerbitkan
          </h3>

          <div className="flex flex-col gap-2">
            {beforePublishing.map((item) => (
              <div
                key={item.criteria}
                className="flex items-center gap-2 text-xs"
              >
                {item.complete ? (
                  <Check className="size-3 text-green-500" />
                ) : (
                  <Dot className="size-3 text-zinc-600" />
                )}
                <span className={cn("tracking-wide text-zinc-400")}>
                  {item.criteria}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "edit" && (
        <textarea
          className="min-h-20 w-full rounded bg-zinc-900 p-3 text-xs text-zinc-100 outline-none"
          placeholder="ringkasan perubahan (wajib diisi)"
          value={changeSummary}
          onChange={(e) => setChangeSummary(e.target.value)}
        />
      )}

      <button
        onClick={mode === "create" ? handlePublish : handleCommit}
        disabled={incompleteNote}
        className="cursor-pointer rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-600"
      >
        {mode === "create" ? "Terbitkan" : "Commit"}
      </button>
    </div>
  );
}

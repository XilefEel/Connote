import { Grid2X2, Menu } from "lucide-react";
import NoteCard from "../NoteCard";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { cn } from "../../lib/utils";
import type { Note } from "../../lib/types/note";

export default function MainView({ notes }: { notes: Note[] }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">
            hasil untuk <span className="text-teal-400">"{query}"</span>
          </h1>
          <p className="text-xs text-zinc-500">{notes.length} catatan</p>
        </div>

        <div className="flex flex-row items-center text-zinc-200 hover:text-zinc-100">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "cursor-pointer rounded-l p-2 transition-colors",
              viewMode === "list"
                ? "bg-teal-500 hover:bg-teal-400"
                : "bg-zinc-800 hover:bg-zinc-700",
            )}
          >
            <Menu size={16} />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "cursor-pointer rounded-r p-2 transition-colors",
              viewMode === "grid"
                ? "bg-teal-500 hover:bg-teal-400"
                : "bg-zinc-800 hover:bg-zinc-700",
            )}
          >
            <Grid2X2 size={16} />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "gap-3",
          viewMode === "list" ? "flex flex-col" : "grid grid-cols-2",
        )}
      >
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} compact={viewMode === "grid"} />
        ))}
      </div>
    </div>
  );
}

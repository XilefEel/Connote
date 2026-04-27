import { Grid2X2, Menu, X } from "lucide-react";
import NoteCard from "../NoteCard";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import type { Note } from "../../lib/types/note";
import { getNotes } from "../../lib/api/note";

const filters = [
  "algorithms",
  "exam prep",
  "interview prep",
  "data structures",
  "2+ contributors",
];

export default function MainView() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [notes, setNotes] = useState<Note[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNotes();
      setNotes(data);
    };

    fetchNote();
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">
            results for <span className="text-blue-400">"{query}"</span>
          </h1>
          <p className="text-xs text-gray-500">24 notes</p>
        </div>

        <div className="flex flex-row items-center text-gray-200 hover:text-gray-100">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "cursor-pointer rounded-l p-2 transition-colors",
              viewMode === "list"
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-gray-800 hover:bg-gray-700",
            )}
          >
            <Menu size={16} />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "cursor-pointer rounded-r p-2 transition-colors",
              viewMode === "grid"
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-gray-800 hover:bg-gray-700",
            )}
          >
            <Grid2X2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-1.5">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-1 rounded-lg border border-gray-700 px-3 py-0.5 hover:bg-gray-900"
          >
            <button className="text-xs text-gray-300 transition-colors hover:text-gray-100">
              {filter}
            </button>

            <button>
              <X
                size={12}
                className="text-gray-500 transition-colors hover:text-gray-400"
              />
            </button>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "gap-3",
          viewMode === "list" ? "flex flex-col" : "grid grid-cols-2",
        )}
      >
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
}

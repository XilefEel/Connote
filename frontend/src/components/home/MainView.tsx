import { useEffect, useState } from "react";
import NoteCard from "../NoteCard";
import { getNotes } from "../../lib/api/note";
import type { Note } from "../../lib/types/note";

const filters = [
  "All",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Computer Science",
  "Biology",
];

export default function MainView() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes();
      setNotes(notes);
    };

    fetchNotes();
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-2">
      <div>
        <h1 className="text-2xl font-bold text-white">Explore Notes</h1>

        <div className="mt-2 flex flex-row gap-1.5">
          {filters.map((filter, index) => (
            <button
              key={index}
              className="rounded-lg border border-gray-700 px-3 py-0.5 text-xs text-gray-300 transition-colors hover:bg-gray-900 hover:text-gray-100"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
}

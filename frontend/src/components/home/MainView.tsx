import { useEffect, useState } from "react";
import NoteCard from "../NoteCard";
import { getNotes } from "../../lib/api/note";
import type { Note } from "../../lib/types/note";

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
      <h1 className="text-2xl font-bold text-white">Explore Notes</h1>

      <div className="flex flex-col gap-3">
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import NoteCard from "../NoteCard";
import { cn } from "../../lib/utils";
import { getNotes } from "../../lib/api/note";

const tabs = [
  { label: "my notes", value: 7 },
  { label: "forks", value: 19 },
  { label: "pull requests", value: 8 },
  { label: "likes", value: 15 },
];

export default function MainView() {
  const [activeTab, setActiveTab] = useState(0);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes();
      setNotes(notes);
    };

    fetchNotes();
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-3">
      <div className="flex flex-row gap-8 border-b border-gray-700 pb-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className="group relative flex cursor-pointer flex-row items-center justify-center gap-1 rounded-lg px-4 text-xs font-semibold tracking-wide transition-colors"
          >
            <span
              className={cn(
                "text-gray-300 transition-colors group-hover:text-white",
                activeTab === index && "text-white",
              )}
            >
              {tab.label}
            </span>

            <span className="text-gray-500">({tab.value})</span>

            {activeTab === index && (
              <div className="absolute -bottom-2 h-0.5 w-full bg-blue-500" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} />
        ))}
      </div>
    </div>
  );
}

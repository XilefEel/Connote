import { useState } from "react";
import NoteCard from "../NoteCard";
import { cn } from "../../lib/utils";
import type { Note } from "../../lib/types/note";
import type { User } from "../../lib/types/user";
import { Notebook, GitFork, GitPullRequest, Heart } from "lucide-react";

export default function MainView({
  user,
  notes,
}: {
  user: User;
  notes: Note[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      Icon: Notebook,
      label: "Notes",
      value: notes.filter((note) => note.author === user.username).length,
    },
    { Icon: GitFork, label: "Forks", value: 19 },
    { Icon: GitPullRequest, label: "Pull Requests", value: 8 },
    { Icon: Heart, label: "Likes", value: 15 },
  ];

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-3">
      <div className="flex flex-row gap-8 border-b border-zinc-700 pb-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className="group relative flex cursor-pointer flex-row items-center justify-center gap-1 rounded-lg px-4 text-xs font-semibold tracking-wide transition-colors"
          >
            <tab.Icon
              className={cn(
                "text-zinc-300 transition-colors group-hover:text-white",
                activeTab === index && "text-white",
              )}
              size={14}
            />

            <span
              className={cn(
                "text-zinc-300 transition-colors group-hover:text-white",
                activeTab === index && "text-white",
              )}
            >
              {tab.label}
            </span>

            <span className="text-zinc-500">({tab.value})</span>

            {activeTab === index && (
              <div className="absolute -bottom-2 h-0.5 w-full bg-teal-500" />
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

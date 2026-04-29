import { useState } from "react";
import NoteCard from "../NoteCard";
import { cn } from "../../lib/utils";
import type { Note, PullRequest } from "../../lib/types/note";
import { Notebook, GitFork, GitPullRequest, Heart } from "lucide-react";
import PRCard from "../PRCard";

export default function MainView({
  notes,
  openPrs,
}: {
  notes: Note[];
  openPrs: PullRequest[];
}) {
  const [activeTab, setActiveTab] = useState<
    "Notes" | "Forks" | "Pull Requests" | "Likes"
  >("Notes");

  const tabs = [
    {
      Icon: Notebook,
      label: "Notes",
      value: notes.filter((n) => !n.forkedFrom).length,
    },
    {
      Icon: GitFork,
      label: "Forks",
      value: notes.filter((n) => n.forkedFrom).length,
    },
    { Icon: GitPullRequest, label: "Pull Requests", value: openPrs.length },
    { Icon: Heart, label: "Likes", value: 0 },
  ];

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-3">
      <div className="flex flex-row gap-8 border-b border-zinc-700 pb-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() =>
              setActiveTab(
                tab.label as "Notes" | "Forks" | "Pull Requests" | "Likes",
              )
            }
            className="group relative flex cursor-pointer flex-row items-center justify-center gap-1 rounded-lg px-4 text-xs font-semibold tracking-wide transition-colors"
          >
            <tab.Icon
              className={cn(
                "text-zinc-300 transition-colors group-hover:text-white",
                activeTab === tab.label && "text-white",
              )}
              size={14}
            />

            <span
              className={cn(
                "text-zinc-300 transition-colors group-hover:text-white",
                activeTab === tab.label && "text-white",
              )}
            >
              {tab.label}
            </span>

            <span className="text-zinc-500">({tab.value})</span>

            {activeTab === tab.label && (
              <div className="absolute -bottom-2 h-0.5 w-full bg-teal-500" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {activeTab === "Notes" &&
          notes
            .filter((n) => !n.forkedFrom)
            .map((note) => <NoteCard key={note.id} note={note} />)}

        {activeTab === "Forks" &&
          notes
            .filter((n) => n.forkedFrom)
            .map((note) => <NoteCard key={note.id} note={note} />)}

        {activeTab === "Pull Requests" &&
          openPrs.map((pr) => <PRCard key={pr.id} pr={pr} />)}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { cn, getContributors, timeAgo } from "../../lib/utils";
import { type NoteVersion, type Note } from "../../lib/types/note";
import { useEffect, useState } from "react";
import { getNoteVersionsById } from "../../lib/api/note";

const notableForks = [
  {
    id: 30,
    author: "Eve",
    title: "heaps & PQ edition",
    likes: 5,
    version: "v1.0",
  },
  {
    id: 31,
    author: "Frank",
    title: "AVL trees added",
    likes: 3,
    version: "v1.0",
  },
];

export default function SidebarLeft({ note }: { note: Note }) {
  const [versionHistory, setVersionHistory] = useState<NoteVersion[]>(
    [] as NoteVersion[],
  );

  const contributors = getContributors(versionHistory);

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNoteVersionsById(String(note.id));
      setVersionHistory(data.reverse());
    };

    fetchNote();
  }, [note.id]);

  return (
    <div className="flex h-full w-64 flex-col gap-4 overflow-y-auto border-l border-l-zinc-700 p-3 px-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Description
        </h3>

        <p className="text-xs text-zinc-300">
          {note.description
            ? note.description
            : "No description provided for this note."}
        </p>
      </div>

      <div className="border-t border-t-zinc-800 pt-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Contributors
        </h3>

        <div className="flex flex-col gap-2">
          {contributors.map((c, index) => (
            <div key={index} className="flex items-center gap-3 rounded px-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white">
                {c.pfp}
              </div>

              <Link
                to={`/profile/${c.username}`}
                className="text-sm font-medium text-zinc-300 hover:text-teal-400"
              >
                {c.username}
              </Link>

              <span className="ml-auto text-xs text-zinc-500">
                {c.edits} {c.edits > 1 ? "edits" : "edit"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-t-zinc-800 pt-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Version History
        </h3>

        <div className="flex flex-col gap-2">
          {versionHistory.map((version, index) => (
            <div className="flex items-center gap-3 rounded px-3" key={index}>
              <div
                className={cn(
                  "flex size-4 items-center justify-center rounded-full text-xs font-semibold text-zinc-300",
                  index === 0
                    ? "border-2 border-teal-400 bg-teal-700"
                    : "bg-zinc-700",
                )}
              />

              <div className="flex flex-col rounded tracking-wide">
                <span
                  className={cn(
                    "text-sm font-medium text-zinc-300",
                    index === 0 && "font-semibold text-teal-400",
                  )}
                >
                  v{version.version} {index === 0 && "- current"}
                </span>

                <span className="text-xs text-zinc-500">
                  <Link
                    to={`/profile/${version.author}`}
                    className="hover:text-teal-400"
                  >
                    {version.author}
                  </Link>{" "}
                  • {timeAgo(version.createdAt)}
                </span>

                <span className="truncate text-xs text-zinc-500">
                  {version.changeSummary}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-t-zinc-800 pt-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Forked From
        </h3>

        <p className="text-xs font-semibold text-zinc-600">
          {note.forkedFrom
            ? `This note is a fork of id:${note.forkedFrom}.`
            : "this is an original note"}
        </p>
      </div>

      <div className="border-t border-t-zinc-800 pt-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
          Notable Forks
        </h3>

        <div className="flex flex-col gap-2">
          {notableForks.map((fork, index) => (
            <div
              key={index}
              className="flex flex-col gap-0.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-teal-500">{fork.author}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">{fork.title}</span>
              </div>

              <div className="flex items-center gap-2 text-xs tracking-wide text-zinc-600">
                <span>{fork.likes} likes</span>
                <span>•</span>
                <span> {fork.version}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

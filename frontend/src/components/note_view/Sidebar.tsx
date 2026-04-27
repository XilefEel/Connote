import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { type NoteVersion, type Note } from "../../lib/types/note";
import { useEffect, useState } from "react";
import { getNoteVersionsById } from "../../lib/api/note";

const contributors = [
  { pfp: "AL", username: "Alice", edits: 4 },
  { pfp: "BO", username: "Bob", edits: 1 },
  { pfp: "CH", username: "Charlie", edits: 2 },
  { pfp: "DA", username: "David", edits: 1 },
];

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

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNoteVersionsById(String(note.id));
      setVersionHistory(data.reverse());
    };

    fetchNote();
  }, [note.id]);

  return (
    <div className="flex h-full w-64 flex-col gap-4 border-l border-l-gray-700 p-3 px-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Contributors
        </h3>

        <div className="flex flex-col gap-2">
          {contributors.map((c, index) => (
            <div key={index} className="flex items-center gap-3 rounded px-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs font-semibold text-gray-300">
                {c.pfp}
              </div>

              <span className="text-sm font-medium text-gray-300">
                {c.username}
              </span>

              <span className="ml-auto text-xs text-gray-500">
                {c.edits} {c.edits > 1 ? "edits" : "edit"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-t-gray-800 pt-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Version History
        </h3>

        <div className="flex flex-col gap-2">
          {versionHistory.map((version, index) => (
            <div className="flex items-center gap-3 rounded px-3" key={index}>
              <div
                className={cn(
                  "flex size-4 items-center justify-center rounded-full text-xs font-semibold text-gray-300",
                  index === 0
                    ? "border-2 border-blue-500 bg-blue-800"
                    : "bg-gray-700",
                )}
              />

              <div className="flex flex-col rounded">
                <span
                  className={cn(
                    "text-sm font-medium text-gray-300",
                    index === 0 && "text-blue-400",
                  )}
                >
                  {version.version}
                </span>

                <span className="text-xs tracking-wide text-gray-500">
                  {version.author} •{" "}
                  {new Date(version.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-t-gray-800 pt-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Forked From
        </h3>

        <p className="text-xs font-semibold text-gray-600">
          {note.forkedFrom
            ? `This note is a fork of id:${note.forkedFrom}.`
            : "this is an original note"}
        </p>
      </div>

      <div className="border-t border-t-gray-800 pt-4">
        <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
          Notable Forks
        </h3>

        <div className="flex flex-col gap-2">
          {notableForks.map((fork, index) => (
            <div
              key={index}
              className="flex flex-col gap-0.5 rounded-lg border border-gray-800 bg-gray-900 px-2 py-1 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-blue-500">{fork.author}</span>
                <span className="text-gray-600">•</span>
                <Link to={`/note/${fork.id}`} className="text-gray-300">
                  {fork.title}
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs tracking-wide text-gray-600">
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

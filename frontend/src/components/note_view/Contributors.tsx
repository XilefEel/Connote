import { Link } from "react-router-dom";
import { getContributors } from "../../lib/utils";
import type { NoteVersion } from "../../lib/types/note";

export default function Contributors({
  versionHistory,
}: {
  versionHistory: NoteVersion[];
}) {
  const contributors = getContributors(versionHistory);

  return (
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
  );
}

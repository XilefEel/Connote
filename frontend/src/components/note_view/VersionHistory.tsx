import { Link } from "react-router-dom";
import type { NoteVersion } from "../../lib/types/note";
import { cn, timeAgo } from "../../lib/utils";

export default function VersionHistory({
  versionHistory,
}: {
  versionHistory: NoteVersion[];
}) {
  return (
    <div className="border-t border-t-zinc-800 pt-4">
      <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
        Version History
      </h3>

      <div className="flex flex-col gap-2">
        {versionHistory.map((version, index) => (
          <div className="flex items-center gap-3 rounded px-3" key={index}>
            <div
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-zinc-300",
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
  );
}

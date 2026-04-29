import { cn } from "../../lib/utils";
import { Heart, GitBranch, Clock, Users } from "lucide-react";

const sortOptions = [
  { label: "most liked", sortKey: "likes", Icon: Heart },
  { label: "most forked", sortKey: "forks", Icon: GitBranch },
  { label: "most recent", sortKey: "recent", Icon: Clock },
  { label: "most contributors", sortKey: "contributors", Icon: Users },
];

const forkOptions = [
  { label: "any", value: null },
  { label: "2+ forks", value: 2 },
  { label: "5+ forks", value: 5 },
  { label: "10+ forks", value: 10 },
];

const contributorOptions = [
  { label: "any", value: null },
  { label: "2+ contributors", value: 2 },
  { label: "4+ contributors", value: 4 },
  { label: "6+ contributors", value: 6 },
];

export default function Sidebar({
  sort,
  setSort,
  minForks,
  setMinForks,
  minContributors,
  setMinContributors,
}: {
  sort: string;
  setSort: (sortKey: string) => void;
  minForks: number | null;
  setMinForks: (forks: number | null) => void;
  minContributors: number | null;
  setMinContributors: (contributors: number | null) => void;
}) {
  return (
    <div className="flex h-full w-64 flex-col gap-7 border-r border-r-zinc-700 p-3 text-zinc-300">
      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-zinc-600 uppercase">
          Sort by
        </p>

        <div className="flex flex-col gap-0.5 text-sm">
          {sortOptions.map((option) => (
            <button
              key={option.sortKey}
              onClick={() => setSort(option.sortKey)}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1 transition-colors hover:bg-zinc-900 hover:text-white",
                sort === option.sortKey &&
                  "bg-zinc-900 font-semibold text-white",
              )}
            >
              {option.Icon && <option.Icon size={16} />}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-zinc-600 uppercase">
          Forks
        </p>

        <div className="flex flex-col gap-0.5 text-sm">
          {forkOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setMinForks(option.value)}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1 transition-colors hover:bg-zinc-900 hover:text-white",
                minForks === option.value &&
                  "bg-zinc-900 font-semibold text-white",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-zinc-600 uppercase">
          Contributors
        </p>

        <div className="flex flex-col gap-0.5 text-sm">
          {contributorOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setMinContributors(option.value)}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1 transition-colors hover:bg-zinc-900 hover:text-white",
                minContributors === option.value &&
                  "bg-zinc-900 font-semibold text-white",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

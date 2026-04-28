import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Heart, GitBranch, Clock, Users } from "lucide-react";

const sortOptions = [
  { label: "most liked", sortKey: "likes", Icon: Heart },
  { label: "most forked", sortKey: "forks", Icon: GitBranch },
  { label: "most recent", sortKey: "recent", Icon: Clock },
  { label: "most contributors", sortKey: "contributors", Icon: Users },
];

const forkOptions = ["any", "2+ forks", "5+ forks", "10+ forks"];

const contributorOptions = [
  "any",
  "2+ contributors",
  "4+ contributors",
  "6+ contributors",
];

export default function SidebarLeft() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSort = searchParams.get("sort") || "likes";
  const currentContributors = searchParams.get("contributors") || "any";
  const currentForks = searchParams.get("forks") || "any";

  const buildUrl = (overrides: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(overrides).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });

    return `/feed?${params.toString()}`;
  };

  const handleContributorClick = (option: string) => {
    const next = option === "any" ? "" : option;
    navigate(buildUrl({ contributors: next }));
  };

  const handleForkClick = (option: string) => {
    const next = option === "any" ? "" : option;
    navigate(buildUrl({ forks: next }));
  };

  return (
    <div className="flex h-full w-64 flex-col gap-7 border-r border-r-gray-700 p-3 text-gray-300">
      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-gray-600 uppercase">
          Sort by
        </p>

        <div className="flex flex-col gap-0.5 text-sm">
          {sortOptions.map((option) => (
            <Link
              key={option.sortKey}
              to={buildUrl({ sort: option.sortKey })}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1 transition-colors hover:bg-gray-900 hover:text-white",
                currentSort === option.sortKey &&
                  "bg-gray-900 font-semibold text-white",
              )}
            >
              {option.Icon && <option.Icon size={16} />}
              {option.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-gray-600 uppercase">
          Contributors
        </p>

        <div className="flex flex-col gap-0.5 text-sm">
          {contributorOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleContributorClick(option)}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1 transition-colors hover:bg-gray-900 hover:text-white",
                currentContributors === option &&
                  "bg-gray-900 font-semibold text-white",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-gray-600 uppercase">
          Forks
        </p>

        <div className="flex flex-col gap-0.5 text-sm">
          {forkOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleForkClick(option)}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1 transition-colors hover:bg-gray-900 hover:text-white",
                currentForks === option &&
                  "bg-gray-900 font-semibold text-white",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

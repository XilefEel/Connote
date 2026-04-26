import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "../../lib/utils";

const sortOptions = [
  { name: "most liked", sortKey: "likes" },
  { name: "most forked", sortKey: "forks" },
  { name: "most recent", sortKey: "recent" },
  { name: "most contributors", sortKey: "contributors" },
];

const tags = [
  "interview prep",
  "exam prep",
  "data structures",
  "beginner friendly",
  "advanced",
  "python",
  "javascript",
];

const contributorOptions = [
  "any",
  "2+ contributors",
  "4+ contributors",
  "6+ contributors",
];

export default function SidebarLeft() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentSort = searchParams.get("sort") || "recent";
  const currentTags = searchParams.get("tag")?.split(",").filter(Boolean) || [];
  const currentContributors = searchParams.get("contributors") || "any";

  const buildUrl = (overrides: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(overrides).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });

    return `/feed?${params.toString()}`;
  };

  const handleTagClick = (tag: string) => {
    const next = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    navigate(buildUrl({ tag: next.join(",") }));
  };

  const handleContributorClick = (option: string) => {
    const next = option === "any" ? "" : option;
    navigate(buildUrl({ contributors: next }));
  };

  return (
    <div className="flex h-full w-64 flex-col gap-7 border-r border-r-gray-700 p-3 text-gray-300">
      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="text-xs font-bold tracking-wide text-gray-600 uppercase">
          Sort by
        </p>

        <div className="flex flex-col gap-0.5 text-xs">
          {sortOptions.map((option) => (
            <Link
              key={option.sortKey}
              to={buildUrl({ sort: option.sortKey })}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg px-3 py-1.5 transition-colors hover:bg-gray-900 hover:text-white",
                currentSort === option.sortKey ? "bg-gray-900 text-white" : "",
              )}
            >
              {option.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="text-xs font-bold tracking-wide text-gray-600 uppercase">
          Tags
        </p>

        <div className="flex flex-row flex-wrap gap-1 text-xs">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg border px-2 py-1 transition-colors hover:bg-gray-900 hover:text-white",
                currentTags.includes(tag)
                  ? "border-blue-500 text-white"
                  : "border-gray-800",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="text-xs font-bold tracking-wide text-gray-600 uppercase">
          Contributors
        </p>

        <div className="flex flex-col gap-0.5 text-xs">
          {contributorOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleContributorClick(option)}
              className={cn(
                "flex cursor-pointer items-center gap-2 truncate rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-900 hover:text-white",
                currentContributors === option ||
                  (option === "any" && !currentContributors)
                  ? "bg-gray-900 text-white"
                  : "",
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

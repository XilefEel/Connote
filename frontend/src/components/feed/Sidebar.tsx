import { Search } from "lucide-react";

const sortOptions = [
  { name: "most liked" },
  { name: "most forked" },
  { name: "most recent" },
  { name: "most contributors" },
];

const tags = [
  { name: "interview prep" },
  { name: "exam prep" },
  { name: "data structures" },
  { name: "beginner friendly" },
  { name: "advanced" },
  { name: "python" },
  { name: "javascript" },
  { name: "machine learning" },
];

const contributorSort = [
  { name: "any" },
  { name: "2+ contributors" },
  { name: "4+ contributors" },
  { name: "6+ contributors" },
];

export default function SidebarLeft() {
  return (
    <div className="flex h-full w-64 flex-col gap-7 border-r border-r-gray-700 p-3 text-gray-300">
      <div className="relative w-full">
        <input
          placeholder="filter results..."
          className="w-full rounded-lg border border-gray-700 py-1 pl-9 text-sm text-white placeholder-gray-600 transition-colors outline-none focus:border-blue-500"
        />

        <button className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300">
          <Search size={12} />
        </button>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="text-xs font-bold tracking-wide text-gray-600 uppercase">
          Sort by
        </p>

        <div className="flex flex-col gap-2 text-xs">
          {sortOptions.map((option) => (
            <button
              key={option.name}
              className="flex cursor-pointer items-center gap-2 truncate rounded-lg px-2 py-1 transition-colors hover:bg-gray-900 hover:text-white"
            >
              {option.name}
            </button>
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
              key={tag.name}
              className="flex cursor-pointer items-center gap-2 truncate rounded-lg border border-gray-800 px-2 py-1 transition-colors hover:bg-gray-900 hover:text-white"
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="text-xs font-bold tracking-wide text-gray-600 uppercase">
          Contributors
        </p>

        <div className="flex flex-col gap-2 text-xs">
          {contributorSort.map((option) => (
            <button
              key={option.name}
              className="flex cursor-pointer items-center gap-2 truncate rounded-lg px-2 py-1 transition-colors hover:bg-gray-900 hover:text-white"
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

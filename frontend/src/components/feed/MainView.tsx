import { Grid2X2, Menu, X } from "lucide-react";
import NoteCard from "../NoteCard";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { cn } from "../../lib/utils";

const noteCards = [
  {
    title: "Binary trees — traversal algorithms + interview problems",
    description:
      "In-order, pre-order, post-order with animated trace diagrams. 8 LeetCode-style problems with solutions.",
    likes: 150,
    comments: 60,
    forks: 40,
    contributors: 4,
    tags: ["Computer Science", "Data Structures", "Binary Trees"],
  },
  {
    title: "Data structures — hash tables explained with code",
    description:
      "Hash functions, collision resolution strategies, and performance analysis. Implementations in Python and JavaScript.",
    likes: 110,
    comments: 35,
    forks: 25,
    contributors: 3,
    tags: ["Computer Science", "Data Structures", "Hash Tables"],
  },
  {
    title: "Graph algorithms — Dijkstra's and A* explained",
    description:
      "Step-by-step explanations of Dijkstra's and A* algorithms with visualizations. Includes code examples in Python.",
    likes: 130,
    comments: 50,
    forks: 30,
    contributors: 4,
    tags: ["Computer Science", "Algorithms", "Graph Theory"],
  },
  {
    title: "Sorting algorithms — quicksort, mergesort, and heapsort",
    description:
      "Detailed explanations of quicksort, mergesort, and heapsort with time complexity analysis. Code implementations included.",
    likes: 140,
    comments: 55,
    forks: 35,
    contributors: 5,
    tags: ["Computer Science", "Algorithms", "Sorting"],
  },
  {
    title: "Dynamic programming — top 10 interview problems",
    description:
      "A curated list of the top 10 dynamic programming problems commonly asked in interviews, with detailed solutions and explanations.",
    likes: 160,
    comments: 70,
    forks: 45,
    contributors: 6,
    tags: ["Computer Science", "Algorithms", "Dynamic Programming"],
  },
];

const filters = [
  "algorithms",
  "exam prep",
  "interview prep",
  "data structures",
  "2+ contributors",
];

export default function MainView() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">
            results for <span className="text-blue-400">"{query}"</span>
          </h1>
          <p className="text-xs text-gray-500">24 notes</p>
        </div>

        <div className="flex flex-row items-center text-gray-200 hover:text-gray-100">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "cursor-pointer rounded-l p-2 transition-colors",
              viewMode === "list"
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-gray-800 hover:bg-gray-700",
            )}
          >
            <Menu size={16} />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "cursor-pointer rounded-r p-2 transition-colors",
              viewMode === "grid"
                ? "bg-blue-500 hover:bg-blue-400"
                : "bg-gray-800 hover:bg-gray-700",
            )}
          >
            <Grid2X2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-1.5">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-1 rounded-lg border border-gray-700 px-3 py-0.5 hover:bg-gray-900"
          >
            <button className="text-xs text-gray-300 transition-colors hover:text-gray-100">
              {filter}
            </button>

            <button>
              <X
                size={12}
                className="text-gray-500 transition-colors hover:text-gray-400"
              />
            </button>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "gap-3",
          viewMode === "list" ? "flex flex-col" : "grid grid-cols-2",
        )}
      >
        {noteCards.map((card, index) => (
          <NoteCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

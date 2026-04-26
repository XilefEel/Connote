import { useState } from "react";
import NoteCard from "../NoteCard";
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

const tabs = [
  { label: "my notes", value: 7 },
  { label: "forks", value: 19 },
  { label: "pull requests", value: 8 },
  { label: "likes", value: 15 },
];

export default function MainView() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex h-full flex-1 flex-col gap-3 overflow-y-auto px-5 py-3">
      <div className="flex flex-row gap-8 border-b border-gray-700 pb-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className="group relative flex cursor-pointer flex-row items-center justify-center gap-1 rounded-lg px-4 text-xs font-semibold tracking-wide transition-colors"
          >
            <span
              className={cn(
                "text-gray-300 transition-colors group-hover:text-white",
                activeTab === index && "text-white",
              )}
            >
              {tab.label}
            </span>

            <span className="text-gray-500">({tab.value})</span>

            {activeTab === index && (
              <div className="absolute -bottom-2 h-0.5 w-full bg-blue-500" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {noteCards.map((card, index) => (
          <NoteCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

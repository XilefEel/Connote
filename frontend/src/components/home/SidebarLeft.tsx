import { Clock, Home, Settings, Star } from "lucide-react";
import { Link } from "react-router-dom";

const subjects = [
  { name: "Calculus", color: "bg-blue-500", count: 12 },
  { name: "Organic Chemistry", color: "bg-green-500", count: 8 },
  { name: "Geography", color: "bg-yellow-500", count: 5 },
  { name: "Physics", color: "bg-red-500", count: 10 },
  { name: "Literature", color: "bg-purple-500", count: 7 },
];

export default function SidebarLeft() {
  return (
    <div className="flex h-full w-64 flex-col gap-7 border-r border-r-gray-700 p-3 text-gray-200">
      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
          Feeds
        </p>

        <div className="flex items-center gap-2 rounded border-b-gray-700 bg-gray-900 px-3 py-1 font-semibold text-white transition-colors">
          <Home size={16} />
          Home
        </div>

        <Link
          to="/home?sort=popular"
          className="flex items-center gap-2 rounded border-b-gray-700 px-3 py-1 transition-colors hover:bg-gray-900 hover:text-white"
        >
          <Star size={16} />
          Popular
        </Link>

        <Link
          to="/home?sort=recent"
          className="flex items-center gap-2 rounded border-b-gray-700 px-3 py-1 transition-colors hover:bg-gray-900 hover:text-white"
        >
          <Clock size={16} />
          Recent
        </Link>
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-gray-500 uppercase">
          My Subjects
        </p>

        {subjects.map((subject) => (
          <div
            key={subject.name}
            className="flex items-center gap-2 rounded border-b-gray-700 px-3 py-1 transition-colors hover:bg-gray-900 hover:text-white"
          >
            <div
              className={`${subject.color} h-2 w-2 rounded-full`}
              title={subject.name}
            />
            {subject.name}
            <span className="ml-auto text-xs text-gray-500">
              {subject.count}
            </span>
          </div>
        ))}

        <p className="px-3 font-mono tracking-wide text-gray-500 transition hover:text-gray-400">
          + follow subject
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2 rounded px-3 py-1 text-sm transition-colors hover:bg-gray-900 hover:text-white">
        <Settings size={16} />
        Settings
      </div>
    </div>
  );
}

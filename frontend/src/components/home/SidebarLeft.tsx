import { Clock, Home, LogOut, Settings, Star } from "lucide-react";
import { Link } from "react-router-dom";

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
          Favorite Tags
        </p>

        <p className="cursor-pointer px-3 tracking-wide text-gray-500 transition hover:text-gray-400">
          + favorite tag
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex cursor-pointer items-center gap-2 rounded px-3 py-1 text-sm transition-colors hover:bg-gray-900 hover:text-white">
          <Settings size={16} />
          Settings
        </div>

        <div className="flex cursor-pointer items-center gap-2 rounded px-3 py-1 text-sm transition-colors hover:bg-gray-900 hover:text-red-500">
          <LogOut size={16} />
          Logout
        </div>
      </div>
    </div>
  );
}

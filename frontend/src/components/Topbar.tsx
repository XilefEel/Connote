import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentUser } from "../lib/api/auth";

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const user = getCurrentUser();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const params = new URLSearchParams(searchParams);
    params.set("q", searchQuery.trim());
    navigate(`/feed?${params.toString()}`);
  };

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-gray-700 bg-gray-950 px-6">
      <Link to="/home" className="shrink-0 text-xl font-bold text-white">
        con<span className="text-blue-500">note</span>
      </Link>

      <div className="relative w-1/2">
        <input
          placeholder="Cari catatan, mata kuliah..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 pl-10 text-sm text-white placeholder-gray-600 transition-colors outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
        >
          <Search size={16} />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          to="/note/new"
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white transition-colors hover:bg-blue-500"
        >
          <Plus size={16} /> New Note
        </Link>

        <Link
          to={`/profile/${user.username}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white"
        >
          JD
        </Link>
      </div>
    </div>
  );
}

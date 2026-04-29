import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentUser } from "../lib/api/auth";

export default function Topbar() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const params = new URLSearchParams(searchParams);
    params.set("q", searchQuery.trim());

    navigate(`/feed?${params.toString()}`);
  };

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-zinc-700 bg-zinc-950 px-6">
      <Link to="/home" className="shrink-0 text-xl font-bold text-white">
        con<span className="text-teal-500">note</span>
      </Link>

      <div className="relative w-1/2">
        <input
          placeholder="Cari catatan, mata kuliah, tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 pl-10 text-sm text-white placeholder-zinc-600 transition-colors outline-none focus:border-teal-500"
        />

        <button
          onClick={handleSearch}
          className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <Search size={16} />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          to="/note/new"
          className="flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-1.5 text-xs text-white transition-colors hover:bg-teal-500"
        >
          <Plus size={14} /> Catatan Baru
        </Link>

        <Link
          to={`/profile/${user.username}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-semibold text-white uppercase"
        >
          {user.username.slice(0, 2)}
        </Link>
      </div>
    </div>
  );
}

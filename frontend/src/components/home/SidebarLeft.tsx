import { ChartLine, Clock, LogOut, Settings, Star, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../lib/api/auth";

const sortOptions = [
  { label: "Populer", sortKey: "popular", Icon: Star },
  { label: "Terbaru", sortKey: "recent", Icon: Clock },
  { label: "Trending", sortKey: "trending", Icon: ChartLine },
  { label: "Mengikuti", sortKey: "following", Icon: User },
];

export default function SidebarLeft() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-full w-64 flex-col gap-7 border-r border-r-zinc-700 p-3 text-zinc-200">
      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-zinc-500 uppercase">
          Feeds
        </p>

        {sortOptions.map((option) => (
          <Link
            key={option.sortKey}
            to={`/home?sort=${option.sortKey}`}
            className="flex items-center gap-2 rounded border-b-zinc-700 px-3 py-1 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            {option.Icon && <option.Icon size={16} />}
            {option.label}
          </Link>
        ))}
      </div>

      <div className="flex w-full flex-col gap-1 text-sm">
        <p className="px-3 text-xs font-bold tracking-wide text-zinc-500 uppercase">
          Tag Favorit
        </p>

        <p className="cursor-pointer px-3 tracking-wide text-zinc-500 transition hover:text-zinc-400">
          + tambah tag
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex cursor-pointer items-center gap-2 rounded px-3 py-1 text-sm transition-colors hover:bg-zinc-900 hover:text-white">
          <Settings size={16} />
          Pengaturan
        </div>

        <div
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded px-3 py-1 text-sm transition-colors hover:bg-zinc-900 hover:text-red-500"
        >
          <LogOut size={16} />
          Keluar
        </div>
      </div>
    </div>
  );
}

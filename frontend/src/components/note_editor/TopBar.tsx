import { Link } from "react-router-dom";
import { getCurrentUser } from "../../lib/api/auth";

export default function Topbar() {
  const user = getCurrentUser();

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-zinc-700 bg-zinc-950 px-6">
      <Link to="/home" className="shrink-0 text-xl font-bold text-white">
        con<span className="text-teal-500">note</span>
      </Link>

      <div className="flex shrink-0 items-center gap-3">
        <button className="cursor-pointer rounded-lg border border-zinc-800 px-4 py-1 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200">
          Simpan draf
        </button>

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

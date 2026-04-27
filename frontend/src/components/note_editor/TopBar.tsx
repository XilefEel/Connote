import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-gray-700 bg-gray-950 px-6">
      <Link to="/home" className="shrink-0 text-xl font-bold text-white">
        con<span className="text-blue-500">note</span>
      </Link>

      <div className="flex shrink-0 items-center gap-3">
        <button className="cursor-pointer rounded-lg border border-gray-800 px-4 py-1 text-xs text-gray-400 transition-colors hover:border-gray-600 hover:text-gray-200">
          save draft
        </button>

        <Link
          to="/profile"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white"
        >
          JD
        </Link>
      </div>
    </div>
  );
}

import { Plus, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-b-gray-700 px-6">
      <h1 className="text-xl font-bold text-white">
        con<span className="text-blue-500">note</span>
      </h1>

      <div className="relative w-1/2">
        <input
          placeholder="Search notes, subjects..."
          className="w-full rounded-lg border border-gray-700 px-4 py-2 pl-12 text-sm text-white placeholder-gray-600 transition-colors outline-none focus:border-blue-500"
        />

        <button className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300">
          <Search size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-lg">
        <button className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white transition-colors hover:bg-blue-500">
          <Plus size={16} /> New Note
        </button>
        <div className="size-8 rounded-full bg-gray-600" />
      </div>
    </div>
  );
}

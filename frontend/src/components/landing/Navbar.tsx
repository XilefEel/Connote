import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <p className="shrink-0 text-xl font-bold text-white">
          con<span className="text-teal-500">note</span>
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-500"
          >
            Daftar Gratis
          </Link>
        </div>
      </div>
    </nav>
  );
}

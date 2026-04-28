import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <p className="shrink-0 text-xl font-bold text-white">
          con<span className="text-blue-500">note</span>
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-500"
          >
            Daftar Gratis
          </Link>
        </div>
      </div>
    </nav>
  );
}

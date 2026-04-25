import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-bold text-lg">Connote</span>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Daftar Gratis
          </Link>
        </div>
      </div>
    </nav>
  );
}

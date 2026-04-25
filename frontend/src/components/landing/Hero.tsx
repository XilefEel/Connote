import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-screen bg-gray-950 flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Catatan yang <span className="text-blue-400">Tumbuh Bersama</span>{" "}
          Kamu
        </h1>

        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Platform kolaborasi catatan akademik untuk mahasiswa Indonesia.
          Upload, kembangkan, dan bangun catatan terbaik bersama mahasiswa lain
          di seluruh negeri.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 ">
          <Link
            to="/register"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg  transition-colors"
          >
            Mulai Sekarang
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/feed"
            className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-5 py-2 rounded-lg  transition-colors"
          >
            Lihat Catatan
          </Link>
        </div>
      </div>
    </section>
  );
}

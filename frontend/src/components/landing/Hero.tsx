import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-7xl">
          Catatan yang <span className="text-blue-400">Tumbuh Bersama</span>{" "}
          Kamu
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-gray-400 md:text-base">
          Platform kolaborasi catatan akademik untuk mahasiswa Indonesia.
          Upload, kembangkan, dan bangun catatan terbaik bersama mahasiswa lain
          di seluruh negeri.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-500"
          >
            Daftar Sekarang
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/home"
            className="flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-2 text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
          >
            Lihat Catatan
          </Link>
        </div>
      </div>
    </section>
  );
}

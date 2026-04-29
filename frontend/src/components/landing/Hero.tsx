import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-7xl">
          Catatan yang <span className="text-teal-400">Tumbuh Bersama</span>{" "}
          Kamu
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Platform kolaborasi catatan akademik untuk mahasiswa Indonesia.
          Upload, kembangkan, dan bangun catatan terbaik bersama mahasiswa lain
          di seluruh Indonesia.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2 text-white transition-colors hover:bg-teal-500"
          >
            Daftar Sekarang
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/home"
            className="flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            Lihat Catatan
          </Link>
        </div>
      </div>
    </section>
  );
}

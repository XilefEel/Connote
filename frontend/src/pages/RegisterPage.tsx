import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, KeyRound, Mail, User2 } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    setLoading(true);

    // TODO: ganti dengan API call ke backend PHP
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 100000);
  };

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-gray-950">
      <div className="w-full max-w-md">
        <h1 className="mb-1 text-2xl font-bold text-white">Buat Akun Baru</h1>

        <p className="mb-8 text-sm text-gray-400">
          Mulai berkontribusi untuk komunitasmu.
        </p>

        {error && <div className="text-sm text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-sm text-gray-400">
              <User2 size={16} />
              <p>Username</p>
            </div>

            <input
              type="text"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 transition-colors outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-2 text-sm text-gray-400">
              <Mail size={16} />
              <p>Email</p>
            </div>

            <input
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 transition-colors outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-2 text-sm text-gray-400">
              <KeyRound size={16} />
              <p>Password</p>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 pr-12 text-sm text-white placeholder-gray-600 transition-colors outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 font-semibold text-white transition-all hover:bg-blue-500"
          >
            {loading ? (
              <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                Masuk <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-400 transition-colors hover:text-blue-300"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

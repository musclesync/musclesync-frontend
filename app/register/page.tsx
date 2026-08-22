"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Kayıt başarısız");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-[1600px] mx-auto min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,#1b2436_0%,#05070c_55%,#020309_100%)] text-white p-6">
      
      <h1 className="text-3xl font-semibold mb-6">Kayıt Ol</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl bg-white/10 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl bg-white/10 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-red-500/80 hover:bg-red-500 px-4 py-2 font-semibold transition disabled:opacity-50"
        >
          {loading ? "Gönderiliyor…" : "Hesap Oluştur"}
        </button>
      </form>

      <a
        href="/"
        className="mt-8 text-sm text-slate-300 hover:text-white transition"
      >
        ← Ana sayfaya dön
      </a>
    </section>
  );
}

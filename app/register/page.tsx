export default function RegisterPage() {
  return (
    <section className="max-w-[1600px] mx-auto min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,#1b2436_0%,#05070c_55%,#020309_100%)] text-white">
      <h1 className="text-3xl font-semibold mb-6">Kayıt Ol</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="E-posta"
          className="rounded-xl bg-white/10 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="password"
          placeholder="Şifre"
          className="rounded-xl bg-white/10 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className="rounded-xl bg-red-500/80 hover:bg-red-500 px-4 py-2 font-semibold transition"
        >
          Hesap Oluştur
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

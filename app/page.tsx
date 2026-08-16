"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* HERO */}
      <section className="text-center max-w-2xl">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          <span className="text-orange-500">MuscleSync</span> 2.0
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          A completely redesigned AI fitness experience.  
          Smarter plans, deeper analytics, cleaner UI.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/register")}
            className="bg-orange-500 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Join Now
          </button>

          <button
            onClick={() => router.push("/login")}
            className="border border-gray-600 px-6 py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition"
          >
            Login
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 mt-20 w-full max-w-4xl">
        {[
          { title: "Smart AI Plans", desc: "Adaptive workouts that evolve with your performance." },
          { title: "Deep Analytics", desc: "Real‑time insights powered by advanced metrics." },
          { title: "Clean UI", desc: "A fresh, modern interface built for speed and clarity." },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#111] p-6 rounded-xl border border-gray-800 hover:border-orange-500 transition"
          >
            <h3 className="text-xl font-bold text-orange-400 mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="mt-20 text-gray-500 text-sm">
        © 2026 MuscleSync — Rebuilt from the ground up.
      </footer>
    </main>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  // Animated Stats
  const [strength, setStrength] = useState(0);
  const [endurance, setEndurance] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    let s = 0, e = 0, u = 0;

    const interval = setInterval(() => {
      if (s < 92) s++;
      if (e < 87) e++;
      if (u < 12000) u += 120;
      setStrength(s);
      setEndurance(e);
      setUsers(u);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] text-white font-poppins">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1
            className="text-3xl font-extrabold text-orange-500 tracking-tight cursor-pointer"
            onClick={() => router.push("/")}
          >
            MuscleSync
          </h1>

          <div className="flex gap-6 text-gray-300">
            <button
              onClick={() => router.push("/login")}
              className="hover:text-orange-400 transition"
            >
              Login
            </button>

            <button
              onClick={() => router.push("/register")}
              className="bg-orange-500 text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff660020,transparent)] animate-pulse"></div>

        <div className="mx-auto max-w-3xl p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h2 className="text-6xl font-extrabold mb-6 tracking-tight animate-[fadeIn_1s_ease]">
            Train <span className="text-orange-500">Smarter</span>,  
            Get <span className="text-orange-500">Stronger</span>.
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 animate-[slideUp_1s_ease]">
            A next‑generation AI fitness platform with adaptive workout plans,  
            deep analytics, and a premium modern interface.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 rounded-xl bg-orange-500 text-black font-semibold hover:scale-110 transition shadow-lg"
            >
              Start Free
            </button>

            <button
              onClick={() => router.push("/register")}
              className="px-6 py-3 rounded-xl border border-white/20 hover:border-orange-500 hover:text-orange-500 transition"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 pb-32">
        {[
          {
            title: "Adaptive AI Plans",
            desc: "Workouts that evolve with your performance and goals.",
          },
          {
            title: "Deep Analytics",
            desc: "Track strength, endurance, volume, and progress with precision.",
          },
          {
            title: "Premium UI",
            desc: "Glassmorphism, gradients, animations — a modern fitness experience.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:scale-105 hover:border-orange-500 transition"
          >
            <h3 className="text-2xl font-bold text-orange-400 mb-3">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* AI DEMO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-32 text-center">
        <h2 className="text-4xl font-extrabold mb-10">
          Experience <span className="text-orange-500">AI Power</span>
        </h2>

        <div className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <p className="text-gray-300 text-lg mb-6">
            MuscleSync analyzes your performance and generates personalized workout plans instantly.
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 rounded-xl bg-orange-500 text-black font-semibold hover:scale-110 transition shadow-lg"
          >
            Try AI Demo
          </button>
        </div>
      </section>

      {/* ANIMATED STATS */}
      <section className="max-w-6xl mx-auto px-6 pb-32 grid md:grid-cols-3 gap-10 text-center">
        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-5xl font-extrabold text-orange-500">{strength}%</h3>
          <p className="text-gray-300 mt-2">Strength Increase</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-5xl font-extrabold text-orange-500">{endurance}%</h3>
          <p className="text-gray-300 mt-2">Endurance Boost</p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <h3 className="text-5xl font-extrabold text-orange-500">{users.toLocaleString()}</h3>
          <p className="text-gray-300 mt-2">Active Users</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <h2 className="text-center text-4xl font-extrabold mb-12">
          Loved by <span className="text-orange-500">Athletes</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Alex Carter",
              text: "MuscleSync completely transformed my training. The AI plans are insane.",
            },
            {
              name: "Jordan Miles",
              text: "The analytics helped me break plateaus I struggled with for years.",
            },
            {
              name: "Chris Walker",
              text: "This is the future of fitness. Clean UI, powerful AI, everything works.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:scale-105 transition"
            >
              <p className="text-gray-300 mb-4">“{t.text}”</p>
              <h3 className="text-orange-400 font-bold">{t.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 border-t border-white/10">
        © 2026 MuscleSync — Ultra Modern Fitness Platform.
      </footer>
    </main>
  );
}

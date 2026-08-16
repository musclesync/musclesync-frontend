"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [dark, setDark] = useState(true);
  const [strength, setStrength] = useState(0);
  const [endurance, setEndurance] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    let s = 0, e = 0, u = 0;
    const interval = setInterval(() => {
      if (s < 92) s++;
      if (e < 87) e++;
      if (u < 18000) u += 180;
      setStrength(s);
      setEndurance(e);
      setUsers(u);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`min-h-screen ${
        dark
          ? "bg-gradient-to-br from-black via-[#050509] to-[#14141f] text-white"
          : "bg-gradient-to-br from-white via-[#f4f4f8] to-[#e8e8f2] text-black"
      } font-poppins transition-all duration-500`}
    >
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-xl ${
          dark ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1
            className={`text-3xl font-extrabold tracking-tight cursor-pointer ${
              dark ? "text-orange-500" : "text-orange-600"
            }`}
            onClick={() => router.push("/")}
          >
            MuscleSync
          </h1>

          <div className="flex gap-6 items-center">
            <button
              onClick={() => setDark(!dark)}
              className={`px-4 py-2 rounded-lg border text-sm ${
                dark
                  ? "border-white/20 text-gray-300 hover:border-orange-500 hover:text-orange-500"
                  : "border-black/20 text-gray-700 hover:border-orange-600 hover:text-orange-600"
              } transition`}
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={() => router.push("/login")}
              className={`transition text-sm ${
                dark ? "hover:text-orange-400 text-gray-300" : "hover:text-orange-600 text-gray-700"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => router.push("/register")}
              className={`px-5 py-2 rounded-lg font-semibold hover:scale-105 transition text-sm ${
                dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
              }`}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO: Abstract 3D Shapes + Muscle Anatomy vibe */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        {/* Abstract 3D blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[520px] h-[520px] bg-orange-500/18 blur-[120px] rounded-full top-[-80px] left-[10%] animate-[float_10s_ease-in-out_infinite]" />
          <div className="absolute w-[420px] h-[420px] bg-purple-500/16 blur-[110px] rounded-full bottom-[-60px] right-[5%] animate-[float_12s_ease-in-out_infinite]" />
          <div className="absolute w-[260px] h-[260px] bg-orange-300/20 blur-[80px] rounded-full top-[40%] left-[55%] animate-[float_9s_ease-in-out_infinite]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text side */}
          <div>
            <h2
              className={`text-5xl md:text-6xl font-extrabold mb-6 tracking-tight ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Muscle <span className="text-orange-500">Anatomy‑Aware</span>  
              AI Training.
            </h2>

            <p
              className={`text-lg md:text-xl leading-relaxed mb-8 ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              MuscleSync maps your muscle activation in real time and generates  
              adaptive workouts that target exactly what you need.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className={`px-6 py-3 rounded-xl font-semibold hover:scale-110 transition shadow-lg ${
                  dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
                }`}
              >
                Start Free
              </button>

              <button
                onClick={() => router.push("/register")}
                className={`px-6 py-3 rounded-xl border text-sm transition ${
                  dark
                    ? "border-white/20 hover:border-orange-500 hover:text-orange-500 text-gray-300"
                    : "border-black/20 hover:border-orange-600 hover:text-orange-600 text-gray-700"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Muscle Anatomy 3D‑style card */}
          <div
            className={`rounded-3xl p-8 backdrop-blur-xl border shadow-2xl ${
              dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-orange-500">
              Weekly Muscle Activation Map
            </h3>

            {/* Simple SVG‑style grid representing body front */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm mb-6">
              {[
                { label: "Chest", heat: "🔥🔥🔥" },
                { label: "Back", heat: "🔥🔥" },
                { label: "Legs", heat: "🔥🔥🔥🔥" },
                { label: "Shoulders", heat: "🔥🔥" },
                { label: "Arms", heat: "🔥🔥🔥" },
                { label: "Core", heat: "🔥🔥🔥" },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl ${
                    dark ? "bg-white/10 border border-white/20" : "bg-white border border-black/10"
                  }`}
                >
                  <div className="font-semibold text-orange-500">{m.label}</div>
                  <div className={dark ? "text-gray-300" : "text-gray-700"}>{m.heat}</div>
                </div>
              ))}
            </div>

            <p className={dark ? "text-gray-300 text-sm" : "text-gray-700 text-sm"}>
              MuscleSync uses your training history to highlight over‑ and under‑trained areas,  
              then adjusts your next sessions to keep your physique balanced.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Anatomy‑Aware AI",
            desc: "Understands muscle groups and balances your training volume.",
          },
          {
            title: "Adaptive Programming",
            desc: "Plans evolve based on fatigue, performance, and recovery.",
          },
          {
            title: "SaaS‑Grade Analytics",
            desc: "Clean dashboards, clear metrics, and actionable insights.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`p-8 rounded-2xl backdrop-blur-xl border shadow-xl ${
              dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
            }`}
          >
            <h3 className="text-2xl font-bold text-orange-500 mb-3">{item.title}</h3>
            <p className={dark ? "text-gray-300" : "text-gray-700"}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ANIMATED STATS */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-10 text-center">
        <div
          className={`p-8 rounded-2xl backdrop-blur-xl border shadow-xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
          }`}
        >
          <h3 className="text-5xl font-extrabold text-orange-500">{strength}%</h3>
          <p className={dark ? "text-gray-300" : "text-gray-700"}>Strength Increase</p>
        </div>

        <div
          className={`p-8 rounded-2xl backdrop-blur-xl border shadow-xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
          }`}
        >
          <h3 className="text-5xl font-extrabold text-orange-500">{endurance}%</h3>
          <p className={dark ? "text-gray-300" : "text-gray-700"}>Endurance Boost</p>
        </div>

        <div
          className={`p-8 rounded-2xl backdrop-blur-xl border shadow-xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
          }`}
        >
          <h3 className="text-5xl font-extrabold text-orange-500">
            {users.toLocaleString()}
          </h3>
          <p className={dark ? "text-gray-300" : "text-gray-700"}>Active Users</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className={`py-12 border-t ${
          dark ? "border-white/10 text-gray-400" : "border-black/10 text-gray-700"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-2">MuscleSync</h3>
            <p className="text-sm">
              Anatomy‑aware AI fitness platform for athletes who want precision, balance, and performance.
            </p>
          </div>

          <div className="text-sm flex flex-wrap gap-4 md:gap-8">
            <span>Product</span>
            <span>Analytics</span>
            <span>AI Coach</span>
            <span>Heat Map</span>
            <span>Privacy</span>
          </div>
        </div>

        <p className="text-center mt-6 text-xs">
          © 2026 MuscleSync — Anatomy‑Aware AI Fitness.
        </p>
      </footer>
    </main>
  );
}

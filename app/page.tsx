"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  // Dark/Light Mode
  const [dark, setDark] = useState(true);

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
    <main
      className={`min-h-screen ${
        dark
          ? "bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] text-white"
          : "bg-gradient-to-br from-white via-[#f4f4f4] to-[#e8e8e8] text-black"
      } font-poppins transition-all duration-500`}
    >

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-xl ${
          dark ? "bg-black/30 border-white/10" : "bg-white/40 border-black/10"
        } border-b`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
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
              className={`px-4 py-2 rounded-lg border ${
                dark
                  ? "border-white/20 text-gray-300 hover:border-orange-500 hover:text-orange-500"
                  : "border-black/20 text-gray-700 hover:border-orange-600 hover:text-orange-600"
              } transition`}
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={() => router.push("/login")}
              className={`transition ${
                dark ? "hover:text-orange-400 text-gray-300" : "hover:text-orange-600 text-gray-700"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => router.push("/register")}
              className={`px-5 py-2 rounded-lg font-semibold hover:scale-105 transition ${
                dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
              }`}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-32 text-center relative overflow-hidden">

        {/* 3D Animated Background */}
        <div
          className="absolute inset-0 opacity-30 animate-[pulse_6s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(255,100,0,0.25), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,150,0,0.25), transparent 60%)",
          }}
        ></div>

        {/* Glassmorphism Card */}
        <div
          className={`mx-auto max-w-3xl p-10 rounded-3xl backdrop-blur-xl border shadow-2xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/60 border-black/10"
          }`}
        >
          <h2
            className={`text-6xl font-extrabold mb-6 tracking-tight ${
              dark ? "text-white" : "text-black"
            }`}
          >
            AI‑Powered <span className="text-orange-500">Fitness</span> Reinvented.
          </h2>

          <p
            className={`text-lg leading-relaxed mb-10 ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Adaptive workout plans, deep analytics, and a premium interface designed for athletes
            who never settle.
          </p>

          <div className="flex justify-center gap-4">
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
              className={`px-6 py-3 rounded-xl border transition ${
                dark
                  ? "border-white/20 hover:border-orange-500 hover:text-orange-500 text-gray-300"
                  : "border-black/20 hover:border-orange-600 hover:text-orange-600 text-gray-700"
              }`}
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* AI CHAT PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <h2 className="text-center text-4xl font-extrabold mb-10">
          MuscleSync <span className="text-orange-500">AI Coach</span>
        </h2>

        <div
          className={`p-8 rounded-3xl backdrop-blur-xl border shadow-xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
          }`}
        >
          <div className="space-y-4">
            <div
              className={`p-4 rounded-xl w-fit ${
                dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
              }`}
            >
              AI: “Welcome back! Ready for today’s workout?”
            </div>

            <div
              className={`p-4 rounded-xl w-fit ml-auto ${
                dark ? "bg-white/10 text-gray-300" : "bg-white text-gray-700"
              }`}
            >
              You: “Yes, give me a strength‑focused routine.”
            </div>

            <div
              className={`p-4 rounded-xl w-fit ${
                dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
              }`}
            >
              AI: “Perfect. Here’s your optimized plan for today.”
            </div>
          </div>
        </div>
      </section>

      {/* WORKOUT GENERATOR PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <h2 className="text-center text-4xl font-extrabold mb-10">
          Smart <span className="text-orange-500">Workout Generator</span>
        </h2>

        <div
          className={`p-8 rounded-3xl backdrop-blur-xl border shadow-xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
          }`}
        >
          <ul className="space-y-4 text-lg">
            <li className="font-semibold">🔥 Bench Press — 4 sets × 6 reps</li>
            <li className="font-semibold">💪 Dumbbell Shoulder Press — 3 sets × 10 reps</li>
            <li className="font-semibold">🏋️ Barbell Row — 4 sets × 8 reps</li>
            <li className="font-semibold">🔗 Tricep Rope Pushdown — 3 sets × 12 reps</li>
          </ul>

          <button
            onClick={() => router.push("/dashboard")}
            className={`mt-6 px-6 py-3 rounded-xl font-semibold hover:scale-110 transition shadow-lg ${
              dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
            }`}
          >
            Generate My Plan
          </button>
        </div>
      </section>

      {/* ANIMATED STATS */}
      <section className="max-w-6xl mx-auto px-6 pb-32 grid md:grid-cols-3 gap-10 text-center">
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
        className={`text-center py-10 border-t ${
          dark ? "border-white/10 text-gray-400" : "border-black/10 text-gray-700"
        }`}
      >
        © 2026 MuscleSync — AI Fitness Reinvented.
      </footer>
    </main>
  );
}

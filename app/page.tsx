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
      if (u < 15000) u += 150;
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

      {/* HERO — 3D Motion */}
      <section className="pt-40 pb-32 text-center relative overflow-hidden">

        {/* Layered Glow */}
        <div className="absolute inset-0 opacity-40 animate-[pulse_6s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, rgba(255,100,0,0.25), transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,150,0,0.25), transparent 60%)",
          }}
        ></div>

        {/* Parallax Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full top-10 left-1/4 animate-[float_8s_ease-in-out_infinite]"></div>
          <div className="absolute w-[500px] h-[500px] bg-orange-300/10 blur-[100px] rounded-full bottom-10 right-1/4 animate-[float_10s_ease-in-out_infinite]"></div>
        </div>

        {/* Glassmorphism Hero Card */}
        <div
          className={`mx-auto max-w-4xl p-12 rounded-3xl backdrop-blur-xl border shadow-2xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/60 border-black/10"
          }`}
        >
          <h2
            className={`text-7xl font-extrabold mb-6 tracking-tight ${
              dark ? "text-white" : "text-black"
            }`}
          >
            The Future of <span className="text-orange-500">AI Fitness</span>.
          </h2>

          <p
            className={`text-xl leading-relaxed mb-10 ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Personalized workouts, real‑time analytics, AI coaching, and a premium interface built
            for athletes who demand excellence.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className={`px-8 py-4 rounded-xl font-semibold hover:scale-110 transition shadow-lg ${
                dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
              }`}
            >
              Start Free
            </button>

            <button
              onClick={() => router.push("/register")}
              className={`px-8 py-4 rounded-xl border transition ${
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

      {/* AI VOICE COACH PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="text-center text-5xl font-extrabold mb-10">
          AI <span className="text-orange-500">Voice Coach</span>
        </h2>

        <div
          className={`p-10 rounded-3xl backdrop-blur-xl border shadow-xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
          }`}
        >
          <p className={`text-lg mb-6 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            MuscleSync’s AI Voice Coach gives real‑time feedback during your workouts.
          </p>

          <div className="space-y-4">
            <div
              className={`p-4 rounded-xl w-fit ${
                dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
              }`}
            >
              AI: “Keep your elbows tucked. Perfect form!”
            </div>

            <div
              className={`p-4 rounded-xl w-fit ml-auto ${
                dark ? "bg-white/10 text-gray-300" : "bg-white text-gray-700"
              }`}
            >
              You: “Increase intensity by 10%.”
            </div>

            <div
              className={`p-4 rounded-xl w-fit ${
                dark ? "bg-orange-500 text-black" : "bg-orange-600 text-white"
              }`}
            >
              AI: “Intensity increased. Stay controlled.”
            </div>
          </div>
        </div>
      </section>

      {/* MUSCLE MAP HEAT VISUALIZATION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="text-center text-5xl font-extrabold mb-10">
          Muscle <span className="text-orange-500">Heat Map</span>
        </h2>

        <div
          className={`p-10 rounded-3xl backdrop-blur-xl border shadow-xl ${
            dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
          }`}
        >
          <p className={`text-lg mb-6 ${dark ? "text-gray-300" : "text-gray-700"}`}>
            See which muscle groups you’ve activated the most this week.
          </p>

          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { muscle: "Chest", heat: "🔥🔥🔥" },
              { muscle: "Back", heat: "🔥🔥" },
              { muscle: "Legs", heat: "🔥🔥🔥🔥" },
              { muscle: "Shoulders", heat: "🔥🔥" },
              { muscle: "Arms", heat: "🔥🔥🔥" },
              { muscle: "Core", heat: "🔥🔥🔥" },
            ].map((m, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl backdrop-blur-xl border shadow ${
                  dark ? "bg-white/10 border-white/20" : "bg-white border-black/10"
                }`}
              >
                <h3 className="text-xl font-bold text-orange-500">{m.muscle}</h3>
                <p className={dark ? "text-gray-300" : "text-gray-700"}>{m.heat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="text-center text-5xl font-extrabold mb-10">
          Frequently <span className="text-orange-500">Asked</span> Questions
        </h2>

        <div className="space-y-6">
          {[
            {
              q: "How does the AI generate workouts?",
              a: "MuscleSync analyzes your performance, history, and goals to create adaptive routines.",
            },
            {
              q: "Is the platform beginner‑friendly?",
              a: "Absolutely. The AI adjusts intensity and complexity based on your level.",
            },
            {
              q: "Can I track my progress?",
              a: "Yes. The analytics dashboard shows strength, endurance, volume, and more.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className={`p-6 rounded-xl backdrop-blur-xl border ${
                dark ? "bg-white/5 border-white/10" : "bg-white/70 border-black/10"
              }`}
            >
              <summary className="cursor-pointer text-xl font-semibold text-orange-500">
                {item.q}
              </summary>
              <p className={`mt-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER 3.0 */}
      <footer
        className={`py-16 border-t ${
          dark ? "border-white/10 text-gray-400" : "border-black/10 text-gray-700"
        }`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 px-6">

          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">MuscleSync</h3>
            <p className="text-sm">
              The next generation AI fitness platform for athletes who demand excellence.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>AI Coach</li>
              <li>Workout Generator</li>
              <li>Analytics Dashboard</li>
              <li>Muscle Heat Map</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>

        <p className="text-center mt-10 text-sm">
          © 2026 MuscleSync — AI Fitness Reinvented.
        </p>
      </footer>
    </main>
  );
}

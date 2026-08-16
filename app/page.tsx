"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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

        {/* Gradient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff660020,transparent)] animate-pulse"></div>

        {/* Glassmorphism Card */}
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

      {/* PRICING SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <h2 className="text-center text-4xl font-extrabold mb-12 tracking-tight">
          Choose Your <span className="text-orange-500">Plan</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* FREE PLAN */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-gray-300 mb-6">Start your fitness journey with basic AI workouts.</p>

            <ul className="text-gray-400 space-y-2 mb-6">
              <li>✔ Basic AI Plans</li>
              <li>✔ Limited Analytics</li>
              <li>✔ Community Access</li>
            </ul>

            <button
              onClick={() => router.push("/register")}
              className="w-full bg-orange-500 text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-600/20 to-orange-400/10 backdrop-blur-xl border border-orange-500/40 shadow-2xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Pro</h3>
            <p className="text-gray-300 mb-6">Unlock full AI power with adaptive training and deep analytics.</p>

            <ul className="text-gray-300 space-y-2 mb-6">
              <li>✔ Adaptive AI Plans</li>
              <li>✔ Full Analytics Dashboard</li>
              <li>✔ Nutrition AI</li>
              <li>✔ Priority Support</li>
            </ul>

            <button
              onClick={() => router.push("/register")}
              className="w-full bg-orange-500 text-black py-3 rounded-xl font-semibold hover:scale-110 transition shadow-lg"
            >
              Upgrade Now
            </button>
          </div>

          {/* ELITE PLAN */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-4">Elite</h3>
            <p className="text-gray-300 mb-6">For athletes who want maximum performance and personalization.</p>

            <ul className="text-gray-400 space-y-2 mb-6">
              <li>✔ Personalized AI Coaching</li>
              <li>✔ Advanced Performance Metrics</li>
              <li>✔ Custom Meal Plans</li>
              <li>✔ 1-on-1 Expert Support</li>
            </ul>

            <button
              onClick={() => router.push("/register")}
              className="w-full border border-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:text-black transition"
            >
              Go Elite
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 border-t border-white/10">
        © 2026 MuscleSync — Ultra Modern Fitness Platform.
      </footer>
    </main>
  );
}

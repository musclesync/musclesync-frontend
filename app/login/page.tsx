"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#14141f] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-orange-500">MuscleSync</h1>
        <p className="text-sm text-gray-300 mb-6">
          Log in to your anatomy‑aware AI training dashboard.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              className="w-full rounded-lg bg-black/40 border border-white/20 px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            className="w-full mt-4 rounded-lg bg-orange-500 text-black font-semibold py-2 text-sm hover:scale-[1.02] transition"
            onClick={() => router.push("/dashboard")}
          >
            Log In
          </button>

          <button
            className="w-full mt-2 rounded-lg border border-white/20 text-gray-300 py-2 text-sm hover:border-orange-500 hover:text-orange-500 transition"
            onClick={() => router.push("/register")}
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}

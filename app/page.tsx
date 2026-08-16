"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-[#1a1a1a] text-white font-poppins">
      <nav className="flex justify-between items-center px-8 py-4 bg-black/70 backdrop-blur-md fixed w-full top-0 z-50">
        <h1 className="text-2xl font-bold text-orange-500">MuscleSync</h1>
        <div className="space-x-4">
          <button
            onClick={() => router.push("/login")}
            className="hover:text-orange-400 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-orange-500 text-black px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-32 pb-20">
        <h2 className="text-5xl font-extrabold mb-4 animate-fadeIn">
          Push Harder. <span className="text-orange-500">Train Smarter.</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-xl animate-slideUp">
          AI‑powered workouts and analytics designed for athletes who never settle.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-8 bg-orange-500 text-black px-6 py-3 rounded-lg font-semibold hover:scale-110 transition animate-bounce"
        >
          Start Free
        </button>
      </section>
    </main>
  );
}

"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      <Link href="/" className="text-2xl font-bold text-orange-500">
        MuscleSync
      </Link>

      <div className="space-x-4">
        <Link href="/login" className="hover:text-orange-400 transition">
          Login
        </Link>

        <Link
          href="/register"
          className="bg-orange-500 text-black px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

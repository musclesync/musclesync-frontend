"use client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <button
        onClick={() => router.push("/login")}
        className="bg-orange-500 text-black px-4 py-2 rounded-lg hover:scale-105 transition"
      >
        Go to Login
      </button>
    </main>
  );
}

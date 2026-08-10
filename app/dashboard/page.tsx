"use client";
import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Workout Summary</h2>
          <p className="text-gray-600">Your recent workouts will appear here.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Progress Charts</h2>
          <p className="text-gray-600">Visual analytics coming soon.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Nutrition</h2>
          <p className="text-gray-600">AI meal plans will be shown here.</p>
        </div>
      </div>
    </div>
  );
}

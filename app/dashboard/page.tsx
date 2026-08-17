"use client";

import { useEffect, useState } from "react";
import MuscleHeatmap from "./components/MuscleHeatmap";
import AICoach from "./components/AICoach";
import ProgressCharts from "./components/ProgressCharts";
import WorkoutHistory from "./components/WorkoutHistory";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      setData(json);
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#14141f] text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold text-orange-500 mb-6">
        Dashboard
      </h1>

      {!data && (
        <p className="text-gray-400">Loading your training data...</p>
      )}

      {data && (
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              Muscle Activation
            </h2>
            <p className="text-gray-300 text-sm">
              {data.muscleActivation}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              Workout History
            </h2>
            <p className="text-gray-300 text-sm">
              {data.workoutHistory}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              AI Recommendations
            </h2>
            <p className="text-gray-300 text-sm">
              {data.aiRecommendations}
            </p>
          </div>
        </div>
      )}

      {/* NEW MODULES */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mt-10">
        <MuscleHeatmap />
        <AICoach />
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mt-10">
        <ProgressCharts weeklyVolume={[12000, 13500, 14200, 15800]} />
        <WorkoutHistory />
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function MuscleHeatmap() {
  const [muscles, setMuscles] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/muscles");
      const json = await res.json();
      setMuscles(json.muscles);
    }
    load();
  }, []);

  if (!muscles) return <p className="text-gray-400">Loading heatmap...</p>;

  const getColor = (value: number) => {
    const intensity = Math.floor(value * 255);
    return `rgb(${intensity}, 80, 20)`; // orange-red gradient
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        Muscle Activation Heatmap
      </h2>

      <svg viewBox="0 0 200 400" className="w-full max-w-sm mx-auto">
        {/* Chest */}
        <rect
          x="70"
          y="80"
          width="60"
          height="40"
          fill={getColor(muscles.chest)}
        />

        {/* Back */}
        <rect
          x="70"
          y="120"
          width="60"
          height="60"
          fill={getColor(muscles.back)}
        />

        {/* Quads */}
        <rect
          x="70"
          y="240"
          width="60"
          height="80"
          fill={getColor(muscles.quads)}
        />

        {/* Hamstrings */}
        <rect
          x="70"
          y="320"
          width="60"
          height="60"
          fill={getColor(muscles.hamstrings)}
        />

        {/* Shoulders */}
        <rect
          x="60"
          y="40"
          width="80"
          height="40"
          fill={getColor(muscles.shoulders)}
        />

        {/* Arms */}
        <rect
          x="30"
          y="80"
          width="30"
          height="80"
          fill={getColor(muscles.biceps)}
        />
        <rect
          x="130"
          y="80"
          width="30"
          height="80"
          fill={getColor(muscles.triceps)}
        />
      </svg>
    </div>
  );
}

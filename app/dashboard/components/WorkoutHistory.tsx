const history = data ?? [];
"use client"; 

import { useEffect, useState } from "react";

export default function WorkoutHistory() {
  const [history, setHistory] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/history");
      const json = await res.json();
      setHistory(json.sessions);
    }
    load();
  }, []);

  if (!history) return <p className="text-gray-400">Loading history...</p>;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        Workout History
      </h2>

      <ul className="space-y-4">
        {history.map((s: any, i: number) => (
          <li key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-orange-400 font-semibold">{s.date}</p>
            <p className="text-gray-300">{s.muscleGroup}</p>
            <p className="text-gray-400 text-sm">{s.volume} kg volume</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

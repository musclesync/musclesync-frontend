"use client";

import { useEffect, useState } from "react";

export default function AICoach() {
  const [coach, setCoach] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/coach");
      const json = await res.json();
      setCoach(json);
    }
    load();
  }, []);

  if (!coach) return <p className="text-gray-400">Loading AI coach...</p>;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        AI Coach Recommendations
      </h2>

      <ul className="space-y-3 text-gray-300">
        {coach.recommendations.map((r: string, i: number) => (
          <li key={i} className="p-3 bg-white/5 rounded-lg border border-white/10">
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

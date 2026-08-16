"use client";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function ProgressCharts() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/progress");
      const json = await res.json();
      setData(json);
    }
    load();
  }, []);

  if (!data) return <p className="text-gray-400">Loading charts...</p>;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        Weekly Training Volume
      </h2>

      <Line
        data={{
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Volume",
              data: data.weeklyVolume,
              borderColor: "orange",
              backgroundColor: "rgba(255,165,0,0.2)",
            },
          ],
        }}
      />
    </div>
  );
}

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface ProgressChartsProps {
  weeklyVolume?: number[]; // ⭐ OPSİYONEL YAPTIK
}

export default function ProgressCharts({ weeklyVolume = [] }: ProgressChartsProps) {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weekly Volume",
        data: weeklyVolume.length ? weeklyVolume : [0, 0, 0, 0],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.3)",
      },
    ],
  };

  return (
    <div className="w-full">
      <Line data={data} />
    </div>
  );
}

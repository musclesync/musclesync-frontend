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
    return `rgba(${intensity}, 60, 20, 0.9)`;
  };

  const applyColor = (id: string, value: number) => {
    const el = document.getElementById(id);
    if (el) el.style.fill = getColor(value);
  };

  useEffect(() => {
    if (!muscles) return;

    applyColor("shoulders", muscles.shoulders);
    applyColor("chest", muscles.chest);
    applyColor("abs", muscles.abs);
    applyColor("obliques-left", muscles.obliques);
    applyColor("obliques-right", muscles.obliques);
    applyColor("biceps-left", muscles.biceps);
    applyColor("biceps-right", muscles.biceps);
    applyColor("triceps-left", muscles.triceps);
    applyColor("triceps-right", muscles.triceps);
    applyColor("forearm-left", muscles.forearms);
    applyColor("forearm-right", muscles.forearms);
    applyColor("quads-left", muscles.quads);
    applyColor("quads-right", muscles.quads);
    applyColor("hamstrings-left", muscles.hamstrings);
    applyColor("hamstrings-right", muscles.hamstrings);
    applyColor("calves-left", muscles.calves);
    applyColor("calves-right", muscles.calves);
  }, [muscles]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        Muscle Activation Heatmap
      </h2>

      <div className="flex justify-center">
        <svg
          width="300"
          height="600"
          viewBox="0 0 300 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SHOULDERS */}
          <path id="shoulders" d="M120 60 C90 80 90 120 120 140 L180 140 C210 120 210 80 180 60 Z" />

          {/* CHEST */}
          <path id="chest" d="M120 140 L180 140 L200 200 L100 200 Z" />

          {/* ABS */}
          <path id="abs" d="M120 200 L180 200 L180 300 L120 300 Z" />

          {/* OBLIQUES */}
          <path id="obliques-left" d="M100 200 L120 200 L120 300 L90 280 Z" />
          <path id="obliques-right" d="M180 200 L200 200 L210 280 L180 300 Z" />

          {/* BICEPS */}
          <path id="biceps-left" d="M90 140 L70 200 L90 240 L110 200 Z" />
          <path id="biceps-right" d="M210 140 L230 200 L210 240 L190 200 Z" />

          {/* TRICEPS */}
          <path id="triceps-left" d="M70 200 L60 260 L90 260 L90 240 Z" />
          <path id="triceps-right" d="M230 200 L240 260 L210 260 L210 240 Z" />

          {/* FOREARMS */}
          <path id="forearm-left" d="M60 260 L50 330 L90 330 L90 260 Z" />
          <path id="forearm-right" d="M240 260 L250 330 L210 330 L210 260 Z" />

          {/* QUADS */}
          <path id="quads-left" d="M120 300 L150 300 L150 420 L120 420 Z" />
          <path id="quads-right" d="M150 300 L180 300 L180 420 L150 420 Z" />

          {/* HAMSTRINGS */}
          <path id="hamstrings-left" d="M120 420 L150 420 L150 500 L120 500 Z" />
          <path id="hamstrings-right" d="M150 420 L180 420 L180 500 L150 500 Z" />

          {/* CALVES */}
          <path id="calves-left" d="M120 500 L150 500 L150 580 L120 580 Z" />
          <path id="calves-right" d="M150 500 L180 500 L180 580 L150 580 Z" />
        </svg>
      </div>
    </div>
  );
}

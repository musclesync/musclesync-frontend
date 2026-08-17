"use client";

import { useEffect, useState } from "react";

type Muscles = {
  shoulders?: number;
  chest?: number;
  abs?: number;
  obliques?: number;
  biceps?: number;
  triceps?: number;
  forearms?: number;
  quads?: number;
  hamstrings?: number;
  calves?: number;
};

export default function MuscleHeatmap() {
  const [muscles, setMuscles] = useState<Muscles | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/muscles");
        const json = await res.json();
        setMuscles(json.muscles ?? {});
      } catch (err) {
        console.error("Muscle API failed:", err);
        setMuscles({});
      }
    }
    load();
  }, []);

  const safeApplyColor = (id: string, value: number | undefined) => {
    if (typeof window === "undefined") return;
    if (value === undefined) return;

    const intensity = Math.floor(value * 255);
    const color = `rgba(${intensity}, 60, 20, 0.9)`;

    const el = document.getElementById(id);
    if (el) el.style.fill = color;
  };

  useEffect(() => {
    if (!muscles) return;

    safeApplyColor("shoulders", muscles.shoulders);
    safeApplyColor("chest", muscles.chest);
    safeApplyColor("abs", muscles.abs);
    safeApplyColor("obliques-left", muscles.obliques);
    safeApplyColor("obliques-right", muscles.obliques);
    safeApplyColor("biceps-left", muscles.biceps);
    safeApplyColor("biceps-right", muscles.biceps);
    safeApplyColor("triceps-left", muscles.triceps);
    safeApplyColor("triceps-right", muscles.triceps);
    safeApplyColor("forearm-left", muscles.forearms);
    safeApplyColor("forearm-right", muscles.forearms);
    safeApplyColor("quads-left", muscles.quads);
    safeApplyColor("quads-right", muscles.quads);
    safeApplyColor("hamstrings-left", muscles.hamstrings);
    safeApplyColor("hamstrings-right", muscles.hamstrings);
    safeApplyColor("calves-left", muscles.calves);
    safeApplyColor("calves-right", muscles.calves);
  }, [muscles]);

  if (!muscles)
    return <p className="text-gray-400">Loading heatmap...</p>;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-orange-500 mb-4">
        Muscle Activation Heatmap
      </h2>

      <div className="flex justify-center">
        <svg
          width="320"
          height="720"
          viewBox="0 0 320 720"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* HEAD + NECK (dekoratif, renklendirmiyoruz) */}
          <circle cx="160" cy="60" r="35" fill="#111111" />
          <rect x="140" y="95" width="40" height="40" rx="20" fill="#111111" />

          {/* SHOULDERS */}
          <path
            id="shoulders"
            d="M80 120 C60 160 60 190 80 220 L240 220 C260 190 260 160 240 120 Z"
          />

          {/* CHEST */}
          <path
            id="chest"
            d="M100 220 L220 220 L240 300 L80 300 Z"
          />

          {/* ABS */}
          <path
            id="abs"
            d="M120 300 L200 300 L200 400 L120 400 Z"
          />

          {/* OBLIQUES */}
          <path
            id="obliques-left"
            d="M80 300 L120 300 L120 400 L60 370 Z"
          />
          <path
            id="obliques-right"
            d="M200 300 L240 300 L260 370 L200 400 Z"
          />

          {/* BICEPS */}
          <path
            id="biceps-left"
            d="M60 220 L40 300 L60 360 L90 300 Z"
          />
          <path
            id="biceps-right"
            d="M260 220 L280 300 L260 360 L230 300 Z"
          />

          {/* TRICEPS */}
          <path
            id="triceps-left"
            d="M40 300 L30 370 L70 370 L70 340 Z"
          />
          <path
            id="triceps-right"
            d="M280 300 L290 370 L250 370 L250 340 Z"
          />

          {/* FOREARMS */}
          <path
            id="forearm-left"
            d="M30 370 L20 460 L70 460 L70 370 Z"
          />
          <path
            id="forearm-right"
            d="M290 370 L300 460 L250 460 L250 370 Z"
          />

          {/* QUADS */}
          <path
            id="quads-left"
            d="M120 400 L160 400 L160 540 L120 540 Z"
          />
          <path
            id="quads-right"
            d="M160 400 L200 400 L200 540 L160 540 Z"
          />

          {/* HAMSTRINGS */}
          <path
            id="hamstrings-left"
            d="M120 540 L160 540 L160 630 L120 630 Z"
          />
          <path
            id="hamstrings-right"
            d="M160 540 L200 540 L200 630 L160 630 Z"
          />

          {/* CALVES */}
          <path
            id="calves-left"
            d="M120 630 L160 630 L160 710 L120 710 Z"
          />
          <path
            id="calves-right"
            d="M160 630 L200 630 L200 710 L160 710 Z"
          />
        </svg>
      </div>
    </div>
  );
}

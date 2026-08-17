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
          width="360"
          height="760"
          viewBox="0 0 360 760"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* HEAD + NECK (dekoratif) */}
          <circle cx="180" cy="70" r="50" fill="#0b0b0f" />
          <rect x="150" y="115" width="60" height="40" rx="20" fill="#0b0b0f" />

          {/* UPPER TORSO – SHOULDERS */}
          <path
            id="shoulders"
            d="M60 160 C40 210 40 250 70 280 L290 280 C320 250 320 210 300 160 Z"
          />

          {/* CHEST */}
          <path
            id="chest"
            d="M100 280 L260 280 L285 360 L75 360 Z"
          />

          {/* ABS */}
          <path
            id="abs"
            d="M130 360 L230 360 L230 470 L130 470 Z"
          />

          {/* OBLIQUES */}
          <path
            id="obliques-left"
            d="M75 360 L130 360 L130 470 L45 430 Z"
          />
          <path
            id="obliques-right"
            d="M230 360 L285 360 L315 430 L230 470 Z"
          />

          {/* ARMS – BICEPS */}
          <path
            id="biceps-left"
            d="M55 280 L25 360 L55 430 L90 360 Z"
          />
          <path
            id="biceps-right"
            d="M305 280 L335 360 L305 430 L270 360 Z"
          />

          {/* ARMS – TRICEPS */}
          <path
            id="triceps-left"
            d="M25 360 L10 430 L60 430 L60 390 Z"
          />
          <path
            id="triceps-right"
            d="M335 360 L350 430 L300 430 L300 390 Z"
          />

          {/* FOREARMS */}
          <path
            id="forearm-left"
            d="M10 430 L10 540 L70 540 L70 430 Z"
          />
          <path
            id="forearm-right"
            d="M350 430 L350 540 L290 540 L290 430 Z"
          />

          {/* LEGS – QUADS */}
          <path
            id="quads-left"
            d="M130 470 L170 470 L170 620 L130 620 Z"
          />
          <path
            id="quads-right"
            d="M170 470 L210 470 L210 620 L170 620 Z"
          />

          {/* LEGS – HAMSTRINGS */}
          <path
            id="hamstrings-left"
            d="M130 620 L170 620 L170 700 L130 700 Z"
          />
          <path
            id="hamstrings-right"
            d="M170 620 L210 620 L210 700 L170 700 Z"
          />

          {/* LEGS – CALVES */}
          <path
            id="calves-left"
            d="M130 700 L170 700 L170 760 L130 760 Z"
          />
          <path
            id="calves-right"
            d="M170 700 L210 700 L210 760 L170 760 Z"
          />
        </svg>
      </div>
    </div>
  );
}

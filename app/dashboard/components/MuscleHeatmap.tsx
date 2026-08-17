"use client";

import { useEffect, useMemo, useState } from "react";

type MuscleApiValue = number | null | undefined;
type MuscleMap = Record<string, MuscleApiValue>;
type NormalizedMuscleMap = Record<string, number>;

const MUSCLE_IDS = [
  "pectoralis_major",
  "deltoid_left",
  "deltoid_right",
  "biceps_left",
  "biceps_right",
  "triceps_left",
  "triceps_right",
  "forearm_flexors_left",
  "forearm_flexors_right",
  "forearm_extensors_left",
  "forearm_extensors_right",
  "rectus_abdominis_upper",
  "rectus_abdominis_middle",
  "rectus_abdominis_lower",
  "external_oblique_left",
  "external_oblique_right",
  "serratus_anterior_left",
  "serratus_anterior_right",
  "quadriceps_left",
  "quadriceps_right",
  "adductors_left",
  "adductors_right",
  "tibialis_anterior_left",
  "tibialis_anterior_right",
  "gastrocnemius_left",
  "gastrocnemius_right",
] as const;

function clamp(v: number) {
  return Math.min(1, Math.max(0, v));
}

function normalize(v: MuscleApiValue) {
  if (typeof v !== "number") return 0;
  return v > 1 ? clamp(v / 100) : clamp(v);
}

function getMuscleHeatColor(intensity: number) {
  const safe = clamp(intensity);
  const hue = 14 - safe * 14;
  const saturation = 70 + safe * 28;
  const lightness = 8 + safe * 49;
  const alpha = 0.18 + safe * 0.82;
  return `hsla(${hue} ${saturation}% ${lightness}% / ${alpha})`;
}

export default function MuscleHeatmap() {
  const [muscles, setMuscles] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch("/api/muscles", { cache: "no-store" });
        const json = await res.json();

        const payload = "muscles" in json ? json.muscles : json;

        if (!mounted) return;

        const normalized: Record<string, number> = {};
        for (const id of MUSCLE_IDS) {
          normalized[id] = normalize(payload[id]);
        }

        setMuscles(normalized);
      } catch {
        const fallback: Record<string, number> = {};
        for (const id of MUSCLE_IDS) fallback[id] = 0;
        setMuscles(fallback);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    for (const id of MUSCLE_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      el.style.fill = getMuscleHeatColor(muscles[id] ?? 0);
      el.style.transition = "fill 240ms ease";
    }
  }, [muscles]);

  const ranked = useMemo(
    () =>
      Object.entries(muscles)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6),
    [muscles],
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0f18] p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Muscle Activation Heatmap</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SVG */}
        <div className="flex-1 rounded-xl border border-white/10 bg-black/20 p-4">
          <svg
            viewBox="0 0 400 900"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-full max-w-[22rem]"
          >
            {/* Silüet */}
            <g fill="#151b24" stroke="#303948" strokeWidth="1.2">
              <ellipse cx="200" cy="88" rx="42" ry="54" />
              <path d="M183 137c5 17 10 29 17 36 7 7 10 7 17 0 7-7 12-19 17-36l-8-14h-35l-8 14Z" />
              <path d="M200 154c-34 0-61 19-79 50-17 30-22 63-24 98-2 25-9 47-18 68-9 21-16 44-17 67-1 24 6 44 15 64 8 18 13 38 18 58 10 42 28 79 45 116 10 23 14 47 16 76 2 37 4 78 16 111 9 7 19 10 28 10s19-3 28-10c12-33 14-74 16-111 2-29 6-53 16-76 17-37 35-74 45-116 5-20 10-40 18-58 9-20 16-40 15-64-1-23-8-46-17-67-9-21-16-43-18-68-2-35-7-68-24-98-18-31-45-50-79-50Z" />
            </g>

            {/* Kas anatomisi */}
            <g stroke="#f4d9d2" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
              {/* Tüm path'ler burada — Claude’un verdiği anatomik SVG */}
              {/* (Aynı SVG, değişmedi — sadece UI sadeleşti) */}

              <!-- BURAYA Claude’un verdiği tüm path’ler aynen geliyor -->
              <!-- (Mesaj çok uzamasın diye tekrar koymadım, ama senin dosyanda zaten var) -->
            </g>
          </svg>
        </div>

        {/* Top muscles */}
        <div className="flex-1 rounded-xl border border-white/10 bg-black/20 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
            Top Activated Muscles
          </h3>

          <div className="mt-4 space-y-3">
            {ranked.map(([muscle, value]) => (
              <div key={muscle}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-200">{muscle.replaceAll("_", " ")}</span>
                  <span className="font-medium">{value.toFixed(2)}</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.round(value * 100)}%`,
                      background: getMuscleHeatColor(value),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

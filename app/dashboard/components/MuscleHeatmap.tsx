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

const DEFAULT_MUSCLE_DATA: NormalizedMuscleMap = {
  pectoralis_major: 0.74,
  deltoid_left: 0.63,
  deltoid_right: 0.67,
  biceps_left: 0.51,
  biceps_right: 0.57,
  triceps_left: 0.34,
  triceps_right: 0.39,
  forearm_flexors_left: 0.43,
  forearm_flexors_right: 0.47,
  forearm_extensors_left: 0.31,
  forearm_extensors_right: 0.35,
  rectus_abdominis_upper: 0.82,
  rectus_abdominis_middle: 0.72,
  rectus_abdominis_lower: 0.56,
  external_oblique_left: 0.45,
  external_oblique_right: 0.48,
  serratus_anterior_left: 0.41,
  serratus_anterior_right: 0.44,
  quadriceps_left: 0.85,
  quadriceps_right: 0.8,
  adductors_left: 0.53,
  adductors_right: 0.49,
  tibialis_anterior_left: 0.62,
  tibialis_anterior_right: 0.6,
  gastrocnemius_left: 0.58,
  gastrocnemius_right: 0.55,
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function normalizeActivation(value: MuscleApiValue): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return value > 1 ? clamp(value / 100) : clamp(value);
}

function buildNormalizedMap(source?: MuscleMap | null): NormalizedMuscleMap {
  const base: NormalizedMuscleMap = { ...DEFAULT_MUSCLE_DATA };

  if (!source) {
    return base;
  }

  for (const muscleId of MUSCLE_IDS) {
    if (muscleId in source) {
      base[muscleId] = normalizeActivation(source[muscleId]);
    }
  }

  return base;
}

export function getMuscleHeatColor(intensity: number) {
  const safe = clamp(intensity);
  const hue = 14 - safe * 14;
  const saturation = 70 + safe * 28;
  const lightness = 8 + safe * 49;
  const alpha = 0.18 + safe * 0.82;

  return `hsla(${hue.toFixed(1)} ${saturation.toFixed(1)}% ${lightness.toFixed(1)}% / ${alpha.toFixed(2)})`;
}

export default function MuscleHeatmap() {
  const [muscles, setMuscles] = useState<NormalizedMuscleMap>(DEFAULT_MUSCLE_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchMuscles() {
      try {
        const response = await fetch("/api/muscles", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const json = (await response.json()) as unknown;
        const payload =
          typeof json === "object" && json !== null && "muscles" in json
            ? (json as { muscles?: MuscleMap }).muscles
            : (json as MuscleMap);

        if (!mounted) {
          return;
        }

        setMuscles(buildNormalizedMap(payload));
        setError(null);
      } catch (fetchError) {
        if (!mounted) {
          return;
        }

        setMuscles(buildNormalizedMap(null));
        setError(fetchError instanceof Error ? fetchError.message : "Unknown error");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchMuscles();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    for (const muscleId of MUSCLE_IDS) {
      const element = document.getElementById(muscleId);
      if (!element) {
        continue;
      }

      const intensity = muscles[muscleId] ?? 0;
      element.style.fill = getMuscleHeatColor(intensity);
      element.style.transition = "fill 240ms ease";
    }
  }, [muscles]);

  const rankedMuscles = useMemo(() => {
    return Object.entries(muscles)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [muscles]);

  return (
    <section className="overflow-hidden rounded-[2.4rem] border border-white/15 bg-[radial-gradient(circle_at_top,#1b2436_0%,#05070c_55%,#020309_100%)] p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.65)] lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-red-400/40 bg-red-500/15 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-red-100 shadow-[0_0_0_1px_rgba(0,0,0,0.35)]">
              MuscleSync • Detailed Anatomy Heatmap
            </span>
            <span className="rounded-full border border-white/20 bg-white/8 px-3.5 py-1.5 text-[0.7rem] text-slate-200/90 backdrop-blur-md">
              {loading ? "Syncing muscle telemetry…" : error ? "Fallback anatomy data in use" : "Live data from /api/muscles"}
            </span>
          </div>

          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-[2.35rem]">
            Front-view muscular system SVG with isolated production IDs for API-driven heatmap coloring.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300/95 sm:text-[0.95rem]">
            The anatomy is structured as flat vector muscle regions without gradients or symbolic shortcuts, allowing precise per-muscle activation tinting inside a Next.js dashboard.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3 auto-rows-fr">
            <div className="rounded-3xl border border-white/15 bg-white/8 p-5 backdrop-blur-xl shadow-[0_10px_32px_rgba(0,0,0,0.45)]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-200/90">SVG style</p>
              <p className="mt-2 text-sm text-slate-100/95">Flat fills, inline attributes, no external assets.</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/8 p-5 backdrop-blur-xl shadow-[0_10px_32px_rgba(0,0,0,0.45)]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-200/90">DOM coloring</p>
              <p className="mt-2 text-sm text-slate-100/95">Safe document.getElementById(id).style.fill updates after hydration.</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/8 p-5 backdrop-blur-xl shadow-[0_10px_32px_rgba(0,0,0,0.45)]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-200/90">Score support</p>
              <p className="mt-2 text-sm text-slate-100/95">Accepts both 0–1 and 0–100 muscle activation payloads.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-white/15 bg-gradient-to-b from-[#0d1117] to-[#05070a] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <svg
            viewBox="0 0 400 900"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="muscle-heatmap-title muscle-heatmap-desc"
            className="mx-auto h-auto w-full max-w-[25rem]"
          >
            <title id="muscle-heatmap-title">MuscleSync realistic front view muscular anatomy heatmap</title>
            <desc id="muscle-heatmap-desc">
              Front-view muscular system illustration with separate paths for chest, shoulders, arms, forearms, abdominals, obliques, serratus, thighs, shins, and calves.
            </desc>

            <g fill="#151b24" stroke="#303948" strokeWidth="1.2">
              <ellipse cx="200" cy="88" rx="42" ry="54" />
              <path d="M183 137c5 17 10 29 17 36 7 7 10 7 17 0 7-7 12-19 17-36l-8-14h-35l-8 14Z" />
              <path d="M200 154c-34 0-61 19-79 50-17 30-22 63-24 98-2 25-9 47-18 68-9 21-16 44-17 67-1 24 6 44 15 64 8 18 13 38 18 58 10 42 28 79 45 116 10 23 14 47 16 76 2 37 4 78 16 111 9 7 19 10 28 10s19-3 28-10c12-33 14-74 16-111 2-29 6-53 16-76 17-37 35-74 45-116 5-20 10-40 18-58 9-20 16-40 15-64-1-23-8-46-17-67-9-21-16-43-18-68-2-35-7-68-24-98-18-31-45-50-79-50Z" />
            </g>

            <g fill="none" stroke="#28303b" strokeWidth="1">
              <path d="M200 160v292" />
              <path d="M171 264c8 6 18 9 29 9s21-3 29-9" />
              <path d="M170 333c9 8 19 11 30 11s21-3 30-11" />
              <path d="M166 404c11 9 22 13 34 13s23-4 34-13" />
              <path d="M160 500c12 8 25 12 40 12s28-4 40-12" />
            </g>

            <g stroke="#f4d9d2" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
              <path
                id="pectoralis_major"
                fill={getMuscleHeatColor(muscles.pectoralis_major)}
                d="M145 191c12-18 31-30 55-34v70c-21 0-41 4-57 14-10 6-18 13-24 21 0-31 8-50 26-71Zm110-34c24 4 43 16 55 34 18 21 26 40 26 71-6-8-14-15-24-21-16-10-36-14-57-14v-70Z"
              />
              <path
                id="deltoid_left"
                fill={getMuscleHeatColor(muscles.deltoid_left)}
                d="M116 183c18-18 38-28 59-30-8 10-13 21-15 36-3 19-12 34-27 47-13 11-22 23-28 37-8-38-4-67 11-90Z"
              />
              <path
                id="deltoid_right"
                fill={getMuscleHeatColor(muscles.deltoid_right)}
                d="M284 183c-18-18-38-28-59-30 8 10 13 21 15 36 3 19 12 34 27 47 13 11 22 23 28 37 8-38 4-67-11-90Z"
              />
              <path
                id="biceps_left"
                fill={getMuscleHeatColor(muscles.biceps_left)}
                d="M111 276c8-20 19-37 35-50 10 9 15 21 17 37 2 17 0 34-4 51-5 18-11 35-20 52-11-11-18-26-23-44-7-26-9-40-5-46Z"
              />
              <path
                id="biceps_right"
                fill={getMuscleHeatColor(muscles.biceps_right)}
                d="M289 276c-8-20-19-37-35-50-10 9-15 21-17 37-2 17 0 34 4 51 5 18 11 35 20 52 11-11 18-26 23-44 7-26 9-40 5-46Z"
              />
              <path
                id="triceps_left"
                fill={getMuscleHeatColor(muscles.triceps_left)}
                d="M143 234c-15 8-27 20-37 35-8 12-12 26-13 44-2 24 2 47 11 67 5 11 11 21 18 29 3-18 8-35 14-53 8-24 13-48 14-71 1-18-1-35-7-51Z"
              />
              <path
                id="triceps_right"
                fill={getMuscleHeatColor(muscles.triceps_right)}
                d="M257 234c15 8 27 20 37 35 8 12 12 26 13 44 2 24-2 47-11 67-5 11-11 21-18 29-3-18-8-35-14-53-8-24-13-48-14-71-1-18 1-35 7-51Z"
              />
              <path
                id="forearm_flexors_left"
                fill={getMuscleHeatColor(muscles.forearm_flexors_left)}
                d="M105 401c10-8 20-14 31-18 10 17 12 34 8 53-3 14-8 28-15 41-7 14-12 28-15 42-12-11-18-25-20-43-2-21 1-40 11-75Z"
              />
              <path
                id="forearm_flexors_right"
                fill={getMuscleHeatColor(muscles.forearm_flexors_right)}
                d="M295 401c-10-8-20-14-31-18-10 17-12 34-8 53 3 14 8 28 15 41 7 14 12 28 15 42 12-11 18-25 20-43 2-21-1-40-11-75Z"
              />
              <path
                id="forearm_extensors_left"
                fill={getMuscleHeatColor(muscles.forearm_extensors_left)}
                d="M131 387c-10 15-15 32-16 50-1 17 2 34 9 49 4 9 9 18 15 26 4-12 9-24 15-36 10-19 13-38 11-60-1-11-3-21-8-29-9 0-18 0-26 0Z"
              />
              <path
                id="forearm_extensors_right"
                fill={getMuscleHeatColor(muscles.forearm_extensors_right)}
                d="M269 387c10 15 15 32 16 50 1 17-2 34-9 49-4 9-9 18-15 26-4-12-9-24-15-36-10-19-13-38-11-60 1-11 3-21 8-29 9 0 18 0 26 0Z"
              />
              <path
                id="serratus_anterior_left"
                fill={getMuscleHeatColor(muscles.serratus_anterior_left)}
                d="M147 237c13-6 27-10 42-10-2 9-5 18-10 27-7 13-17 20-29 24-10 4-17 10-23 19-5-10-7-20-7-31 0-13 10-22 27-29Zm8 32c7-1 14-4 20-8-3 7-7 13-12 17-7 5-14 8-22 9 3-8 8-14 14-18Zm11 29c7-2 13-5 18-10-2 8-6 15-12 20-6 5-13 8-21 10 2-8 7-15 15-20Z"
              />
              <path
                id="serratus_anterior_right"
                fill={getMuscleHeatColor(muscles.serratus_anterior_right)}
                d="M253 237c-13-6-27-10-42-10 2 9 5 18 10 27 7 13 17 20 29 24 10 4 17 10 23 19 5-10 7-20 7-31 0-13-10-22-27-29Zm-8 32c-7-1-14-4-20-8 3 7 7 13 12 17 7 5 14 8 22 9-3-8-8-14-14-18Zm-11 29c-7-2-13-5-18-10 2 8 6 15 12 20 6 5 13 8 21 10-2-8-7-15-15-20Z"
              />
              <path
                id="external_oblique_left"
                fill={getMuscleHeatColor(muscles.external_oblique_left)}
                d="M142 284c14-4 27-5 39-5-3 16-2 32 2 49 5 19 9 38 10 58-16-3-30-12-41-28-12-17-18-37-18-58 0-7 3-12 8-16Z"
              />
              <path
                id="external_oblique_right"
                fill={getMuscleHeatColor(muscles.external_oblique_right)}
                d="M258 284c-14-4-27-5-39-5 3 16 2 32-2 49-5 19-9 38-10 58 16-3 30-12 41-28 12-17 18-37 18-58 0-7-3-12-8-16Z"
              />
              <path
                id="rectus_abdominis_upper"
                fill={getMuscleHeatColor(muscles.rectus_abdominis_upper)}
                d="M180 244c6-6 13-8 20-8s14 2 20 8l-3 28c-2 12-8 22-17 29-9-7-15-17-17-29l-3-28Z"
              />
              <path
                id="rectus_abdominis_middle"
                fill={getMuscleHeatColor(muscles.rectus_abdominis_middle)}
                d="M182 307c5 5 11 7 18 7s13-2 18-7l4 48c-5 9-12 14-22 14s-17-5-22-14l4-48Z"
              />
              <path
                id="rectus_abdominis_lower"
                fill={getMuscleHeatColor(muscles.rectus_abdominis_lower)}
                d="M181 382c6 4 12 6 19 6s13-2 19-6l3 54c-5 11-12 20-22 27-10-7-17-16-22-27l3-54Z"
              />
              <path
                id="quadriceps_left"
                fill={getMuscleHeatColor(muscles.quadriceps_left)}
                d="M160 495c14 6 28 9 40 9 3 36 0 72-7 107-5 26-10 53-11 81-19-4-33-13-43-28-10-16-15-40-13-70 2-26 9-49 18-70 7-16 12-28 16-29Z"
              />
              <path
                id="quadriceps_right"
                fill={getMuscleHeatColor(muscles.quadriceps_right)}
                d="M240 495c-14 6-28 9-40 9-3 36 0 72 7 107 5 26 10 53 11 81 19-4 33-13 43-28 10-16 15-40 13-70-2-26-9-49-18-70-7-16-12-28-16-29Z"
              />
              <path
                id="adductors_left"
                fill={getMuscleHeatColor(muscles.adductors_left)}
                d="M183 520c-7 12-13 27-16 43-6 29-5 57 2 84 5 20 11 34 18 45 2-31 6-61 11-90 5-29 7-56 3-84-6 0-12 1-18 2Z"
              />
              <path
                id="adductors_right"
                fill={getMuscleHeatColor(muscles.adductors_right)}
                d="M217 520c7 12 13 27 16 43 6 29 5 57-2 84-5 20-11 34-18 45-2-31-6-61-11-90-5-29-7-56-3-84 6 0 12 1 18 2Z"
              />
              <path
                id="tibialis_anterior_left"
                fill={getMuscleHeatColor(muscles.tibialis_anterior_left)}
                d="M169 707c8 5 14 11 18 20 4 11 5 24 3 39-1 17-2 34 0 50-6 14-15 22-28 22-10-4-17-12-19-24-3-15-2-30 1-45 5-22 12-42 25-62Z"
              />
              <path
                id="tibialis_anterior_right"
                fill={getMuscleHeatColor(muscles.tibialis_anterior_right)}
                d="M231 707c-8 5-14 11-18 20-4 11-5 24-3 39 1 17 2 34 0 50 6 14 15 22 28 22 10-4 17-12 19-24 3-15 2-30-1-45-5-22-12-42-25-62Z"
              />
              <path
                id="gastrocnemius_left"
                fill={getMuscleHeatColor(muscles.gastrocnemius_left)}
                d="M154 704c9 6 15 15 18 25 4 13 4 27 0 42-4 16-8 33-7 49-4 9-10 15-20 18-12-3-20-12-23-26-4-19-1-38 6-56 7-18 13-35 26-52Z"
              />
              <path
                id="gastrocnemius_right"
                fill={getMuscleHeatColor(muscles.gastrocnemius_right)}
                d="M246 704c-9 6-15 15-18 25-4 13-4 27 0 42 4 16 8 33 7 49 4 9 10 15 20 18 12-3 20-12 23-26 4-19 1-38-6-56-7-18-13-35-26-52Z"
              />
            </g>

            <g fill="#10151d" stroke="#2a3340" strokeWidth="1">
              <ellipse cx="94" cy="520" rx="16" ry="24" />
              <ellipse cx="306" cy="520" rx="16" ry="24" />
              <path d="M145 850c12 7 28 8 45 2-6 10-18 16-34 17-11 1-21-3-28-10 2-4 8-8 17-9Z" />
              <path d="M255 850c-12 7-28 8-45 2 6 10 18 16 34 17 11 1 21-3 28-10-2-4-8-8-17-9Z" />
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/15 bg-white/8 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Top activated muscles</h3>
            <span className="text-xs text-slate-400">Normalized 0–1</span>
          </div>
          <div className="mt-4 space-y-3">
            {rankedMuscles.map(([muscle, value]) => (
              <div key={muscle}>
                <div className="mb-1 flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-200">{muscle.replaceAll("_", " ")}</span>
                  <span className="font-medium text-white">{value.toFixed(2)}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.round(value * 100)}%`, background: getMuscleHeatColor(value) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/8 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Recommended heatmap color function</h3>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/30 p-4 text-xs leading-6 text-red-100">
            <code>{`function getMuscleHeatColor(intensity: number) {
  const safe = Math.min(1, Math.max(0, intensity));
  const hue = 14 - safe * 14;
  const saturation = 70 + safe * 28;
  const lightness = 8 + safe * 49;
  const alpha = 0.18 + safe * 0.82;

  return \`hsla(\${hue.toFixed(1)} \${saturation.toFixed(1)}% \${lightness.toFixed(1)}% / \${alpha.toFixed(2)})\`;
}`}</code>
          </pre>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This function produces a near-invisible deep ember tone at low activation and a bright, saturated red at peak activation, which works cleanly with flat anatomical vector shapes.
          </p>
        </div>
      </div>
    </section>
  );
}

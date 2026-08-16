"use client";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#14141f] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">Dashboard</h1>
      <p className="text-gray-300 text-lg mb-8">
        Welcome to your anatomy‑aware training dashboard.
      </p>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">Muscle Activation</h2>
          <p className="text-gray-300 text-sm">
            View your weekly muscle heatmap and balance metrics.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">Workout History</h2>
          <p className="text-gray-300 text-sm">
            Track completed sessions and performance improvements.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-orange-500 mb-2">AI Recommendations</h2>
          <p className="text-gray-300 text-sm">
            Get adaptive training suggestions based on your recovery and goals.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function Hero() {
  return (
    <section className="w-full text-center py-24 bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Build Your Best Body with <span className="text-blue-600">MuscleSync</span>
      </h1>

      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
        AI-powered fitness tracking, personalized workout plans, and real-time progress monitoring.
      </p>

      <a
        href="/register"
        className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Get Started
      </a>
    </section>
  );
}

import Link from "next/link";

export default function IndexPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to MuscleSync</h1>

      <Link
        href="/"
        className="text-orange-500 underline hover:text-orange-300 transition"
      >
        Go to Homepage
      </Link>
    </main>
  );
}

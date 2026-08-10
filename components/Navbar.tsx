export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 bg-white shadow-sm">
      <div className="text-2xl font-bold text-gray-900">
        MuscleSync
      </div>

      <div className="flex gap-6 text-gray-700 font-medium">
        <a href="/" className="hover:text-black">Home</a>
        <a href="/login" className="hover:text-black">Login</a>
        <a href="/register" className="hover:text-black">Register</a>
      </div>
    </nav>
  );
}

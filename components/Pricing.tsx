export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Pricing</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 border rounded-xl shadow-sm bg-white">
            <h3 className="text-2xl font-semibold mb-4">Free</h3>
            <p className="text-gray-600 mb-6">Basic features for beginners.</p>
            <p className="text-3xl font-bold mb-6">$0</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Start Free
            </button>
          </div>

          <div className="p-8 border rounded-xl shadow-sm bg-white">
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-gray-600 mb-6">Advanced AI workout plans.</p>
            <p className="text-3xl font-bold mb-6">$9.99/mo</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Upgrade
            </button>
          </div>

          <div className="p-8 border rounded-xl shadow-sm bg-white">
            <h3 className="text-2xl font-semibold mb-4">Elite</h3>
            <p className="text-gray-600 mb-6">Full analytics + nutrition AI.</p>
            <p className="text-3xl font-bold mb-6">$19.99/mo</p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Go Elite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

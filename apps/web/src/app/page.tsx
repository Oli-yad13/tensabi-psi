import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-purple-700">Tena-Sabi</h1>
        <p className="text-gray-600">Your Health. Your Privacy.</p>
        <Link
          href="/hiv-test"
          className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
        >
          HIV Self-Test
        </Link>
      </div>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-4xl font-bold mb-4">
        Growally
      </h1>

      <p className="text-lg text-gray-600 max-w-xl mb-8">
        An AI-powered growth and funding assistant that helps early-stage startups
        create high-impact content and investor-ready pitches in minutes.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/signup")}
          className="bg-primary text-black font-bold px-8 py-3 rounded-full hover:bg-green-400 transition transform hover:scale-105"
        >
          Get Started
        </button>
        <button
          onClick={() => router.push("/login")}
          className="bg-transparent border border-gray-600 text-white px-8 py-3 rounded-full hover:border-white transition"
        >
          Log In
        </button>
      </div>

    </main>
  );
}

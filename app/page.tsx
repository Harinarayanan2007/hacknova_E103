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

      <button
        onClick={() => router.push("/onboarding")}
        className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
      >
        Start Now
      </button>

    </main>
  );
}

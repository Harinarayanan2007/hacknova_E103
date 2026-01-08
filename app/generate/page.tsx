"use client";

import { useEffect, useState } from "react";

export default function GeneratePage() {
  const [profile, setProfile] = useState<any>(null);
  const [platform, setPlatform] = useState("LinkedIn");
  const [tone, setTone] = useState("Professional");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const storedProfile = localStorage.getItem("startupProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleGenerate = () => {
    if (!profile) return;

    // TEMP output (AI comes next step)
    setOutput(
      `Platform: ${platform}\nTone: ${tone}\n\nStartup:\n${profile.problem}\n\nGenerated content will appear here.`
    );
  };

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading startup profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <div className="w-full max-w-2xl bg-secondary p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Generate Content
        </h1>

        {/* Platform */}
        <label className="block mb-2 text-sm font-medium text-gray-400">Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full bg-black border border-gray-700 text-white rounded-xl px-4 py-3 mb-6 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        >
          <option>LinkedIn</option>
          <option>Instagram</option>
          <option>X</option>
        </select>

        {/* Tone */}
        <label className="block mb-2 text-sm font-medium text-gray-400">Tone</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full bg-black border border-gray-700 text-white rounded-xl px-4 py-3 mb-8 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        >
          <option>Professional</option>
          <option>Bold</option>
          <option>Visionary</option>
        </select>

        <button
          onClick={handleGenerate}
          className="w-full bg-primary text-black font-bold uppercase tracking-wide px-6 py-4 rounded-xl hover:bg-green-400 hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all duration-300 mb-8"
        >
          Generate
        </button>

        {output && (
          <textarea
            value={output}
            readOnly
            className="w-full h-48 bg-black border border-gray-700 rounded-xl p-6 text-gray-300 font-mono text-sm leading-relaxed focus:outline-none"
          />
        )}
      </div>
    </main>
  );
}

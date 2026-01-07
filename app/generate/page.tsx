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
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">
          Generate Content
        </h1>

        {/* Platform */}
        <label className="block mb-2 font-medium">Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        >
          <option>LinkedIn</option>
          <option>Instagram</option>
          <option>X</option>
        </select>

        {/* Tone */}
        <label className="block mb-2 font-medium">Tone</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-6"
        >
          <option>Professional</option>
          <option>Bold</option>
          <option>Visionary</option>
        </select>

        <button
          onClick={handleGenerate}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition mb-6"
        >
          Generate
        </button>

        {output && (
          <textarea
            value={output}
            readOnly
            className="w-full h-48 border rounded-md p-4"
          />
        )}
      </div>
    </main>
  );
}

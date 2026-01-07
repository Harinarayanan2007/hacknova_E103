"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [analysis, setAnalysis] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("startupProfile");
    if (data) {
      const parsed = JSON.parse(data);
      setProfile(parsed);

      // Temporary AI-like analysis (real AI comes next)
      setAnalysis(`
Based on your startup:

• Focus on validating product-market fit
• Improve brand visibility through consistent content
• Build trust via storytelling and founder-led posts
• Prepare clear investor narrative and traction metrics

Recommended next steps:
1. Strengthen customer feedback loop
2. Build online presence (LinkedIn & Instagram)
3. Prepare pitch-ready content
      `);
    }
  }, []);

  if (!profile) {
    return <p className="p-6">Loading analysis...</p>;
  }

  return (
    <main className="min-h-screen flex justify-center px-6 py-10">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4">
          Startup Analysis & Recommendations
        </h1>

        <pre className="bg-gray-100 p-4 rounded-md mb-6 whitespace-pre-wrap">
          {analysis}
        </pre>

        <button
          onClick={() => router.push("/assistant")}
          className="bg-black text-white px-6 py-3 rounded-md"
        >
          Talk to AI Assistant
        </button>
      </div>
    </main>
  );
}

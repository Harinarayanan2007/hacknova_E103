"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const questions = [
    "What problem does your startup solve?",
    "Who is your target customer?",
    "What solution are you building?",
    "What stage is your startup in?",
    "What is your primary goal right now?"
  ];

  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  const handleNext = () => {
    if (!answer.trim()) return;

    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    setAnswer("");

    if (step === questions.length - 1) {
      const profile = {
        problem: updatedAnswers[0],
        customer: updatedAnswers[1],
        solution: updatedAnswers[2],
        stage: updatedAnswers[3],
        goal: updatedAnswers[4]
      };

      // Save profile locally
      localStorage.setItem("startupProfile", JSON.stringify(profile));

      // Update User Status in DB
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        // Mark as on-boarded in background (non-blocking)
        fetch('/api/user/complete-onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email })
        });

        // Update local user object too
        user.hasOnboarded = true;
        localStorage.setItem("user", JSON.stringify(user));
      }

      router.push("/analysis");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <div className="w-full max-w-xl bg-secondary p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-gray-500">STEP {step + 1} / {questions.length}</span>
            <span className="text-xs font-mono text-primary animate-pulse">GROWALLY_INIT</span>
          </div>
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">
          {questions[step]}
        </h2>

        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="w-full bg-black border border-gray-700 focus:border-primary rounded-xl px-5 py-4 mb-8 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />

        <button
          onClick={handleNext}
          className="w-full bg-primary text-black font-bold uppercase tracking-wide px-6 py-4 rounded-xl hover:bg-green-400 hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all duration-300"
        >
          {step === questions.length - 1 ? "Finish Integration" : "Next Step"}
        </button>
      </div>
    </main>
  );
}

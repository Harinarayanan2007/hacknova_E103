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

      localStorage.setItem("startupProfile", JSON.stringify(profile));
      router.push("/analysis");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">
          {questions[step]}
        </h2>

        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4"
        />

        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          {step === questions.length - 1 ? "Finish" : "Next"}
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Step {step + 1} of {questions.length}
        </p>
      </div>
    </main>
  );
}

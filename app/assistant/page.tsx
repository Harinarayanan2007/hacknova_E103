"use client";

import { useEffect, useState } from "react";

/* ---------- TYPES ---------- */
type Message = {
  role: "user" | "assistant";
  content: string;
};

/* ---------- COMPONENT ---------- */
export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* ---------- LOAD STARTUP PROFILE + INITIAL MESSAGE ---------- */
  useEffect(() => {
    const data = localStorage.getItem("startupProfile");
    if (data) {
      setProfile(JSON.parse(data));
    }

    const initialMessage: Message = {
      role: "assistant",
      content:
        "Hi! I’m Growally, your AI startup assistant.\n\nI can help you with:\n• Improving your startup performance\n• Marketing & content creation\n• Funding & pitch preparation\n\nWhat would you like to do?",
    };

    setMessages([initialMessage]);
  }, []);

  /* ---------- SEND MESSAGE ---------- */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          profile,
        }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "Sorry, I couldn’t generate a response.",
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <main className="min-h-screen flex justify-center px-6 py-10 bg-gray-50">
      <div className="max-w-2xl w-full flex flex-col bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold mb-4 text-center">
          Growally AI Assistant
        </h1>

        {/* CHAT WINDOW */}
        <div className="flex-1 border rounded-md p-4 mb-4 overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`whitespace-pre-wrap ${
                msg.role === "assistant"
                  ? "text-gray-700"
                  : "text-black font-medium"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <p className="text-gray-400 italic">Thinking...</p>
          )}
        </div>

        {/* INPUT */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Growally something..."
            className="flex-1 border px-4 py-2 rounded-md"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

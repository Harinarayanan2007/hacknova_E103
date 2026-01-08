"use client";

import { useEffect, useState } from "react";

/* ---------- TYPES ---------- */
type Message = {
  role: "user" | "assistant";
  content: string;
  image?: { prompt: string; url: string };
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

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "Thinking...",
        ...(data.image ? { image: data.image } : {})
      } as Message;

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error: any) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: error.message || "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */
  return (
    <main className="min-h-screen flex justify-center px-4 py-6 bg-background text-foreground font-sans">
      <div className="max-w-3xl w-full flex flex-col h-[85vh] bg-secondary border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-black/40 backdrop-blur-md p-4 border-b border-gray-800 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Growally Agent
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs text-primary font-medium tracking-wider">ONLINE</span>
          </div>
        </div>

        {/* CHAT WINDOW */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"
                }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-md transition-all ${msg.role === "assistant"
                  ? "bg-black border border-gray-800 text-gray-100 rounded-bl-sm"
                  : "bg-primary text-black font-semibold rounded-br-sm"
                  }`}
              >
                <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                  {msg.content}
                </div>
                {/* Check for Image Attachment */}
                {(msg as any).image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-gray-700">
                    <img
                      src={(msg as any).image.url}
                      alt={(msg as any).image.prompt}
                      className="w-full h-auto object-cover"
                    />
                    <div className="bg-black/50 p-2 text-xs text-gray-400">
                      Generated: {(msg as any).image.prompt}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-black border border-gray-800 rounded-2xl px-5 py-4 rounded-bl-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="p-4 bg-black/40 border-t border-gray-800">
          <div className="relative flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about your startup..."
              className="w-full bg-black border border-gray-700 text-white placeholder-gray-500 rounded-xl px-5 py-4 pr-12 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="absolute right-2 p-2 bg-primary text-black rounded-lg hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

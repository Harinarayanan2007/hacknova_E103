export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming request
    const { messages, profile } = await req.json();

    // 2. Validate API Key
    const apiKey = process.env.localGEMINI_API_KEY;
    if (!apiKey) {
      console.error("ERROR: GEMINI_API_KEY is not defined in .env.local");
      return NextResponse.json(
        { error: "Missing Gemini API Key" },
        { status: 500 }
      );
    }

    // 3. Initialize the Gemini SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-1.5-flash for stability (addresses the 404 Not Found error)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // 4. Construct the prompt
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const prompt = `
      You are Growally, an AI startup growth assistant.

      Startup context:
      Problem: ${profile?.problem || "Not provided"}
      Customer: ${profile?.customer || "Not provided"}
      Solution: ${profile?.solution || "Not provided"}
      Stage: ${profile?.stage || "Early stage"}
      Goal: ${profile?.goal || "Growth"}

      Conversation history:
      ${messages.map((m: any) => `${m.role}: ${m.content}`).join("\n")}

      User Request: ${lastUserMessage}

      Respond naturally. If generating content, ensure it aligns with the startup context above.
    `;

    // 5. Generate and Await Response
    const result = await model.generateContent(prompt);
    
    // CRITICAL FIX: You must await the response object before calling .text()
    const response = await result.response; 
    const text = response.text();

    // 6. Return the correct JSON structure for your frontend
    return NextResponse.json({ reply: text });

  } catch (err: any) {
    // Logs the actual error (Safety, Quota, or Auth) to your VS Code terminal
    console.error("GEMINI API ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType, FunctionDeclaration } from "@google/generative-ai";

// List of models to try in order of preference/stability
const MODELS = [
  "gemini-2.0-flash",     // User Preference
  "gemini-1.5-flash",     // Standard Fallback
  "gemini-2.0-flash-lite-preview-02-05",
  "gemini-2.0-flash-exp",
  "gemini-exp-1206",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
];

export async function POST(req: Request) {
  try {
    const { messages, profile } = await req.json();

    // 1. Check API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Define tools with explicit casting to avoid strict TS issues
    const toolDeclaration: FunctionDeclaration = {
      name: "generate_image",
      description: "Generate an image based on a prompt.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          prompt: {
            type: SchemaType.STRING,
            description: "The detailed description of the image to generate.",
          },
        },
        required: ["prompt"],
      },
    };

    const tools = [{ functionDeclarations: [toolDeclaration] }];

    const prompt = `
      You are Growally, an AI startup growth assistant.
      
      Startup context:
      Problem: ${profile?.problem || "Not specified"}
      Customer: ${profile?.customer || "Not specified"}
      Solution: ${profile?.solution || "Not specified"}
      Stage: ${profile?.stage || "Early"}
      Goal: ${profile?.goal || "Growth"}

      Conversation history:
      ${messages.map((m: any) => `${m.role}: ${m.content}`).join("\n")}

      Please respond naturally to the latest message. 
      If the user wants an image, call the 'generate_image' function.
    `;

    // Attempt generation with fallback
    let lastError: any = null;

    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          tools: tools as any, // Cast to any to bypass strict SDK type mismatches
        });

        const response = await result.response;

        // Handle function calls
        const call = response.functionCalls()?.[0];
        if (call) {
          if (call.name === "generate_image") {
            const args = call.args as any;
            const imgPrompt = args.prompt;
            return NextResponse.json({
              reply: `Pivoting to Image Gen for: "${imgPrompt}"...`,
              image: {
                prompt: imgPrompt,
                url: `https://placehold.co/600x400/00dc82/000000/png?text=${encodeURIComponent(imgPrompt.substring(0, 20))}`
              }
            });
          }
        }

        const text = response.text();
        return NextResponse.json({ reply: text });

      } catch (err: any) {
        console.error(`Error with model ${modelName}:`, err.message);
        lastError = err;
        // Continue to next model if this one failed
        continue;
      }
    }

    // --- FALLBACK SAFE MODE (Smart Mock) ---
    console.log("All models failed. Entering Smart Safe Mode.");

    // Simple heuristic responses so the bot remains useful even without AI
    const lastUserMessage = messages.slice().reverse().find((m: any) => m.role === "user")?.content?.toLowerCase() || "";

    // Image fallback
    const isImageRequest = lastUserMessage.includes("image") || lastUserMessage.includes("picture") || lastUserMessage.includes("photo") || lastUserMessage.includes("generate");
    if (isImageRequest) {
      const imgPrompt = lastUserMessage || "Generated Image";
      return NextResponse.json({
        reply: `(Offline Mode) I generated this image for you: "${imgPrompt}"`,
        image: {
          prompt: imgPrompt,
          url: `https://placehold.co/600x400/00dc82/000000/png?text=${encodeURIComponent(imgPrompt.substring(0, 20))}`
        }
      });
    }

    // Heuristics for common startup queries
    let replyText = "⚠️ **System Notice**: High traffic mode active. I can't generate complex AI answers right now, but here are some general tips:";

    if (lastUserMessage.includes("pitch") || lastUserMessage.includes("fund")) {
      replyText = "💰 **Pitching Tips (Offline Mode)**:\n\n1. **Problem**: Start with a painful problem.\n2. **Solution**: Clearly explain your fix.\n3. **Market**: Show the opportunity size.\n4. **Traction**: Prove people want it.\n\n*Try asking again in a minute for full AI help.*";
    } else if (lastUserMessage.includes("market") || lastUserMessage.includes("customer")) {
      replyText = "📈 **Marketing Basics (Offline Mode)**:\n\n- Define your Ideal Customer Profile (ICP).\n- Focus on one channel first (e.g., LinkedIn or SEO).\n- specific tactics require full AI connectivity.";
    } else {
      replyText = "⚠️ **High Traffic**: The AI models are currently busy. \n\nI can still Help with:\n- Pitch Decks\n- Marketing Strategy\n- Growth Hacking\n\nPlease try again in 1-2 minutes.";
    }

    return NextResponse.json({
      reply: replyText,
      image: null
    });

  } catch (err: any) {
    console.error("GEMINI API FATAL ERROR:", err);
    // Even in fatal error, try to return gracefully
    return NextResponse.json({
      reply: "⚠️ **System Error**: Something went wrong critically. Please check usage quotas.",
    });
  }
}
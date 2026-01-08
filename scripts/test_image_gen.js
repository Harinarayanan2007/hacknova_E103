const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testImageGen() {
    const envPath = path.resolve(__dirname, '../.env.local');
    let apiKey = process.env.GEMINI_API_KEY;

    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
    }

    // Strategy: Identify correct model from previous list
    // List contained: 
    // "models/gemini-2.5-flash-image",
    // "models/gemini-2.0-flash-exp-image-generation" (might be the one)

    // Let's try to list models again specifically looking for image capability if this fails, 
    // but for now let's try calling 'predict' on the *image* model.

    const modelName = "models/gemini-2.0-flash-exp-image-generation"; // or "models/gemini-2.5-flash-image"
    const url = `https://generativelanguage.googleapis.com/v1beta/${modelName}:predict?key=${apiKey}`;

    const requestBody = {
        instances: [
            {
                prompt: "A futuristic green and black startup office, neon lights, isometric view, 3d render",
            }
        ],
        parameters: {
            sampleCount: 1
        }
    };

    try {
        console.log(`Sending request to ${modelName}...`);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            console.log("Failed with " + modelName);
            // Try fallback: gemini-2.5-flash-image
            await tryFallback(apiKey, "models/gemini-2.5-flash-image");
            return;
        }

        const data = await response.json();
        console.log("Success with", modelName);
        if (data.predictions) console.log("Image received.");
        else console.log(JSON.stringify(data));

    } catch (error) {
        console.error("Test Error:", error);
    }
}

async function tryFallback(apiKey, modelName) {
    const url = `https://generativelanguage.googleapis.com/v1beta/${modelName}:predict?key=${apiKey}`;
    const requestBody = {
        instances: [{ prompt: "Test image" }],
        parameters: { sampleCount: 1 }
    };
    console.log(`Trying fallback ${modelName}...`);
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
        const t = await response.text();
        console.log(`Fallback failed: ${response.status} ${t}`);
    } else {
        const d = await response.json();
        console.log("Fallback Success!", d);
    }
}

testImageGen();

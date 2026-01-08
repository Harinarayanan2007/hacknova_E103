const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

async function testOpenAI() {
    const envPath = path.resolve(__dirname, '../.env.local');
    let apiKey = process.env.OPENAI_API_KEY;

    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/OPENAI_API_KEY=(.*)/);
        if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
    }

    if (!apiKey) {
        console.log("No OPENAI_API_KEY found.");
        return;
    }

    console.log("Found OpenAI Key. Testing DALL-E 3...");
    const openai = new OpenAI({ apiKey });

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "A futuristic green and black startup office",
            n: 1,
            size: "1024x1024",
        });

        console.log("Success! Image URL:", response.data[0].url);
    } catch (error) {
        console.error("OpenAI Error:", error.message);
    }
}

testOpenAI();

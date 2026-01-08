const fs = require('fs');
const path = require('path');

async function listModels() {
    const envPath = path.resolve(__dirname, '../.env.local');
    let apiKey = process.env.GEMINI_API_KEY;

    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
    }

    if (!apiKey) {
        fs.writeFileSync('models_list.json', JSON.stringify({ error: "No API Key" }));
        return;
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        fs.writeFileSync('models_list.json', JSON.stringify(data, null, 2));
        console.log("Wrote models to models_list.json");
    } catch (error) {
        fs.writeFileSync('models_list.json', JSON.stringify({ error: error.toString() }));
    }
}

listModels();

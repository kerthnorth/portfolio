// proxy-server.js
// Run with: node proxy-server.js
// Setup:    npm install express cors

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

const GEMINI_API_KEY = "AIzaSyC95hwLhux0AWYGHlEUJPLDFBWvdb-xg1s";

app.use(cors());
app.use(express.raw({ type: '*/*', limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

app.post('/api/chat', async (req, res) => {
    try {
        const body = JSON.parse(req.body.toString('utf8'));

        // Convert Anthropic message format to Gemini format
        const contents = body.messages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const geminiBody = {
            system_instruction: {
                parts: [{ text: body.system }]
            },
            contents: contents,
            generationConfig: {
                maxOutputTokens: body.max_tokens || 400,
                temperature: 0.7
            }
        };

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geminiBody)
        });

        const data = await response.json();
        console.log('Gemini status:', response.status);

        if (!response.ok) {
            console.error('Gemini error:', JSON.stringify(data));
            return res.status(500).json({ error: 'Gemini API error', detail: data });
        }

        // Convert Gemini response to Anthropic-style format the frontend expects
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
        res.json({
            content: [{ type: 'text', text }]
        });

    } catch (err) {
        console.error('Proxy error:', err.message);
        res.status(500).json({ error: 'Proxy request failed', detail: err.message });
    }
});

app.listen(PORT, () => {
    console.log('\n✅ Portfolio running at: http://localhost:' + PORT + '\n');
});
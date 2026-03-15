// api/chat.js — Vercel serverless function (replaces proxy-server.js)
// Set GEMINI_API_KEY in Vercel Dashboard → Settings → Environment Variables

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

  try {
    const body = req.body;

    const contents = body.messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const geminiBody = {
      system_instruction: { parts: [{ text: body.system }] },
      contents,
      generationConfig: {
        maxOutputTokens: body.max_tokens || 800,
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

    if (!response.ok) {
      return res.status(500).json({ error: 'Gemini API error', detail: data });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      || "Sorry, I couldn't generate a response.";

    res.status(200).json({ content: [{ type: 'text', text }] });

  } catch (err) {
    console.error('Handler error:', err.message);
    res.status(500).json({ error: 'Request failed', detail: err.message });
  }
}
export default async function handler(req, res) {
  // Pastikan metode request adalah POST
  if (req.method !== 'POST') {
    return res.status(405).json({ text: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ parts: [{ text: message }] }] 
      })
    });

    const data = await response.json();
    
    // Mengambil jawaban dari AI
    const reply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ text: reply });
    
  } catch (error) {
    res.status(500).json({ text: "Maaf, server AI sedang sibuk." });
  }
}

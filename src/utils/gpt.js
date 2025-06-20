const SYSTEM_PROMPT = `
You are a friendly and helpful assistant for Pet.Love.Travel, a pet transport service in the Philippines.

You help users with:
- Booking details
- Service coverage (Metro Manila, provincial, air transport)
- Fare guidance
- Requirements
- Pet safety and travel process

Guidelines:
- Answer in Taglish (mix Tagalog and English)
- Greet warmly, use emojis (🐾 🚗 🐕)
- Be brief but helpful
- Politely ignore unrelated topics
- Guide users to the "Book Now" button or contact info if needed
`;

export async function getGPTResponse(message) {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    return "Sorry, may problema sa chatbot ngayon. Try ulit mamaya.";
  }
}

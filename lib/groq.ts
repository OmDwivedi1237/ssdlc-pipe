import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.PUBLIC_GROQ_API_KEY
});

export const sendToGroq = async (eventData: string) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
        "model": "llama3-70b-8192",  // Choose a suitable Groq model
        messages: [
            {
              role: "system",
              content: "You are a cybersecurity risk analysis AI. Analyze the provided screen data for potential security threats."
            },
            {
              role: "user",
              content: `Analyze this screen content for security risks. Provide the results in a short format, with file name, folder, line number, and a concise reason for each issue:\n\n${eventData}`
            }
          ],
          temperature: 0.6,
          max_tokens: 4096,
          top_p: 0.95,
        });
    
        const result = chatCompletion.choices[0]?.message?.content || "No analysis generated.";
        return result.trim();
      } catch (error) {
        console.error("Groq API Error:", error);
        return "Error analyzing risk.";
      }
};

import { sendToGroq } from "@/lib/groq";  // Make sure you have the right Groq integration

export async function POST(req: Request) {
  const { eventData } = await req.json();
  
  // Validate eventData to ensure it's not empty
  if (!eventData || eventData.length === 0) {
    return new Response(
      JSON.stringify({ error: "The provided screen data is empty." }),
      { status: 400 }
    );
  }

  try {
    const analysis = await sendToGroq(eventData);

    // Check if analysis exists and is returned correctly
    if (!analysis || analysis.length === 0) {
      return new Response(
        JSON.stringify({ error: "No analysis results returned." }),
        { status: 500 }
      );
    }

    // Return the analysis to the frontend
    return new Response(JSON.stringify({ analysis }), { status: 200 });
  } catch (error) {
    console.error("Error during risk analysis:", error);
    return new Response(
      JSON.stringify({ error: "Failed to analyze the data." }),
      { status: 500 }
    );
  }
}

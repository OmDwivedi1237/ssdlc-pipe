import { captureScreenData } from "@/lib/screenpipe";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const withOcr = url.searchParams.get("withOcr") === "true";

  try {
    // Capture screen data for a fixed time (e.g., 1 minute)
    const eventData = await captureScreenData(withOcr ? 60 : 0);  // 60 seconds capture time if OCR is enabled

    if (!eventData) {
      return new Response(JSON.stringify({ error: "No screen data captured" }), { status: 500 });
    }

    // Send captured data back to the client
    return new Response(JSON.stringify({ eventData }), { status: 200 });
  } catch (error) {
    console.error("Error capturing screen data:", error);
    return new Response(JSON.stringify({ error: "Failed to capture screen data" }), { status: 500 });
  }
}
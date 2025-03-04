import { pipe, VisionEvent } from "@screenpipe/browser";

// Capture the screen data and OCR text
export const captureScreenData = async (duration: number = 60): Promise<string> => {
  const events: string[] = []; // Store the OCR text captured
  const startTime = Date.now();

  try {
    // Stream the vision data (set to true for OCR enabled)
    for await (const event of pipe.streamVision(true)) {
      // Stop if the duration is exceeded
      if (Date.now() - startTime > duration * 1000) {
        break;
      }

      // Check if event data exists and contains text
      if (event.data && event.data.text) {
        events.push(event.data.text);  // Push the captured OCR text to the array
      } else {
        console.warn('Received event without OCR text:', event);
      }
    }

    // Join all captured text into a single string and return
    return events.join("\n");

  } catch (error) {
    console.error("Failed to capture screen data:", error);
    throw new Error("Screen capture failed");  // Throw a meaningful error
  }
};

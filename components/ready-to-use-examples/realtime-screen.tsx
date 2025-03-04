"use client"

import { useState } from "react";
import axios from "axios";
import { captureScreenData } from "@/lib/screenpipe";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";  // This allows GitHub-flavored markdown (tables, task lists, etc.)

export const RealtimeScreen = () => {
  const [capturing, setCapturing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const startCapture = async () => {
    setCapturing(true);
    setIsLoading(true);
    try {
      // Capture screen data for 60 seconds
      const capturedData = await captureScreenData(60);  // Adjust if necessary

      // Check if capturedData is empty
      if (!capturedData || capturedData.length === 0) {
        console.error("Captured data is empty");
        setIsLoading(false);
        return;
      }

      // Send the captured data for analysis
      const res = await axios.post("/api/risk-analysis", { eventData: capturedData });

      // Ensure the response contains the correct analysis data
      if (res.data && res.data.analysis) {
        setAnalysisResult(res.data.analysis);
      } else {
        console.error("Error: Analysis result is missing in response.");
      }
    } catch (error) {
      console.error("Error capturing or analyzing data:", error);
      setIsLoading(false);
    }
    setCapturing(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={startCapture}
        disabled={capturing}
        className="p-4 bg-black text-white rounded-full transition duration-300 hover:bg-white hover:text-black w-full sm:w-auto mb-4"
      >
        {capturing ? "Capturing..." : "Start Screenpipe"}
      </button>

      {isLoading && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
          <p className="text-lg text-gray-400 text-center">Analyzing your data...</p>
        </div>
      )}

      {analysisResult && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="font-semibold text-xl text-indigo-200 mb-4">Risk Analysis Report</h2>
          <div className="markdown-content text-sm text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {analysisResult}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

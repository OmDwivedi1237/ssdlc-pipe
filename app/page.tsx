"use client"

import { useState } from "react";
import axios from "axios";
import { RealtimeScreen } from "@/components/ready-to-use-examples/realtime-screen";

// UI Component to handle the risk analysis report
const RiskAnalysisResult = ({ analysis }: { analysis: any }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 text-white">
      <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Risk Analysis Report</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-lg font-medium">
            <span className="font-semibold text-gray-300">File: </span> {analysis.fileName}
          </p>
          <p className="text-lg font-medium">
            <span className="font-semibold text-gray-300">Timestamp: </span> {analysis.timestamp}
          </p>
        </div>
        <div>
          <p className="text-lg font-medium">
            <span className="font-semibold text-gray-300">Risk Level: </span> {analysis.riskLevel}
          </p>
          <p className="text-lg font-medium text-red-400">
            <span className="font-semibold text-gray-300">Risk: </span> {analysis.riskDescription}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-lg">
          <span className="font-semibold text-gray-300">Reasoning: </span> {analysis.reasoning}
        </p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/screenpipe");  // Trigger screen capture and analysis
      setAnalysis(res.data);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center text-indigo-200 mb-8">Risk Monitoring Dashboard</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 text-white">
          <RealtimeScreen />  {/* Starts screenpipe */}
          
          <button 
            onClick={handleGenerateReport} 
            className="bg-black text-white p-3 rounded-full mt-6 w-full sm:w-auto transition duration-300 hover:bg-white hover:text-black"
          >
            {loading ? "Generating Report..." : "Generate Risk Report"}
          </button>
        </div>

        {loading && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <p className="text-lg text-center text-gray-400">Generating your report, please wait...</p>
          </div>
        )}

        {analysis && !loading && <RiskAnalysisResult analysis={analysis} />}
      </div>
    </div>
  );
}

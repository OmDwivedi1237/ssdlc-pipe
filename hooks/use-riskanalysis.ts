"use client"

import { useState, useEffect } from "react";
import axios from "axios";

export const useRiskAnalysis = (eventData: string) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!eventData) return;

    const analyze = async () => {
      setLoading(true);
      try {
        const res = await axios.post("/api/risk-analysis", { eventData });
        setAnalysis(res.data.analysis);
      } catch (error) {
        console.error("Error fetching risk analysis:", error);
      }
      setLoading(false);
    };

    analyze();
  }, [eventData]);

  return { analysis, loading };
};

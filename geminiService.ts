
import { GoogleGenAI, Type } from "@google/genai";
import { SignalResponse, MarketSignal } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getMarketAnalysis = async (ticker: string, context: string): Promise<SignalResponse> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the current market situation for ${ticker}. Current context: ${context}. Provide a precise trading signal.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          signal: {
            type: Type.STRING,
            description: "Trading signal: BUY, SELL, HOLD, or NEUTRAL",
          },
          confidence: {
            type: Type.NUMBER,
            description: "Confidence percentage (0-100)",
          },
          reasoning: {
            type: Type.STRING,
            description: "Concise reasoning for the signal",
          },
          targetPrice: {
            type: Type.STRING,
            description: "Short term target price string (e.g. '$65,000')",
          },
          riskLevel: {
            type: Type.STRING,
            description: "Risk assessment: LOW, MEDIUM, or HIGH",
          }
        },
        required: ["signal", "confidence", "reasoning", "targetPrice", "riskLevel"],
      },
    },
  });

  try {
    const data = JSON.parse(response.text || "{}");
    return {
      ...data,
      timestamp: Date.now(),
    } as SignalResponse;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return {
      signal: MarketSignal.NEUTRAL,
      confidence: 0,
      reasoning: "Analysis temporarily unavailable due to parsing error.",
      targetPrice: "N/A",
      riskLevel: "MEDIUM",
      timestamp: Date.now(),
    };
  }
};

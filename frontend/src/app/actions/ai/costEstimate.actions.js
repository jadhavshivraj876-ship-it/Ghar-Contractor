"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateCostEstimate(plotSize, floors, type) {
  try {
    const prompt = `
You are a construction cost estimation expert in India.

Plot Size: ${plotSize} sq ft
Floors: ${floors}
Construction Type: ${type}

Rates:
Basic: 1200–1500
Standard: 1800–2200
Premium: 2800–3500

Rules:
- built-up area = plotSize × floors
- Return ONLY JSON:
{
  "minCost": number,
  "maxCost": number
}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = result.text;

    console.log("Gemini raw:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      estimatedCostMin: parsed.minCost,
      estimatedCostMax: parsed.maxCost,
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to calculate estimate");
  }
}

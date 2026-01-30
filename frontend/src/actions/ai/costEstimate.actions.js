"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCostEstimate(plotSize, floors, constructionType) {
  if (!plotSize || !floors || !constructionType) {
    throw new Error("Missing required parameters");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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

  const prompt = `
You are a construction cost estimator for India.

Plot size: ${plotSize} sq ft
Number of floors: ${floors}
Construction type: ${constructionType}

Respond ONLY in valid JSON:
{
  "estimatedCostMin": number,
  "estimatedCostMax": number,
  "costPerSqFt": number,
  "breakdown": string
}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const estimate = JSON.parse(text);

    return {
      estimatedCostMin: estimate.estimatedCostMin,
      estimatedCostMax: estimate.estimatedCostMax,
      costPerSqFt: estimate.costPerSqFt,
      breakdown: estimate.breakdown,
      disclaimer: "AI-generated estimate. Final cost may vary."
    };

  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("Failed to generate cost estimate");
  }
}
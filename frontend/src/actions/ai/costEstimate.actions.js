"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCostEstimate(plotSize, floors, constructionType) {
  if (!plotSize || !floors || !constructionType) {
    throw new Error("Missing required parameters");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
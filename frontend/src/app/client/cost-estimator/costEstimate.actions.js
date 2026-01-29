"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCostEstimate(plotSize, floors, constructionType) {

    console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

  if (!plotSize || !floors || !constructionType) {
    throw new Error("Missing required parameters");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const prompt = `
You are a construction cost estimator for India.

Plot size: ${plotSize} sq ft
Number of floors: ${floors}
Construction type: ${constructionType}

Return ONLY valid JSON like this:
{
  "estimatedCostMin": 1000000,
  "estimatedCostMax": 1500000,
  "costPerSqFt": 1800,
  "breakdown": "Material, labour, finishing"
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // ✅ SAFE JSON extraction
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI did not return valid JSON");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("Failed to generate cost estimate");
  }
}
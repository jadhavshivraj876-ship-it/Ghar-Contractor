"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateCostEstimate(plotSize, floors, type) {
  try {
    const prompt = `
You are an experienced construction cost estimation expert in India.

Project Details:
- Plot Size: ${plotSize} sq ft
- Number of Floors: ${floors}
- Construction Type: ${type}

Instructions:
- Calculate total built-up area as: plot size × number of floors
- Use realistic and current Indian market construction rates
- Higher construction types should have higher per sq ft costs
- Consider that multi-floor buildings increase structural and foundation cost
- Provide a reasonable cost range (minimum and maximum)

Return ONLY valid JSON in this exact format:
{
  "minCost": number,
  "maxCost": number
}
Do not include explanations or text outside the JSON.
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

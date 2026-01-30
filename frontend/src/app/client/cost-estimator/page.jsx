"use client";

import { generateCostEstimate } from "@/actions/ai/costEstimate.actions";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ConstructionCostEstimator() {
  const [plotSize, setPlotSize] = useState("");
  const [floors, setFloors] = useState("");
  const [type, setType] = useState("standard");
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateEstimate = async () => {
    if (!plotSize || !floors || Number(floors) < 1) {
      setEstimate("Please enter valid plot size and number of floors.");
      return;
    }

    setLoading(true);
    setEstimate(null);

    try {
      const result = await generateCostEstimate(
        Number(plotSize),
        Number(floors),
        type
      );

      setEstimate(
        `₹${result.estimatedCostMin.toLocaleString()} - ₹${result.estimatedCostMax.toLocaleString()}`
      );
    } catch (error) {
      console.error(error);
      setEstimate("Unable to calculate estimate right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Construction Cost Estimator 🧮
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Get an instant rough estimate for your construction project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Enter Details 📋
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Plot Size */}
              <div>
                <label className="text-sm text-gray-600">
                  Plot Size (sq ft)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              {/* Floors INPUT (Updated) */}
              <div>
                <label className="text-sm text-gray-600">
                  Number of Floors
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 2"
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>

              {/* Construction Type */}
              <div>
                <label className="text-sm text-gray-600">
                  Construction Type
                </label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">
                      Basic 
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard 
                    </SelectItem>
                    <SelectItem value="premium">
                      Premium 
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Button */}
              <Button
                size="lg"
                onClick={calculateEstimate}
                className="w-full bg-orange-600 text-white"
                disabled={loading}
              >
                {loading ? "Calculating..." : "Calculate Estimate"}
              </Button>
            </CardContent>
          </Card>

          {/* Result Card */}
          <Card className="flex items-center justify-center">
            <CardContent className="text-center py-20">
              {estimate ? (
                <>
                  <h3 className="text-2xl font-bold">Your Estimate ✅</h3>
                  <p className="text-4xl font-bold text-orange-600 mt-4">
                    {estimate}
                  </p>
                  <p className="text-sm text-gray-600 mt-3">
                    This is a rough estimate. Final cost depends on site visit and material selection
                  </p>
                </>
              ) : (
                <p className="text-gray-600">
                  {loading
                    ? "AI is calculating your estimate..."
                    : "Enter your details and click calculate to see estimate."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

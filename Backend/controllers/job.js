// controllers/job.js
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { generateJobPrompt } from "../services/jobPrompt.js";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

export async function fetchJobListings(req, res) {
  const { stack, level, location } = req.body;

  if (!stack || !level || !location) {
    return res.status(400).json({ error: "❌ All fields (stack, level, location) are required." });
  }

  const prompt = generateJobPrompt(stack, level, location);

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: GEMINI_API_KEY },
      }
    );

    let rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(500).json({ error: "❌ Gemini returned an empty response." });
    }

    rawText = rawText.trim();

    // Remove markdown if any
    if (rawText.startsWith("```")) {
      rawText = rawText.replace(/```json|```/g, "").trim();
    }

    let jobs;
    try {
      jobs = JSON.parse(rawText);
    } catch (err) {
      return res.status(500).json({
        error: "❌ Failed to parse Gemini response. Invalid JSON format.",
        raw: rawText,
      });
    }

    // ✅ Save to file (optional)
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const filePath = path.join(dataDir, "jobListings.json");
    fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));

    res.status(200).json({ message: "✅ Jobs fetched successfully", data: jobs });
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "❌ Failed to fetch job listings" });
  }
}

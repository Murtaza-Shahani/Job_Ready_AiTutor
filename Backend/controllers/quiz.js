import fs from "fs";
import path from "path";
import axios from "axios";
import { generateQuizPrompt } from "../services/quizPrompt.js";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

export async function generateQuiz(req, res) {
  const { subject, level } = req.body;

  if (!subject || !level) {
    return res.status(400).json({ error: "❌ Subject and level are required." });
  }

  const prompt = generateQuizPrompt(subject, level);

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
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: GEMINI_API_KEY,
        },
      }
    );

    let rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Gemini Response Text:\n", rawText);

    // ✅ Clean markdown or extra formatting if present
    if (!rawText) {
      return res.status(500).json({ error: "❌ Gemini returned an empty response." });
    }

    rawText = rawText.trim();

    // Remove any markdown block (```json or ```)
    if (rawText.startsWith("```")) {
      rawText = rawText.replace(/```json|```/g, "").trim();
    }

    let quizData;
    try {
      quizData = JSON.parse(rawText);
    } catch (error) {
      console.error("❌ JSON Parse Error:", error.message);
      return res.status(500).json({
        error: "❌ Failed to parse Gemini response. Invalid JSON format.",
        raw: rawText, // Optional: send raw data for debugging
      });
    }

    // ✅ Ensure data directory exists
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    const quizPath = path.join(dataDir, "quizData.json");
    fs.writeFileSync(quizPath, JSON.stringify(quizData, null, 2));

    res.status(200).json({ message: "✅ Quiz generated successfully", data: quizData });
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "❌ Failed to generate quiz" });
  }
}

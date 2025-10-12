import axios from "axios";
import dotenv from "dotenv";
import { generateCoverLetterPrompt } from "../services/coverLetterPrompt.js";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

export async function generateCoverLetter(req, res) {
  const { name, jobTitle, companyName, skills } = req.body;

  if (!name || !jobTitle || !companyName || !skills) {
    return res.status(400).json({ error: "❌ Please provide all required fields." });
  }

  const prompt = generateCoverLetterPrompt(name, jobTitle, companyName, skills);

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

    let coverLetter = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!coverLetter) {
      return res.status(500).json({ error: "❌ Gemini returned an empty response." });
    }

    // Clean markdown formatting if any
    if (coverLetter.startsWith("```")) {
      coverLetter = coverLetter.replace(/```[a-z]*|```/g, "").trim();
    }

    res.status(200).json({ coverLetter });
  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "❌ Failed to generate cover letter." });
  }
}

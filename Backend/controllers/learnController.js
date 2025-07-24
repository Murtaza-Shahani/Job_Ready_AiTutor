import axios from 'axios';
import buildPrompt from '../services/promptBuilder.js';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log('GEMINI_API_KEY:', GEMINI_API_KEY);

export const generateLearningContent = async (req, res) => {
  const { subject, level } = req.body;

  if (!subject || !level) {
    return res.status(400).json({ error: 'Subject and level are required.' });
  }

  const prompt = buildPrompt(subject, level);

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    );

    const generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ content: generatedContent });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch content from Gemini API' });
  }
};

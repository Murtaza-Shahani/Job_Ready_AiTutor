export function generateQuizPrompt(subject, level) {
  return `
You are a strict JSON-only quiz generator.

Generate  10-15 multiple-choice questions for the subject: "${subject}" at the "${level}" level.

Required format (strict JSON array, no markdown, no explanation, no extra text):
[
  {
    "question": "Sample question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answerIndex": 2
  }
]

Instructions:
- Do NOT include any text or explanation before or after the JSON array.
- Use clear and diverse questions relevant to the subject.
- Ensure "answerIndex" correctly matches the index of the correct option in "options" array.
- Only output a valid JSON array. Nothing else.
`;
}

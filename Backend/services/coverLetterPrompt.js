export function generateCoverLetterPrompt(name, jobTitle, companyName, skills) {
  return `
You are a professional HR assistant. Write a concise and impactful cover letter using the following information:

Applicant Name: ${name}
Target Job Title: ${jobTitle}
Company: ${companyName}
Key Skills or Achievements: ${skills}

Guidelines:
- Write in a formal but friendly tone.
- Keep it around 150–200 words.
- Make it specific to the company and role.
- Avoid generic filler text.
- Return only the cover letter content (no explanations or markdown).

Example Format:
Dear [Hiring Manager / Company Name],

[Body of the cover letter, including brief intro, skills, and interest in the company.]

Sincerely,
${name}
`;
}

// services/jobPrompt.js

export function generateJobPrompt(stack, level, location) {
  return `
You are a job finder assistant. Based on the following inputs, return the **latest 8 to 10 job postings** in a structured JSON array format.

Inputs:
- Tech Stack: ${stack}  
- Experience Level: ${level}  
- Location: ${location}  

Output Format:
[
  {
    "title": "Job Title",
    "company": "Company Name",
    "location": "Location (e.g., Remote or City/Country)",
    "description": "Short description of the job role (max 25 words)",
    "email": "Contact Email of recruiter or HR (if available)"
  }
]

Only return valid and recent job listings related to the given stack and location. Do not include explanations or extra text — just the pure JSON array output.
`;
}

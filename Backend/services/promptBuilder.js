const buildPrompt = (subject, level) => {
  return `You are an expert tutor. Explain the topic "${subject}" for a ${level} learner. Break it down into:
1. A short introduction
2. Key concepts
3. Examples
4. Tips or best practices.

Keep it concise, engaging, and useful.`;
};
export default buildPrompt;



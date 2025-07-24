import buildPrompt from '../services/promptBuilder.js';

export const generateLearningContent = (req, res) => {
  const { subject, level } = req.body;

  if (!subject || !level) {
    return res.status(400).json({ error: 'Subject and level are required.' });
  }

  const prompt = buildPrompt(subject, level);

  // Mock response instead of calling OpenAI
  const mockResponse = {
    content: `📘 Topic: ${subject}\n🎯 Level: ${level}\n\n${prompt}\n\n📝 Key points:\n- Introduction\n- Core Concepts\n- Real-world Example\n- Best Practices`
  };

  res.json(mockResponse);
};

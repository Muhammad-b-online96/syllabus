import { Ollama } from 'ollama-node';

export const ollama = new Ollama({
  host: process.env.OLLAMA_API_URL || 'http://localhost:11434'
});

export const generateLessonPlan = async (
  prompt: string,
  options = { temperature: 0.7, maxTokens: 2048 }
) => {
  try {
    const response = await ollama.chat({
      model: 'deepseek-r1',
      messages: [{ role: 'user', content: prompt }],
      ...options
    });

    return response.message.content;
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    throw error;
  }
};
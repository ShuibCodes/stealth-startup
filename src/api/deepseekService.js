import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.REACT_APP_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true // WARNING: Only use for development
});

export const sendMessageToDeepseek = async (prompt) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages:   [
        {
          role: "system",
          content: "You are a helpful programming teacher, providing clear and concise hints without giving away complete solutions."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Deepseek API:', error);
    throw error;
  }
}; 
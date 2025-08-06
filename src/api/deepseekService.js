import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.REACT_APP_DEEPSEEK_API_KEY || '',  // Provide fallback empty string
  dangerouslyAllowBrowser: true  // Required for browser usage
});

export const sendMessageToDeepseek = async (prompt) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a helpful programming teacher, providing clear and concise hints without giving away complete solutions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Deepseek API:', error);
    if (error.message.includes('402') || error.message.includes('Insufficient Balance')) {
      return "Sorry, the AI service is currently unavailable due to insufficient credits. Please try again later or contact support.";
    }
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
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

    res.status(200).json({ content: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
} 
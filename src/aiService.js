// src/aiService.js
import axios from 'axios';

const OPENAI_API_KEY = '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';

export const getAIResponse = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'There was an error fetching the response from the AI service.';
  }
};

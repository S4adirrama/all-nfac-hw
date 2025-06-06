export async function fetchOpenAIChat(messages: { role: string; content: string }[]) {
  const apiKey = import.meta.env.OPENAI_API_KEY;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
    }),
  });
  if (!response.ok) throw new Error('OpenAI API error');
  console.log('OpenAI API response:', response);
  return response.json();
} 
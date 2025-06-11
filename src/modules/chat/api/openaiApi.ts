export async function fetchOpenAIChat(messages: { role: string; content: string }[]) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...messages,
        ],
      }),
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Failed to get response from OpenAI');
    }

    return await response.json();
  } catch (err) {
    console.error('OpenAI error:', err);
    throw new Error('Failed to get response from OpenAI');
  }
}
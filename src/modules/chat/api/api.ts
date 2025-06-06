export async function fetchMessages(username: string) {
  const res = await fetch(`http://localhost:3001/messages?username=${username}`);
  if (!res.ok) throw new Error('Ошибка загрузки сообщений');
  return res.json();
}

export async function sendMessage(username: string, message: { sender: string; content: string }) {
  const res = await fetch(`http://localhost:3001/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, ...message }),
  });
  if (!res.ok) throw new Error('Ошибка отправки сообщения');
  return res.json();
}






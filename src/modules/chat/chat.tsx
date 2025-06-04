// modules/chat/chat.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { User } from "../../shared/model/types";

interface ChatProps {
  users: User[];
}

interface Message {
  sender: "user" | "ai";
  content: string;
}

const Chat: React.FC<ChatProps> = ({ users }) => {
  const { username } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const currentUser = users.find((u) => u.username === username);

  const storageKey = `chat_${username}`;

  // Загрузка сообщений из localStorage
  useEffect(() => {
    if (!username) return;

    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, [username]);

  // Сохранение сообщений в localStorage
  useEffect(() => {
    if (username) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, username]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", content: input };
    const botMessage: Message = {
      sender: "ai",
      content: "Это заглушка AI: я отвечаю автоматически.",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">
          Чат с {currentUser?.name || username || "AI"}
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[10%] h-[5%] px-4 py-2 rounded-xl ${
              msg.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-gray-900"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Введите сообщение..."
            className="flex-1 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

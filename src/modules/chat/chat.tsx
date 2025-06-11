// modules/chat/chat.tsx
import React, { useState } from "react";
import { useParams } from "react-router";
import type { User, Message } from "../../shared/model/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMessages, sendMessage } from "./api/api";
import { useChatMutation } from "./api/useChatMutation";

interface ChatProps {
  users: User[];
}

const Chat: React.FC<ChatProps> = ({ users }) => {
  const { username } = useParams();
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();
  const currentUser = users.find((u) => u.username === username);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", username],
    queryFn: () => fetchMessages(username!),
    enabled: !!username,
  });

  const mutation = useMutation({
    mutationFn: (msg: Message) => sendMessage(username!, msg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", username] });
    },
  });

  const aiMutation = useChatMutation();

  const handleSend = async () => {
    if (!input.trim() || !username) return;
    const userMessage: Message = { sender: "user", content: input };
    mutation.mutate(userMessage);
    setInput("");

    if (currentUser?.type === "ai") {
      try {
        const aiRes = await aiMutation.mutateAsync([
          { role: "user", content: input },
        ]);
        const aiContent = aiRes.choices?.[0]?.message?.content || "[Нет ответа от AI]";
        mutation.mutate({ sender: "ai", content: aiContent });
      } catch (e) {
        mutation.mutate({ sender: "ai", content: "[Ошибка AI]" });
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800">
          Чат с {currentUser?.name || username || "AI"}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {isLoading ? (
          <div>Загрузка...</div>
        ) : (
          messages.map((msg: Message, index: number) => (
            <div
              key={index}
              className={`max-w-[20%] px-4 py-2 rounded-xl ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-900"
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
      </div>

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
            disabled={mutation.isPending || aiMutation.isPending}
          >
            {(mutation.isPending || aiMutation.isPending) ? "..." : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

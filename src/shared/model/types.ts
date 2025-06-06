export interface User {
  username: string;
  name: string;
  unread: number;
  type: "person" | "ai";
}

export interface Message {
  sender: "user" | "ai";
  content: string;
}

export interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}


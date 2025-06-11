import { Routes, Route } from "react-router";
import Sidebar from "../modules/sidebar/sidebar";
import Chat from "../modules/chat/chat";
import type { User } from "../shared/model/types";

const users: User[] = [
  { username: "john", name: "John Doe", unread: 2, type: "person" },
  { username: "jane", name: "Jane Smith", unread: 0, type: "person" },
  { username: "ai-helper", name: "AI Assistant", unread: 1, type: "ai" },
];

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar users={users} />
      <Routes>
        <Route path="/chat/:username" element={<Chat users={users} />} />
        <Route path="*" element={<Chat users={users} />} />
      </Routes>
    </div>
  );
};

export default App;

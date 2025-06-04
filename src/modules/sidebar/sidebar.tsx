import React, { useState } from "react";
import Search from "./search/search";
import UserList from "./user-list/user-list";
import type { User } from "../../shared/model/types";

interface SidebarProps {
  users: User[];
}

const Sidebar: React.FC<SidebarProps> = ({ users }) => {
  const [query, setQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="bg-white border-r border-gray-200 w-80 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Чаты</h2>
      </div>
      <Search query={query} setQuery={setQuery} />
      <UserList users={filteredUsers} />
    </aside>
  );
};

export default Sidebar;

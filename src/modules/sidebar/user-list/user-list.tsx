import React from "react";
import { NavLink } from "react-router-dom";
import type { User } from "../../shared/model/types";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const grouped = {
    Люди: users.filter((u) => u.type === "person"),
    "ИИ-ассистенты": users.filter((u) => u.type === "ai"),
  };

  return (
    <div className="overflow-y-auto flex-1 px-3 py-2 space-y-4">
      {Object.entries(grouped).map(([group, list]) => (
        <div key={group}>
          <h3 className="text-sm text-gray-500 font-semibold mb-1">{group}</h3>
          <div className="space-y-1">
            {list.map((user) => (
              <NavLink
                to={`/chat/${user.username}`}
                key={user.username}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                <span>{user.name}</span>
                {user.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {user.unread}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;

import React from "react";
import UserActions from "./UserActions";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Administrador" | "Monitor";
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onSort: (field: keyof User) => void;
  sortField: keyof User | null;
  sortDirection: "asc" | "desc";
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onEdit,
  onDelete,
  onSort,
  sortField,
  sortDirection,
}) => {
  
  const renderSortIcon = (field: keyof User) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden px-2 py-2">
      <table className="w-full border-collapse rounded-lg table-fixed">
        <thead>
          <tr className="bg-gray-300">
            <th
              className="p-3 text-left rounded-tl-lg cursor-pointer select-none w-1/4"
              onClick={() => onSort("name")}
            >
              <span className="inline-flex items-center">
                Nome
                {sortField === "name" && (
                  <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </span>
            </th>
            <th
              className="p-3 text-left cursor-pointer select-none w-2/5"
              onClick={() => onSort("email")}
            >
              <span className="inline-flex items-center">
                E-mail
                {sortField === "email" && (
                  <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </span>
            </th>
            <th
              className="p-3 text-left cursor-pointer select-none w-1/5"
              onClick={() => onSort("role")}
            >
              <span className="inline-flex items-center">
                Cargo
                {sortField === "role" && (
                  <span className="ml-1">{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </span>
            </th>
            <th className="p-3 text-center rounded-tr-lg w-1/5">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                Nenhum usuário encontrado.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-t hover:bg-gray-300 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                } ${index === users.length - 1 ? "rounded-bl-lg rounded-br-lg" : ""}`}
              >
                <td className="p-3 truncate">{user.name}</td>
                <td className="p-3 truncate">{user.email}</td>
                <td className="p-3 truncate">{user.role}</td>
                <td className="p-3 text-center">
                  <UserActions
                    onEdit={() => onEdit(user)}
                    onDelete={() => onDelete(user.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

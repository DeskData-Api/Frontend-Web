import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface UserActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex justify-center gap-4">
      <button onClick={onEdit} className="text-blue-600 hover:text-blue-800 transition cursor-pointer" title="Editar Usuário">
        <FaEdit />
      </button>
      <button onClick={onDelete} className="text-red-600 hover:text-red-800 transition cursor-pointer" title="Excluir Usuário">
        <FaTrash />
      </button>
    </div>
  );
};

export default UserActions;

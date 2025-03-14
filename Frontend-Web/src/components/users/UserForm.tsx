import React, { useState } from "react";

interface User {
  id: number; // Sempre um número
  name: string;
  email: string;
  role: "Admin" | "Viewer";
}

interface UserFormProps {
  user?: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<User>({
    id: user?.id ?? 0, // ID só será gerado ao salvar
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "Viewer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const finalUser = formData.id ? formData : { ...formData, id: Date.now() };
    onSave(finalUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">{user ? "Editar Usuário" : "Criar Usuário"}</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold">Tipo de Usuário</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="Admin">Admin</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button onClick={onClose} className="text-red-500">Cancelar</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {user ? "Salvar" : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

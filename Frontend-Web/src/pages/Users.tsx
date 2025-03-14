import React, { useState } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import UsersTable from "../components/users/UsersTable";
import UserForm from "../components/users/UserForm";
import ChatbotButton from "../components/ui/ChatbotButton";
import ChatbotModal from "../components/ui/ChatbotModal";
import { FaPlus } from "react-icons/fa";

// Definir o tipo User
interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Viewer";
}

// Mock inicial de usuários
const initialUsers: User[] = [
    { id: 1, name: "João Silva", email: "joao@email.com", role: "Admin" },
    { id: 2, name: "Maria Oliveira", email: "maria@email.com", role: "Viewer" },
    { id: 3, name: "Carlos Souza", email: "carlos@email.com", role: "Admin" },
];

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isChatOpen, setChatOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Novo estado para a pesquisa

    // Abrir formulário para criar ou editar usuário
    const handleOpenForm = (user: User | null = null) => {
        setEditingUser(user);
        setIsFormOpen(true);
    };

    // Fechar formulário
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingUser(null);
    };

    // Filtrar usuários com base no input da busca (busca por nome, e-mail ou tipo)
    const filteredUsers = users.filter((user) =>
        Object.values(user).some(value =>
            typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Criar ou editar usuário no mock
    const handleSaveUser = (user: User) => {
        if (editingUser) {
            // Editar usuário existente
            setUsers(users.map((u) => (u.id === editingUser.id ? user : u)));
        } else {
            // Criar novo usuário
            const newUser = { ...user, id: Date.now() }; // Garante um ID único
            setUsers([...users, newUser]);
        }
        handleCloseForm();
    };

    // Excluir usuário
    const handleDeleteUser = (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
        if (confirmDelete) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Buscar usuário..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border p-2 rounded w-64"
                        />
                        <button
                            onClick={() => handleOpenForm()}
                            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
                        >
                            <FaPlus /> Criar Usuário
                        </button>
                    </div>
                </div>

                {/* Passar usuários filtrados para a tabela */}
                <UsersTable users={filteredUsers} onEdit={handleOpenForm} onDelete={handleDeleteUser} />

                {isFormOpen && <UserForm user={editingUser} onClose={handleCloseForm} onSave={handleSaveUser} />}
            </div>

            <Footer />

            {/* Botão do Chatbot */}
            <ChatbotButton onClick={() => setChatOpen(true)} />

            {/* Modal do Chatbot */}
            <ChatbotModal isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
        </div>
    );
};

export default Users;
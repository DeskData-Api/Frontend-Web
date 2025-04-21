import React, { useEffect, useState } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import UsersTable from "../components/users/UsersTable";
import UserForm from "../components/users/UserForm";
import ChatbotButton from "../components/ui/ChatbotButton";
import ChatbotModal from "../components/ui/ChatbotModal";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';

// Definir o tipo User

interface User {
    id: number;
    name: string;
    email: string;
    role: "Administrador" | "Monitor";
  }
  
  interface UsersTableProps {
    users: User[];
    onEdit: (user?: User | null) => void;
    onDelete: (id: number) => void;
    onSort: (field: keyof User) => void;
    sortField: keyof User | null;
    sortDirection: "asc" | "desc";
  }
  


// Mock inicial de usuários
const initialUsers: User[] = [
    { id: 1, name: "João Silva", email: "joao@email.com", role: "Administrador" },
    { id: 2, name: "Maria Oliveira", email: "maria@email.com", role: "Monitor" },
    { id: 3, name: "Carlos Souza", email: "carlos@email.com", role: "Administrador" },
    { id: 4, name: "Ana Pereira", email: "ana.pereira@email.com", role: "Monitor" },
    { id: 5, name: "Lucas Mendes", email: "lucas.mendes@email.com", role: "Administrador" },
    { id: 6, name: "Fernanda Costa", email: "fernanda.costa@email.com", role: "Monitor" },
    { id: 7, name: "Rafael Almeida", email: "rafael.almeida@email.com", role: "Administrador" },
    { id: 8, name: "Juliana Lima", email: "juliana.lima@email.com", role: "Monitor" },
    { id: 9, name: "Pedro Santos", email: "pedro.santos@email.com", role: "Administrador" },
    { id: 10, name: "Beatriz Rocha", email: "beatriz.rocha@email.com", role: "Monitor" },
    { id: 11, name: "Gabriel Ferreira", email: "gabriel.ferreira@email.com", role: "Administrador" },
    { id: 12, name: "Laura Carvalho", email: "laura.carvalho@email.com", role: "Monitor" },
    { id: 13, name: "Mateus Oliveira", email: "mateus.oliveira@email.com", role: "Administrador" },
    { id: 14, name: "Sofia Mendes", email: "sofia.mendes@email.com", role: "Monitor" },
    { id: 15, name: "Thiago Silva", email: "thiago.silva@email.com", role: "Administrador" },
    { id: 16, name: "Camila Santos", email: "camila.santos@email.com", role: "Monitor" },
    { id: 17, name: "Vinicius Costa", email: "vinicius.costa@email.com", role: "Administrador" },
    { id: 18, name: "Isabela Almeida", email: "isabela.almeida@email.com", role: "Monitor" },
    { id: 19, name: "Daniel Pereira", email: "daniel.pereira@email.com", role: "Administrador" },
    { id: 20, name: "Larissa Ferreira", email: "larissa.ferreira@email.com", role: "Monitor" },
    { id: 21, name: "Mariana Costa", email: "mariana.costa@email.com", role: "Administrador" },
    { id: 22, name: "Felipe Lima", email: "felipe.lima@email.com", role: "Monitor" },
    { id: 23, name: "Amanda Ribeiro", email: "amanda.ribeiro@email.com", role: "Administrador" },
    { id: 24, name: "Bruno Almeida", email: "bruno.almeida@email.com", role: "Monitor" },
    { id: 25, name: "Clara Fernandes", email: "clara.fernandes@email.com", role: "Administrador" },
    { id: 26, name: "Diego Souza", email: "diego.souza@email.com", role: "Monitor" },
    { id: 27, name: "Elisa Martins", email: "elisa.martins@email.com", role: "Administrador" },
    { id: 28, name: "Fábio Mendes", email: "fabio.mendes@email.com", role: "Monitor" },
    { id: 29, name: "Giovanna Silva", email: "giovanna.silva@email.com", role: "Administrador" },
    { id: 30, name: "Henrique Costa", email: "henrique.costa@email.com", role: "Monitor" },
    { id: 31, name: "Ingrid Oliveira", email: "ingrid.oliveira@email.com", role: "Administrador" },
    { id: 32, name: "João Pedro Santos", email: "joao.pedro@email.com", role: "Monitor" },
    { id: 33, name: "Kelly Almeida", email: "kelly.almeida@email.com", role: "Administrador" },
    { id: 34, name: "Leonardo Ferreira", email: "leonardo.ferreira@email.com", role: "Monitor" },
    { id: 35, name: "Manuela Costa", email: "manuela.costa@email.com", role: "Administrador" },
    { id: 36, name: "Nicolas Lima", email: "nicolas.lima@email.com", role: "Monitor" },
    { id: 37, name: "Olivia Mendes", email: "olivia.mendes@email.com", role: "Administrador" },
    { id: 38, name: "Paulo Ribeiro", email: "paulo.ribeiro@email.com", role: "Monitor" },
    { id: 39, name: "Quiteria Silva", email: "quiteria.silva@email.com", role: "Administrador" },
    { id: 40, name: "Ricardo Almeida", email: "ricardo.almeida@email.com", role: "Monitor" },
    { id: 41, name: "Sabrina Costa", email: "sabrina.costa@email.com", role: "Administrador" },
    { id: 42, name: "Tiago Fernandes", email: "tiago.fernandes@email.com", role: "Monitor" },
    { id: 43, name: "Ursula Martins", email: "ursula.martins@email.com", role: "Administrador" },
    { id: 44, name: "Victor Souza", email: "victor.souza@email.com", role: "Monitor" },
    { id: 45, name: "Wanda Lima", email: "wanda.lima@email.com", role: "Administrador" },
    { id: 46, name: "Xavier Costa", email: "xavier.costa@email.com", role: "Monitor" },
    { id: 47, name: "Yasmin Almeida", email: "yasmin.almeida@email.com", role: "Administrador" },
    { id: 48, name: "Zeca Ribeiro", email: "zeca.ribeiro@email.com", role: "Monitor" },
    { id: 49, name: "Alice Mendes", email: "alice.mendes@email.com", role: "Administrador" },
    { id: 50, name: "Bernardo Silva", email: "bernardo.silva@email.com", role: "Monitor" },
    { id: 51, name: "Cecilia Costa", email: "cecilia.costa@email.com", role: "Administrador" },
    { id: 52, name: "Davi Ferreira", email: "davi.ferreira@email.com", role: "Monitor" },
    { id: 53, name: "Eduarda Lima", email: "eduarda.lima@email.com", role: "Administrador" },
    { id: 54, name: "Fabiana Almeida", email: "fabiana.almeida@email.com", role: "Monitor" },
    { id: 55, name: "Guilherme Santos", email: "guilherme.santos@email.com", role: "Administrador" },
    { id: 56, name: "Helena Ribeiro", email: "helena.ribeiro@email.com", role: "Monitor" },
    { id: 57, name: "Igor Costa", email: "igor.costa@email.com", role: "Administrador" },
    { id: 58, name: "Júlia Mendes", email: "julia.mendes@email.com", role: "Monitor" },
    { id: 59, name: "Kaio Ferreira", email: "kaio.ferreira@email.com", role: "Administrador" },
    { id: 60, name: "Lívia Almeida", email: "livia.almeida@email.com", role: "Monitor" },
    { id: 61, name: "Marcos Silva", email: "marcos.silva@email.com", role: "Administrador" },
    { id: 62, name: "Natália Costa", email: "natalia.costa@email.com", role: "Monitor" },
    { id: 63, name: "Otávio Lima", email: "otavio.lima@email.com", role: "Administrador" },
    { id: 64, name: "Patrícia Ribeiro", email: "patricia.ribeiro@email.com", role: "Monitor" },
    { id: 65, name: "Quintino Mendes", email: "quintino.mendes@email.com", role: "Administrador" },
    { id: 66, name: "Rafaela Almeida", email: "rafaela.almeida@email.com", role: "Monitor" },
    { id: 67, name: "Samuel Costa", email: "samuel.costa@email.com", role: "Administrador" },
    { id: 68, name: "Tatiana Ferreira", email: "tatiana.ferreira@email.com", role: "Monitor" },
    { id: 69, name: "Ulisses Santos", email: "ulisses.santos@email.com", role: "Administrador" },
    { id: 70, name: "Valentina Lima", email: "valentina.lima@email.com", role: "Monitor" },
    { id: 71, name: "Wesley Ribeiro", email: "wesley.ribeiro@email.com", role: "Administrador" },
    { id: 72, name: "Ximena Almeida", email: "ximena.almeida@email.com", role: "Monitor" },
    { id: 73, name: "Yuri Costa", email: "yuri.costa@email.com", role: "Administrador" },
    { id: 74, name: "Zara Mendes", email: "zara.mendes@email.com", role: "Monitor" },
    { id: 75, name: "André Silva", email: "andre.silva@email.com", role: "Administrador" },
    { id: 76, name: "Bianca Ferreira", email: "bianca.ferreira@email.com", role: "Monitor" },
    { id: 77, name: "César Lima", email: "cesar.lima@email.com", role: "Administrador" },
    { id: 78, name: "Débora Ribeiro", email: "debora.ribeiro@email.com", role: "Monitor" },
    { id: 79, name: "Elias Costa", email: "elias.costa@email.com", role: "Administrador" },
    { id: 80, name: "Flávia Almeida", email: "flavia.almeida@email.com", role: "Monitor" },
    { id: 81, name: "Geraldo Mendes", email: "geraldo.mendes@email.com", role: "Administrador" },
    { id: 82, name: "Heloísa Santos", email: "heloisa.santos@email.com", role: "Monitor" },
    { id: 83, name: "Ícaro Ferreira", email: "icaro.ferreira@email.com", role: "Administrador" },
    { id: 84, name: "Janaína Lima", email: "janaina.lima@email.com", role: "Monitor" },
    { id: 85, name: "Kauê Ribeiro", email: "kaue.ribeiro@email.com", role: "Administrador" },
    { id: 86, name: "Lara Costa", email: "lara.costa@email.com", role: "Monitor" },
    { id: 87, name: "Mauro Almeida", email: "mauro.almeida@email.com", role: "Administrador" },
    { id: 88, name: "Nina Mendes", email: "nina.mendes@email.com", role: "Monitor" },
    { id: 89, name: "Otto Ferreira", email: "otto.ferreira@email.com", role: "Administrador" },
    { id: 90, name: "Pietra Santos", email: "pietra.santos@email.com", role: "Monitor" },
    { id: 91, name: "Quirino Lima", email: "quirino.lima@email.com", role: "Administrador" },
    { id: 92, name: "Rita Ribeiro", email: "rita.ribeiro@email.com", role: "Monitor" },
    { id: 93, name: "Sandro Costa", email: "sandro.costa@email.com", role: "Administrador" },
    { id: 94, name: "Tânia Almeida", email: "tania.almeida@email.com", role: "Monitor" },
    { id: 95, name: "Ubiratan Mendes", email: "ubiratan.mendes@email.com", role: "Administrador" },
    { id: 96, name: "Vera Ferreira", email: "vera.ferreira@email.com", role: "Monitor" },
    { id: 97, name: "Wagner Santos", email: "wagner.santos@email.com", role: "Administrador" },
    { id: 98, name: "Xuxa Lima", email: "xuxa.lima@email.com", role: "Monitor" },
    { id: 99, name: "Yago Ribeiro", email: "yago.ribeiro@email.com", role: "Administrador" },
    { id: 100, name: "Zilda Costa", email: "zilda.costa@email.com", role: "Monitor" },
]

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<keyof User | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const usersPerPage = 10;

    // Filtrar usuários com base no input da busca
    const filteredUsers = users.filter((user) =>
        Object.values(user).some(
            (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Ordenar usuários
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortField) return 0;
        const valueA = a[sortField];
        const valueB = b[sortField];
        if (typeof valueA === "string" && typeof valueB === "string") {
            return sortDirection === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }
        return 0;
    });

    // Calcular índices para paginação
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Resetar página para 1 quando a busca ou ordenação mudar
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortField, sortDirection]);

    // Funções de navegação
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Função para ordenação
    const handleSort = (field: keyof User) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    // Calcular as páginas a serem exibidas (2 anteriores e 2 próximas)
    const getPageRange = () => {
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

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

    // Criar ou editar usuário no mock
    const handleSaveUser = (user: User) => {
        if (editingUser) {
            setUsers(users.map((u) => (u.id === editingUser.id ? user : u)));
        } else {
            const newUser = { ...user, id: Date.now() };
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
                        <div className="relative w-64">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaSearch className="text-gray-400" size={16} />
                            </span>
                            <input
                                type="text"
                                placeholder="Buscar usuário..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border p-2 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                            />
                        </div>
                        <button
                            onClick={() => handleOpenForm()}
                            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 cursor-pointer"
                        >
                            <FaPlus /> Criar Usuário
                        </button>
                    </div>
                </div>

                <UsersTable
                    users={currentUsers}
                    onEdit={handleOpenForm}
                    onDelete={handleDeleteUser}
                    onSort={handleSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                />

                {/* Controles de paginação com ícones de flechas */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded ${
                            currentPage === 1
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        aria-label="Página anterior"
                    >
                        <FaChevronLeft size={16} />
                    </button>
                    {getPageRange().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded ${
                                currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                            aria-label={`Página ${page}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded ${
                            currentPage === totalPages
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        aria-label="Próxima página"
                    >
                        <FaChevronRight size={16} />
                    </button>
                </div>

                {isFormOpen && (
                    <UserForm
                        user={editingUser}
                        onClose={handleCloseForm}
                        onSave={handleSaveUser}
                    />
                )}
            </div>
            <Footer />
            <ChatbotButton onClick={() => setChatOpen(true)} />
            <ChatbotModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        </div>
    );
};


export default Users;
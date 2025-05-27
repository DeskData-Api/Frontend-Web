// Users.tsx
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { FaPlus } from "react-icons/fa";
import DataTable from "react-data-table-component";
import CrudUsuario from "../components/CrudUsuario";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  nome: string;
  email: string;
  cargo: "Admin" | "Viewer";
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCrud, setOpenCrud] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setUserToEdit(user);
    setOpenCrud(true);
  };


  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3003/usuario/deletar/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3004/usuario/listar");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const toggleCrud = () => {
    setOpenCrud(!openCrud);
    if (openCrud) setUserToEdit(null);
  };


  const columns = [
    { name: "ID", selector: (row: User) => row.id, sortable: true },
    { name: "Nome", selector: (row: User) => row.nome, sortable: true },
    { name: "Email", selector: (row: User) => row.email, sortable: true },
    { name: "Permissão", selector: (row: User) => row.cargo, sortable: true },
    {
      name: "Ações",
      cell: (row: User) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-screen font-montserrat">
      <Header />
      {openCrud && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/80 bg-opacity-50 z-50">
          <CrudUsuario onClose={toggleCrud} userToEdit={userToEdit || undefined} />
        </div>
      )}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start flex-col sm:flex-row mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold font-montserrat mb-2">Gerenciamento de Usuários</h1>
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-1 rounded w-full md:w-64 font-montserrat"
            />
          </div>
          <button
            onClick={toggleCrud}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 cursor-pointer font-montserrat"
          >
            <FaPlus /> Criar Usuário
          </button>
        </div>
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          highlightOnHover
          striped
          responsive
          className="rounded border shadow-sm"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Users;
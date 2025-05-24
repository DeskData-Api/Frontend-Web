import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import HistoryCard from '../components/layouts/Content/HistoryCard';
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

interface HistoryItem {
    id: number;
    titulo: string;
    entidade: string;
    categoria: string;
    localizacao: string;
    data_abertura: string;
    data_fechamento: string | null;
    status: string;
    descricao: string;
    elementos_associados: string[];
    tecnico_atribuido: string;
}

const dadosTabela: HistoryItem[] = [
    {
        id: 1,
        titulo: 'Manutenção de Servidor',
        entidade: 'Empresa ABC',
        categoria: 'Manutenção',
        localizacao: 'São Paulo, SP',
        data_abertura: '2025-04-01',
        data_fechamento: '2025-04-05',
        status: 'Concluído',
        descricao: 'Manutenção preventiva no servidor principal.',
        elementos_associados: ['Servidor X', 'Roteador Y'],
        tecnico_atribuido: 'João Silva',
    },
    {
        id: 2,
        titulo: 'Atualização de Software',
        entidade: 'Empresa XYZ',
        categoria: 'Desenvolvimento',
        localizacao: 'Rio de Janeiro, RJ',
        data_abertura: '2025-04-10',
        data_fechamento: '2025-04-15',
        status: 'Aberto',
        descricao: 'Atualização do sistema ERP para versão 2.1.',
        elementos_associados: ['ERP', 'Banco de Dados'],
        tecnico_atribuido: 'Maria Oliveira',
    },
    {
        id: 3,
        titulo: 'Troca de Equipamento',
        entidade: 'Empresa 123',
        categoria: 'Infraestrutura',
        localizacao: 'Belo Horizonte, MG',
        data_abertura: '2025-04-20',
        data_fechamento: null,
        status: 'Aberto',
        descricao: 'Substituição de switch de rede obsoleto.',
        elementos_associados: ['Switch Z'],
        tecnico_atribuido: 'Carlos Souza',
    },
    {
        id: 4,
        titulo: 'Instalação de Firewall',
        entidade: 'Tech Solutions',
        categoria: 'Segurança',
        localizacao: 'Curitiba, PR',
        data_abertura: '2025-04-25',
        data_fechamento: null,
        status: 'Aberto',
        descricao: 'Configuração e instalação de um novo firewall para proteger a rede interna.',
        elementos_associados: ['Firewall Cisco', 'Roteador Principal'],
        tecnico_atribuido: 'Ana Costa',
    },
    {
        id: 5,
        titulo: 'Backup de Dados',
        entidade: 'Indústria Beta',
        categoria: 'Manutenção',
        localizacao: 'Porto Alegre, RS',
        data_abertura: '2025-04-12',
        data_fechamento: '2025-04-14',
        status: 'Concluído',
        descricao: 'Realização de backup completo dos dados da empresa para storage externo.',
        elementos_associados: ['Storage NAS', 'Servidor de Backup'],
        tecnico_atribuido: 'Pedro Almeida',
    },
    {
        id: 6,
        titulo: 'Migração de Banco de Dados',
        entidade: 'Startup Innovate',
        categoria: 'Desenvolvimento',
        localizacao: 'Florianópolis, SC',
        data_abertura: '2025-04-18',
        data_fechamento: null,
        status: 'Aberto',
        descricao: 'Migração do banco de dados MySQL para PostgreSQL para melhorar performance.',
        elementos_associados: ['MySQL', 'PostgreSQL'],
        tecnico_atribuido: 'Lucas Mendes',
    },
    {
        id: 7,
        titulo: 'Treinamento de Equipe',
        entidade: 'Consultoria Delta',
        categoria: 'Capacitação',
        localizacao: 'Recife, PE',
        data_abertura: '2025-04-05',
        data_fechamento: '2025-04-10',
        status: 'Concluído',
        descricao: 'Treinamento da equipe de TI sobre novas ferramentas de monitoramento.',
        elementos_associados: ['Software de Monitoramento', 'Documentação'],
        tecnico_atribuido: 'Fernanda Lima',
    },
    {
        id: 8,
        titulo: 'Configuração de VPN',
        entidade: 'Grupo Omega',
        categoria: 'Infraestrutura',
        localizacao: 'Salvador, BA',
        data_abertura: '2025-04-22',
        data_fechamento: null,
        status: 'Aberto',
        descricao: 'Configuração de uma VPN para acesso remoto seguro dos funcionários.',
        elementos_associados: ['Servidor VPN', 'Certificados de Segurança'],
        tecnico_atribuido: 'Rafael Santos',
    },
];

const HistoricTable: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortField, setSortField] = useState<keyof HistoryItem | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    // Filtrar itens
    const filteredItems = dadosTabela.filter((item) =>
        Object.values(item).some(
            (value) =>
                (typeof value === 'string' &&
                    value.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (Array.isArray(value) &&
                    value.some((v) => typeof v === 'string' && v.toLowerCase().includes(searchQuery.toLowerCase())))
        )
    );

    // Ordenar itens
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (!sortField) return 0;

        // Ordenação por data_abertura ou data_fechamento
        if (sortField === 'data_abertura' || sortField === 'data_fechamento') {
            const dateA = sortField === 'data_abertura' ? a.data_abertura : a.data_fechamento;
            const dateB = sortField === 'data_abertura' ? b.data_abertura : b.data_fechamento;

            // Tratar data_fechamento como null (colocar no final se for null)
            if (dateA === null && dateB === null) return 0;
            if (dateA === null) return sortDirection === 'asc' ? 1 : -1;
            if (dateB === null) return sortDirection === 'asc' ? -1 : 1;

            const valueA = new Date(dateA).getTime();
            const valueB = new Date(dateB).getTime();

            return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        }

        // Ordenação por outros campos (string)
        const valueA = a[sortField];
        const valueB = b[sortField];
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortDirection === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }
        return 0;
    });

    // Calcular índices para paginação
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

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
    const handleSort = (field: keyof HistoryItem) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Calcular as páginas a serem exibidas (2 anteriores e 2 próximas)
    const getPageRange = () => {
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow p-6">
                {/* Campo de busca com ícone */}
                <div className="flex flex-row w-full justify-between">
                    <div className="mb-4 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-1/3 p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-100 shadow-sm"
                        />
                    </div>

                    {/* Cabeçalhos com botões de ordenação */}
                    <div className="mb-4 flex space-x-4 items-center">
                        <span className="text-gray-700 font-medium">Ordenar por:</span>
                        <button
                            onClick={() => handleSort('data_abertura')}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 shadow-sm"
                        >
                            Data de Abertura {sortField === 'data_abertura' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </button>
                        <button
                            onClick={() => handleSort('data_fechamento')}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 shadow-sm"
                        >
                            Data de Fechamento {sortField === 'data_fechamento' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </button>
                        <button
                            onClick={() => handleSort('status')}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 shadow-sm"
                        >
                            Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </button>
                        <button
                            onClick={() => handleSort('tecnico_atribuido')}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 shadow-sm"
                        >
                            Técnico {sortField === 'tecnico_atribuido' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </button>
                    </div>
                </div>

                {/* Lista de cartões */}
                <div className="flex flex-wrap gap-8 place-content-center pb-20 pt-5">
                    {currentItems.map((item) => (
                        <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <HistoryCard item={item} />
                        </div>
                    ))}
                </div>

                {/* Controles de paginação fixos acima do footer */}
                {totalPages > 1 && (
                    <div className="fixed bottom-16 left-0 right-0 bg-white shadow-md p-4 flex justify-center space-x-2 z-10">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                        >
                            Anterior
                        </button>
                        {getPageRange().map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 rounded-lg ${
                                    currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                        >
                            Próximo
                        </button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default HistoricTable;
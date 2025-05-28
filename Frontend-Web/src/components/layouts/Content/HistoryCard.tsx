import React from 'react';
import { FaUser } from 'react-icons/fa';
import ChamadosFechados from '../../../assets/icons/chamados_fechados.png';
import ChamadosAbertos from '../../../assets/icons/chamados_abertos.png';

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

interface HistoryCardProps {
    item: HistoryItem;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ item }) => {
    const imagemChamado = item.status.toLowerCase() === 'concluído' ? ChamadosFechados : ChamadosAbertos;

    const formatarData = (data: string | null, tipo: 'abertura' | 'fechamento'): string => {
        if (!data) return tipo === 'fechamento' ? 'Não encerrado' : 'N/A';
        const date = new Date(data);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between h-full w-full transition hover:shadow-lg">
            {/* Topo com imagem e datas */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-3">
                    <img
                        src={imagemChamado}
                        alt={item.status === 'Concluído' ? 'Chamado Fechado' : 'Chamado Aberto'}
                        className="w-10 h-10"
                    />
                    <div className="flex flex-col">
                        <span>Abertura: {formatarData(item.data_abertura, 'abertura')}</span>
                        <span>Fechamento: {formatarData(item.data_fechamento, 'fechamento')}</span>
                    </div>
                </div>
            </div>

            {/* Título + Entidade */}
            <div className="mb-2">
                <h3 className="text-lg font-bold text-gray-800">{item.titulo}</h3>
                <p className="text-sm text-gray-600 italic">{item.entidade}</p>
            </div>

            {/* Descrição */}
            <p className="text-sm text-gray-700 mb-3 line-clamp-5 text-justify">
                {item.descricao}
            </p>

            {/* Rodapé com status e técnico */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-2 border-t">
                <span className="capitalize">{item.status}</span>
                <span className="flex items-center gap-1">
                    <FaUser className="text-gray-500" /> {item.tecnico_atribuido}
                </span>
            </div>
        </div>
    );
};

export default HistoryCard;

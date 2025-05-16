import React from 'react';
import { FaHeadphones, FaCheck, FaTimes, FaUser } from 'react-icons/fa';
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
    // Define a imagem com base no status
    const imagemChamado = item.status === 'Concluído' ? ChamadosFechados : ChamadosAbertos;

    // Função para formatar a data de YYYY-MM-DD para DD/MM/YYYY
    const formatarData = (data: string | null): string => {
        if (!data) return 'N/A';
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-3 border border-gray-200 min-h-32 max-w-180 mb-15">
            {/* Top */}
            <div className="flex flex-row justify-between">
                {/* Ícone */}
                <div className="relative flex-shrink-0 mr-4">
                    <img src={imagemChamado} className="h-15 w-15" alt={item.status === 'Concluído' ? 'Chamado Fechado' : 'Chamado Aberto'} />
                </div>

                {/* Data de abertura e fechamento */}
                <div className="text-lg text-gray-500 ">
                    {formatarData(item.data_abertura)} - {formatarData(item.data_fechamento)}
                </div>
            </div>

            {/* Bottom */}
            <div className="flex flex-row justify-between gap-1">
                {/* Título e Descrição */}
                <div className="flex-1 pt-5">
                    <h3 className="text-lg font-semibold text-gray-800">{item.titulo}</h3>
                    <p className="text-sm text-gray-600 pl-5 text-justify pr-1 pt-1">{item.descricao}</p>
                </div>

                {/* Ícone de pessoa e nome do técnico */}
                <div className="flex items-center text-sm text-gray-700 self-end">
                    <FaUser className="pr-1 text-gray-500" />
                    <span>{item.tecnico_atribuido}</span>
                </div>
            </div>
        </div>
    );
};

export default HistoryCard;
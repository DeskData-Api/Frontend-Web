import React, { useState, useEffect } from "react";
import ChartCard from "./ChartCard";
import InfoBlock from "./InfoBlock";
import ChamadosFechadosIcone from "../../../assets/icons/chamados_fechados.png"
import ChamadosAbertosIcone from "../../../assets/icons/chamados_abertos.png"
import Hour_glass from "../../../assets/icons/hour-glass.png"
import Pie_chart from "../../../assets/icons/pie-chart.png"

interface Category {
  name: string;
  qtd: number;
}

interface Elements {
  categoria: string;
  qtd: number;
}

interface ChamadosPorMes {
  name: string; // Ex: "2023-09"
  qtd: number;
}

interface DashboardData {
  total: number;
  abertos: number;
  fechados: number;
  resolvidos: number;
  top5Categorias: Category[];
  top5Elementos: Elements[];
  chamadosPorMes: ChamadosPorMes[]; // Adicionado
  tempoMedio?: number;
  colaboradores: Category[];
}

const ChartsSection: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:3003/chamados/dashboard");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do dashboard");
        }
        const data: DashboardData = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  if (loading) {
    return <div className="w-full min-h-screen bg-white p-10">Carregando...</div>;
  }

  if (error || !dashboardData) {
    return <div className="w-full min-h-screen bg-white p-10">Erro: {error || "Dados não disponíveis"}</div>;
  }

  const TimeFormatFix = (time: number) => {
    const decimal = time % 1;
    const minutos = decimal * 60;
    const Horas = Math.floor(time);

    return {
      horas: Horas,
      minutos: Math.round(minutos)
    };

  }

  return (
    <section className="w-full min-h-screen bg-white p-10">
      {/* Blocos de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <InfoBlock 
          title="Total de Chamados"
          value={dashboardData.total}
          unit="chamados" 
          icon1={Pie_chart}
          />

        <InfoBlock 
          title="Chamados Abertos" 
          value={dashboardData.abertos} 
          unit="em aberto" 
          color="#D08700" 
          icon1={ChamadosAbertosIcone}
          />

        <InfoBlock
          title="Chamados Fechados"
          value={dashboardData.fechados !== undefined ? dashboardData.fechados : "N/A"}
          unit="resolvidos"
          color="#5EA500"
          icon2={ChamadosFechadosIcone}

        />
        <InfoBlock
          title="Tempo Médio de Resposta"
          value={
            dashboardData.tempoMedio !== undefined
              ? (() => {
                const { horas, minutos } = TimeFormatFix(dashboardData.tempoMedio);
                return `${horas}h ${minutos}m`;
              })()
              : "N/A"
          }
          unit="" // Unidade não é necessária, já que o texto inclui "horas" e "minutos"
          icon2={Hour_glass}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Elementos de Chamados"
          type="pie"
          data={dashboardData.top5Elementos}
        />
        <ChartCard
          title="Chamados por Status"
          type="bar"
          data={[
            { name: "Abertos", qtd: dashboardData.abertos },
            { name: "Fechados", qtd: dashboardData.fechados },
          ]}
        />
        <ChartCard
          title="Tempo Médio de Resolução"
          type="bar"
          data={[
            {
              name: "Média (h)",
              qtd: dashboardData.tempoMedio !== undefined ? dashboardData.tempoMedio : 0,
            },
          ]}
        />
        <ChartCard
          title="Categorias com maior incidência"
          type="bar"
          data={dashboardData.top5Categorias}
        />
        <ChartCard
          title="Chamados por Técnico"
          type="bar"
          data={dashboardData.colaboradores}
        />
        <ChartCard
          title="Histórico mensal de Chamados"
          type="line"
          data={dashboardData.chamadosPorMes}
        />
      </div>
    </section>
  );
};

export default ChartsSection;
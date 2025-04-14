import React, { useState, useEffect } from "react";
import ChartCard from "./ChartCard";
import InfoBlock from "./InfoBlock";
import LoadingScreen from "../../LoadingScreen";
import { mockDashboardData } from "../../../mockData";
import { formatarMes } from "../../../utils/formatters";

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

export interface DashboardData {
  total: number;
  abertos: number;
  fechados: number;
  resolvidos: number;
  top5Categorias: Category[];
  top5Elementos: Elements[];
  chamadosPorMes: ChamadosPorMes[];
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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/chamados/dashboard`);
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do dashboard");
        }
        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro desconhecido";
        console.error("Erro ao buscar dados do dashboard:", msg);
        setError(msg);

        // ✅ Fallback para mock em modo desenvolvimento (Vite)
        if (import.meta.env.DEV) {
          console.warn("Usando dados mockados em modo desenvolvimento.");
          setDashboardData(mockDashboardData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <LoadingScreen />;

  if (error && !dashboardData && !import.meta.env.DEV) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white px-6 text-center">
        <div className="text-6xl mb-4 text-red-500">⚠️</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Algo deu errado</h1>
        <p className="text-gray-600 mb-4">
          Não foi possível carregar os dados do dashboard no momento.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-white p-10">
      {import.meta.env.DEV && error && (
        <div className="mb-4 text-sm text-yellow-600 font-medium">
          ⚠️ Modo desenvolvimento: dados mockados em uso
        </div>
      )}

      {/* Blocos de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <InfoBlock title="Total de Chamados" value={dashboardData.total} unit="chamados" />
        <InfoBlock title="Chamados Abertos" value={dashboardData.abertos} unit="em aberto" />
        <InfoBlock title="Chamados Fechados" value={dashboardData.fechados} unit="resolvidos" />
        <InfoBlock
          title="Tempo Médio Resposta"
          value={dashboardData.tempoMedio !== undefined ? dashboardData.tempoMedio : "N/A"}
          unit={dashboardData.tempoMedio !== undefined ? "horas" : ""}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Elementos de Chamados" type="pie" data={dashboardData.top5Elementos} />
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
          data={dashboardData.chamadosPorMes.map(item => ({
            ...item,
            name: formatarMes(item.name),
          }))}
        />
      </div>
    </section>
  );
};

export default ChartsSection;

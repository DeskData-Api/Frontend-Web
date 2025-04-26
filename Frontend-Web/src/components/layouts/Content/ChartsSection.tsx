import React, { useState, useEffect } from "react";
import ChartCard from "./ChartCard";
import InfoBlock from "./InfoBlock";
import LoadingScreen from "../../LoadingScreen";
import { mockDashboardData } from "../../../mockData";
import { formatarMes } from "../../../utils/formatters";
import { formatarHorasMinutos } from "../../../utils/formatters";

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

interface mes {
  name: string; // Ex: "2023-09"
  qtd: number;
  categoria: string;
  semana: string; // Ex: "2023-09-01"
}

export interface DashboardData {
  total: number;
  abertos: number;
  fechados: number;
  top5Categorias: Category[];
  top5Elementos: Elements[];
  chamadosPorMes: ChamadosPorMes[];
  tempoMedio?: number;
  palavrasFrequentes: Category[];
  tempoPorCategoria: Category[];
  similaridadeChamados: Category[];
  chm: {
    id: number;
    frequentes_problema: Category[];
  }[];
  topCategoriaPorSemana: mes[]
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

  if (!dashboardData) return null;

  const palavrasFrequentes = dashboardData.chm?.[0]?.frequentes_problema || [];

  console.log("Palavras frequentes:", palavrasFrequentes);
  return (
    <section className="w-full min-h-screen bg-white p-10">
      {import.meta.env.DEV && error && (
        <div className="mb-4 text-sm text-yellow-600 font-medium">
          ⚠️ Modo desenvolvimento: dados mockados em uso
        </div>
      )}

      {/* Blocos de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <InfoBlock title="Total de Chamados" value={dashboardData.total} unit="" />
        <InfoBlock title="Chamados Abertos" value={dashboardData.abertos} unit="" />
        <InfoBlock title="Chamados Fechados" value={dashboardData.fechados} unit="" />
        <InfoBlock
          title="Tempo Médio Resposta"
          value={
            dashboardData.tempoMedio !== undefined && dashboardData.tempoMedio !== null
              ? formatarHorasMinutos(dashboardData.tempoMedio)
              : "N/A"
          }
          unit=""
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Histórico mensal de Chamados em destaque */}
        <div className="lg:col-span-2 col-span-1">
          <ChartCard
            title="Histórico mensal de Chamados"
            type="line"
            data={dashboardData.chamadosPorMes.map(item => ({
              ...item,
              name: formatarMes(item.name),
            }))}
          />
        </div>

          {/* Histórico mensal de Chamados em destaque */}
          <div className="lg:col-span-2 col-span-1">
            <ChartCard
              title="Histórico mensal de Chamados e Categoria mais Citada"
              type="line"
              data={dashboardData.chamadosPorMes.map(item => ({
                ...item,
                name: formatarMes(item.name),
              }))}
            />
          </div>

          {/* Gráfico: Status */}
          <ChartCard
            title="Chamados por Status"
            type="bar"
            data={[
              { name: "Abertos", qtd: dashboardData.abertos },
              { name: "Fechados", qtd: dashboardData.fechados },
            ]}
          />

          {/* Gráfico: Elementos */}
          <ChartCard title="Elementos de Chamados" type="pie" data={dashboardData.top5Elementos} />

            {/* <div className="lg:col-span-2 col-span-1">
          <ChartCard
            title="Tempo Médio por Categoria"
            type="boxplot"
            data={dashboardData.tempoPorCategoria}
          />
          </div> */}

          <div className="lg:col-span-2 col-span-1">
            <ChartCard
              title="Categorias com maior incidência"
              type="bar"
              data={dashboardData.top5Categorias}
            />
          </div>

          <ChartCard
            title="Nuvem de Palavras Frequentes"
            type="wordcloud"
            data={palavrasFrequentes}
          />

          <ChartCard
            title="Similaridade entre Chamados"
            type="heatmap"
            data={dashboardData.similaridadeChamados}
          />
        </div>
    </section>
  );
};

export default ChartsSection;

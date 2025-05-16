import React, { useState, useEffect } from "react";
import ChartCard from "./ChartCard";
import InfoBlock from "./InfoBlock";
import ChamadosFechadosIcone from "../../../assets/icons/chamados_fechados.png"
import ChamadosAbertosIcone from "../../../assets/icons/chamados_abertos.png"
import Hour_glass from "../../../assets/icons/hour-glass.png"
import Pie_chart from "../../../assets/icons/pie-chart.png"
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
  quinzena: string; // Ex: "2023-09-01"
  ordem: string; // Ex: "2023-09-01"
}

export interface DashboardData {
  total: number;
  abertos: number;
  fechados: number;
  top5Categorias: Category[];
  top5Elementos: Elements[];
  chamadosPorMes: ChamadosPorMes[]; // Adicionado
  tempoMedio?: number;
  colaboradores: Category[];
  palavrasFrequentes: Category[];
  tempoPorCategoria: Category[];
  similaridadeChamados: Category[];
  chm: {
    id: number;
    frequentes_problema: Category[];
    distribuicao_temporal: mes[];
  }[];
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
  const distribuicao_temporal = dashboardData?.chm?.[0]?.distribuicao_temporal;
  
  let dadosOrdenados: { name: string; qtd: number; categoria: string; ordem?: string }[] = [];
  
  if (Array.isArray(distribuicao_temporal)) {
    dadosOrdenados = [...distribuicao_temporal].sort((a, b) =>
      new Date(a.ordem).getTime() - new Date(b.ordem).getTime()
    );
  }
  console.log(dadosOrdenados)
  return (
    <section className="w-full min-h-screen bg-white p-10">
      {import.meta.env.DEV && error && (
        <div className="mb-4 text-sm text-yellow-600 font-medium">
          ⚠️ Modo desenvolvimento: dados mockados em uso
        </div>
      )}
      
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
        {/* Histórico mensal de Chamados em destaque */}
        <div className="lg:col-span-2 col-span-1">
          <ChartCard
            title="Histórico Mensal de Chamados"
            type="line"
            showXAxisLabels={true}
            data={dashboardData.chamadosPorMes.map(item => ({
              ...item,
              name: formatarMes(item.name),
            }))}
          />
        </div>

        <ChartCard
          title="Nuvem de Palavras Frequentes"
          type="wordcloud"
          data={palavrasFrequentes}
        />
        {distribuicao_temporal && (
          <div className="lg:col-span-2 col-span-1">
            <ChartCard
              title="Categoria Mais Citada por Quinzena"
              type="line"
              showXAxisLabels={false}
              data={dadosOrdenados.map(item=> ({
                name: item.quinzena,     // o que será exibido no eixo X
                qtd: item.qtd,
                categoria: item.categoria
              }))}
            />
          </div>
        )}

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
          title="Similaridade entre Chamados"
          type="heatmap"
          data={dashboardData.similaridadeChamados}
        />
      </div>
    </section>
  );
};

export default ChartsSection;
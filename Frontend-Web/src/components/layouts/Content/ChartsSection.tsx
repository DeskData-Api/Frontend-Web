import React, { useState, useEffect } from "react";
import ChartCard from "./ChartCard";
import InfoBlock from "./InfoBlock";
import ChamadosFechadosIcone from "../../../assets/icons/chamados_fechados.png";
import ChamadosAbertosIcone from "../../../assets/icons/chamados_abertos.png";
import Hour_glass from "../../../assets/icons/hour-glass.png";
import Pie_chart from "../../../assets/icons/pie-chart.png";
import LoadingScreen from "../../LoadingScreen";
import { mockDashboardData } from "../../../mockData";
import { formatarMes, formatarHorasMinutos } from "../../../utils/formatters";

interface Category {
  name: string;
  qtd: number;
}

interface Elements {
  categoria: string;
  qtd: number;
}

interface ChamadosPorMes {
  name: string;
  qtd: number;
}

interface mes {
  name: string;
  qtd: number;
  categoria: string;
  quinzena: string;
  ordem: string;
}

export interface DashboardData {
  total: number;
  abertos: number;
  fechados: number;
  top5Categorias: Category[];
  top5Elementos: Elements[];
  chamadosPorMes: ChamadosPorMes[];
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

/** ---------------- tipos para tópicos LDA ---------------- */
interface TopicResponse {
  topico: string; // "topico_1"
  palavras: string[];
  pesos: number[];
}

const ChartsSection: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3003";
        const [dashRes, topicsRes] = await Promise.all([
          fetch(`${baseUrl}/chamados/dashboard`),
          fetch(`${baseUrl}/topicos`) // ajuste se seu endpoint for diferente
        ]);

        if (!dashRes.ok) throw new Error("Erro ao buscar dados do dashboard");
        const dashJson: DashboardData = await dashRes.json();
        setDashboardData(dashJson);

        if (topicsRes.ok) {
          const topicsJson: TopicResponse[] = await topicsRes.json();
          setTopics(topicsJson);
        } else {
          console.warn("Endpoint /topicos respondeu " + topicsRes.status);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erro desconhecido";
        setError(msg);
        if (import.meta.env.DEV) {
          console.warn("Usando dados mockados (dashboard)");
          setDashboardData(mockDashboardData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <LoadingScreen />;

  if (error && !dashboardData && !import.meta.env.DEV) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white px-6 text-center">
        <div className="text-6xl mb-4 text-red-500">⚠️</div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Algo deu errado</h1>
        <p className="text-gray-600 mb-4">Não foi possível carregar os dados do dashboard no momento.</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Tentar novamente</button>
      </div>
    );
  }

  if (!dashboardData) return null;

  const palavrasFrequentes = dashboardData.chm?.[0]?.frequentes_problema || [];
  const distribuicao_temporal = dashboardData?.chm?.[0]?.distribuicao_temporal;

  let dadosOrdenados: { name: string; qtd: number; categoria: string; ordem?: string }[] = [];
  if (Array.isArray(distribuicao_temporal)) {
    dadosOrdenados = [...distribuicao_temporal].sort((a, b) => new Date(a.ordem).getTime() - new Date(b.ordem).getTime());
  }

  const TimeFormatFix = (time: number) => {
    const decimal = time % 1;
    const minutos = decimal * 60;
    const Horas = Math.floor(time);
    return { horas: Horas, minutos: Math.round(minutos) };
  };

  /** ---------- gera ChartCards para cada tópico ---------- */
  const topicCharts = topics.map((topic) => {
    const data = topic.palavras.map((p, idx) => ({ name: p, qtd: topic.pesos[idx] ?? 0 }));
    const titulo = topic.topico.replace("_", " ").replace(/\b(\w)/g, (s) => s.toUpperCase());
    return <ChartCard key={topic.topico} title={titulo} type="bar" data={data} />;
  });

  return (
    <section className="w-full min-h-screen bg-white p-10">
      {import.meta.env.DEV && error && (
        <div className="mb-4 text-sm text-yellow-600 font-medium">⚠️ Modo desenvolvimento: dados mockados em uso</div>
      )}

      {/* Blocos de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <InfoBlock title="Total de Chamados" value={dashboardData.total} unit="chamados" icon1={Pie_chart} />
        <InfoBlock title="Chamados Abertos" value={dashboardData.abertos} unit="em aberto" color="#D08700" icon1={ChamadosAbertosIcone} />
        <InfoBlock title="Chamados Fechados" value={dashboardData.fechados ?? "N/A"} unit="resolvidos" color="#5EA500" icon2={ChamadosFechadosIcone} />
        <InfoBlock title="Tempo Médio de Resposta" value={dashboardData.tempoMedio != null ? (() => { const { horas, minutos } = TimeFormatFix(dashboardData.tempoMedio); return `${horas}h ${minutos}m`; })() : "N/A"} unit="" icon2={Hour_glass} />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 col-span-1">
          <ChartCard title="Histórico Mensal de Chamados" type="line" showXAxisLabels={true} data={dashboardData.chamadosPorMes.map((item) => ({ ...item, name: formatarMes(item.name) }))} />
        </div>

        <ChartCard title="Nuvem de Palavras Frequentes" type="wordcloud" data={palavrasFrequentes} />

        {distribuicao_temporal && (
          <div className="lg:col-span-2 col-span-1">
            <ChartCard title="Categoria Mais Citada por Quinzena" type="line" showXAxisLabels={false} data={dadosOrdenados.map((item) => ({ name: item.name, qtd: item.qtd, categoria: item.categoria }))} />
          </div>
        )}

        <ChartCard title="Elementos de Chamados" type="pie" data={dashboardData.top5Elementos} />

        <div className="lg:col-span-2 col-span-1">
          <ChartCard title="Categorias com maior incidência" type="bar" data={dashboardData.top5Categorias} />
        </div>

        <ChartCard title="Similaridade entre Chamados" type="heatmap" data={dashboardData.similaridadeChamados} />

        {/* ---------------- gráficos de tópicos ---------------- */}
        {topicCharts}
      </div>
    </section>
  );
};

export default ChartsSection;
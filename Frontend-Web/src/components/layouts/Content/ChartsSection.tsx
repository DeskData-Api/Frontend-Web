import React from "react";
import ChartCard from "./ChartCard";
import InfoBlock from "./InfoBlock";
import { mockDashboardData } from "../../../mockData";

const ChartsSection: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-white p-10">
      {/* Blocos de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <InfoBlock title="Total de Chamados" value={mockDashboardData.chamadosAnalise.totalChamados} unit="chamados" />
        <InfoBlock title="Chamados Abertos" value={mockDashboardData.chamadosAnalise.chamadosAbertos} unit="em aberto" />
        <InfoBlock title="Chamados Fechados" value={mockDashboardData.chamadosAnalise.chamadosFechados} unit="resolvidos" />
        <InfoBlock title="Tempo Médio Resposta" value={mockDashboardData.chamadosAnalise.mediaTempoResposta} unit="horas" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Distribuição de Chamados" type="pie" data={mockDashboardData.chamadosAnalise.categorias} />
        <ChartCard title="Chamados por Status" type="bar" data={[
          { name: "Abertos", qtd: mockDashboardData.chamadosAnalise.chamadosAbertos },
          { name: "Fechados", qtd: mockDashboardData.chamadosAnalise.chamadosFechados },
        ]} />
        <ChartCard title="Tempo Médio de Resolução" type="bar" data={[
          { name: "Média (h)", qtd: mockDashboardData.chamadosAnalise.mediaTempoResposta },
        ]} />
        <ChartCard title="Chamados por Categoria" type="bar" data={mockDashboardData.chamadosAnalise.categorias} />
        <ChartCard title="Chamados por Técnico" type="bar" data={[
          { name: "Carlos", qtd: 25 },
          { name: "Mariana", qtd: 18 },
          { name: "José", qtd: 15 },
        ]} />
        <ChartCard title="Crescimento de Chamados" type="line" data={mockDashboardData.chamadosAnalise.categorias} />
      </div>
    </section>
  );
};

export default ChartsSection;

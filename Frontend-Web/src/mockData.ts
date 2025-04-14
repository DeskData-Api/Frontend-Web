import { DashboardData } from "./components/layouts/Content/ChartsSection";

export const mockDashboardData: DashboardData = {
  total: 120,
  abertos: 45,
  fechados: 75,
  resolvidos: 75, // ou outro número se for diferente de fechados
  tempoMedio: 4.2,

  top5Categorias: [
    { name: "Bug", qtd: 35 },
    { name: "Falha", qtd: 25 },
    { name: "Dúvida", qtd: 30 },
    { name: "Melhoria", qtd: 20 },
    { name: "Outro", qtd: 10 },
  ],

  top5Elementos: [
    { categoria: "API Auth", qtd: 10 },
    { categoria: "Banco de Dados", qtd: 8 },
    { categoria: "Servidor Apache", qtd: 6 },
    { categoria: "Firewall", qtd: 5 },
    { categoria: "OAuth", qtd: 3 },
  ],

  chamadosPorMes: [
    { name: "2024-01", qtd: 10 },
    { name: "2024-02", qtd: 15 },
    { name: "2024-03", qtd: 20 },
    { name: "2024-04", qtd: 25 },
  ],

  colaboradores: [
    { name: "Carlos Silva", qtd: 40 },
    { name: "Mariana Souza", qtd: 35 },
    { name: "José Oliveira", qtd: 25 },
    { name: "Ana Costa", qtd: 20 },
    { name: "Lucas Lima", qtd: 10 },
  ],
};

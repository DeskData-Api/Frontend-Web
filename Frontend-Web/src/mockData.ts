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
    { name: "2023-05", qtd: 5 },
    { name: "2023-06", qtd: 8 },
    { name: "2023-07", qtd: 10 },
    { name: "2023-08", qtd: 12 },
    { name: "2023-09", qtd: 15 },
    { name: "2023-10", qtd: 14 },
    { name: "2023-11", qtd: 18 },
    { name: "2023-12", qtd: 20 },
    { name: "2024-01", qtd: 22 },
    { name: "2024-02", qtd: 25 },
    { name: "2024-03", qtd: 28 },
    { name: "2024-04", qtd: 30 },
  ],

  colaboradores: [
    { name: "Carlos Silva", qtd: 40 },
    { name: "Mariana Souza", qtd: 35 },
    { name: "José Oliveira", qtd: 25 },
    { name: "Ana Costa", qtd: 20 },
    { name: "Lucas Lima", qtd: 10 },
  ],

  // Gráfico 4: Nuvem de palavras
  palavrasFrequentes: [
    { name: "senha", qtd: 42 },
    { name: "email", qtd: 35 },
    { name: "acesso", qtd: 27 },
    { name: "bloqueio", qtd: 19 },
    { name: "usuário", qtd: 17 },
  ],

  // Gráfico 5: Tempo médio por categoria (Boxplot simulado)
  tempoPorCategoria: [
    { name: "Bug", qtd: 6.5 },
    { name: "Bug", qtd: 5.8 },
    { name: "Bug", qtd: 7.1 },
    { name: "Falha", qtd: 4.9 },
    { name: "Falha", qtd: 5.6 },
    { name: "Falha", qtd: 5.1 },
    { name: "Dúvida", qtd: 2.5 },
    { name: "Dúvida", qtd: 3.2 },
    { name: "Melhoria", qtd: 4.3 },
    { name: "Melhoria", qtd: 3.9 },
    { name: "Outro", qtd: 2.8 },
    { name: "Outro", qtd: 3.0 },
  ],

  // Gráfico 8: Heatmap de similaridade entre chamados
  similaridadeChamados: [
    { name: "Senha e-mail ≈ Reset senha", qtd: 93 },
    { name: "Acesso bloqueado ≈ Permissão sistema", qtd: 88 },
    { name: "Erro sistema ≈ Bug funcionalidade", qtd: 85 },
    { name: "Troca de máquina ≈ Instalação software", qtd: 82 },
    { name: "Criação de conta ≈ Novo colaborador", qtd: 79 },
  ]
};

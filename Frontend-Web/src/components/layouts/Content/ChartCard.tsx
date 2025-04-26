import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import WordCloudSafe from "./WordCloudSafe";

type ApexChartTypes = "bar" | "line" | "pie" | "heatmap" | "boxPlot";
type CustomChartTypes = "wordcloud" | "boxplot";

interface ChartCardProps {
  title: string;
  type: ApexChartTypes | CustomChartTypes;
  data: { name?: string; categoria?: string; qtd: number }[];
}

const customColors = ["#0070f3", "#00bfa5", "#ffb400", "#ff6f61", "#7f00ff"];

const colorByTitle: Record<string, string[]> = {
  "Chamados por Status": ["#ef4444", "#22c55e"], // vermelho e verde
  // outros títulos, se quiser customizar depois
};

const ChartCard: React.FC<ChartCardProps> = ({ title, type, data }) => {
  const categories = data.map((d, i) => d.name ?? d.categoria ?? `Item ${i + 1}`);
  const values = data.map((d) => Number(d.qtd ?? 0));

  const chartSeries =
    type === "pie"
      ? values
      : [{ name: title, data: values }];

  let chartOptions: ApexOptions = { chart: { type: type as ApexChart["type"] } };

  if (type === "pie") {
    chartOptions = {
      chart: {
        type: "pie",
        height: 320,
        fontFamily: "Poppins, sans-serif",
        toolbar: { show: true },
      },
      colors: customColors,
      labels: categories,
      tooltip: {
        style: {
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Poppins, sans-serif",
        fontSize: "14px",
        horizontalAlign: "center",
      }
    };
  } else if (type === "bar" || type === "line") {
    chartOptions = {
      chart: {
        type,
        fontFamily: "Poppins, sans-serif",
        toolbar: { show: true },
      },
      plotOptions: {
        bar: {
          distributed: type === "bar",
        },
      },
      colors: colorByTitle[title] ?? customColors,
      xaxis: {
        categories,
        labels: {
          style: {
            fontFamily: "Poppins, sans-serif",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: "Poppins, sans-serif",
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        style: {
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
        },
      },
    };
  }

  if (type === "wordcloud") {
    return (
      <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col h-[350px]">
        <h2 className="text-lg font-semibold font-montserrat text-gray-800 mb-3">{title}</h2>
        <WordCloudSafe data={data as any} />
      </div>
    );
  }  
  

  if (type === "boxplot") {
    const agrupado: { [key: string]: number[] } = {};
    data.forEach(({ name, qtd }) => {
      if (!name || qtd === undefined || isNaN(qtd)) return;
      if (!agrupado[name]) agrupado[name] = [];
      agrupado[name].push(qtd);
    });

    const chartSeries = Object.entries(agrupado)
      .filter(([, valores]) => valores.length >= 2)
      .map(([name, valores]) => {
        const sorted = [...valores].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q2 = sorted[Math.floor(sorted.length * 0.5)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const min = sorted[0];
        const max = sorted[sorted.length - 1];

        return {
          x: name,
          y: [min, q1, q2, q3, max],
        };
      });

    const chartOptions: ApexOptions = {
      chart: {
        type: "boxPlot",
        fontFamily: "Poppins, sans-serif",
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: "#00bfa5",
            lower: "#ff6f61",
          },
        },
      },
      xaxis: {
        type: "category",
        labels: {
          style: {
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
      yaxis: {
        title: {
          text: "Tempo (horas)",
        },
        labels: {
          style: {
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
      tooltip: {
        style: {
          fontFamily: "Poppins, sans-serif",
        },
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
          return `
            <div style="padding:8px">
              <strong>${w.globals.initialSeries[seriesIndex].data[dataPointIndex].x}</strong><br/>
              Mínimo: ${data[0]}<br/>
              1º Quartil: ${data[1]}<br/>
              Mediana: ${data[2]}<br/>
              3º Quartil: ${data[3]}<br/>
              Máximo: ${data[4]}
            </div>
          `;
        }
      },
    };

    return (
      <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col h-[350px]">
        <h2 className="text-lg font-semibold font-montserrat text-gray-800 mb-3">{title}</h2>
        <ReactApexChart
          options={chartOptions}
          series={[{ name: "Tempo por Categoria", data: chartSeries }]}
          type="boxPlot"
          height={300}
        />
      </div>
    );
  }

  if (type === "heatmap") {
    const chartSeries = data
      .filter((item) => item.qtd !== undefined && !isNaN(item.qtd) && item.qtd >= 0)
      .map((item, i) => ({
        name: item.name || `Par ${i + 1}`,
        data: [{ x: "Similaridade", y: item.qtd }],
      }));

    const chartOptions: ApexOptions = {
      chart: {
        type: "heatmap",
        fontFamily: "Poppins, sans-serif",
        toolbar: { show: false },
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#0070f3", "#00bfa5", "#ffb400", "#ff6f61", "#7f00ff"],
      xaxis: {
        labels: {
          style: {
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: "Poppins, sans-serif",
            fontSize: "10px",
          },
        },
      },
      tooltip: {
        style: {
          fontFamily: "Poppins, sans-serif",
        },
      },
    };

    return (
      <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col h-[350px]">
        <h2 className="text-lg font-semibold font-montserrat text-gray-800 mb-3">{title}</h2>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="heatmap"
          height={300}
        />
      </div>
    );
  }

  // Gráficos padrão com ApexChart
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col h-[350px]">
      <h2 className="text-lg font-semibold font-montserrat text-gray-800 mb-3">{title}</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type={type}
        height={250}
      />
    </div>
  );
};

export default ChartCard;

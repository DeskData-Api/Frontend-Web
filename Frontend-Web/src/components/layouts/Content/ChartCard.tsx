import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import WordCloudSafe from "./WordCloudSafe";

interface ChartCardProps {
  title: string;
  type: "bar" | "line" | "pie" | "wordcloud" | "boxplot" | "heatmap";
  data: { name?: string; categoria?: string; qtd: number }[];
}

const ChartCard: React.FC<ChartCardProps> = ({ title, type, data }) => {
  const categories = data.map((d, i) => d.name ?? d.categoria ?? `Item ${i + 1}`);
  const values = data.map((d) => Number(d.qtd ?? 0));

  const chartSeries =
    type === "pie"
      ? values
      : [{ name: title, data: values }];

  let chartOptions: ApexOptions = { chart: { type } };

  if (type === "pie") {
    chartOptions = {
      chart: {
        type: "pie",
        fontFamily: "Poppins, sans-serif",
        toolbar: { show: true },
      },
      labels: categories,
      tooltip: {
        style: {
          fontFamily: "Poppins, sans-serif",
          fontSize: "13px",
        },
      },
    };
  } else if (type === "bar" || type === "line") {
    chartOptions = {
      chart: {
        type,
        fontFamily: "Poppins, sans-serif",
        toolbar: { show: true },
      },
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
      <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col">
        <h2 className="text-lg font-semibold font-montserrat text-gray-800 mb-3">{title}</h2>
        <WordCloudSafe data={data as any} />
      </div>
    );
  }

  // Gráficos padrão com ApexChart
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col">
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

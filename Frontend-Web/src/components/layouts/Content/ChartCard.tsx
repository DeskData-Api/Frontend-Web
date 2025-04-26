import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartCardProps {
  title: string;
  type: "bar" | "line" | "pie";
  data: any;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, type, data }) => {
  const chartOptions = {
    chart: { type },
    xaxis: type !== "pie" ? { categories: data.map((d: any) => d.name || d.categoria) } : {},
    labels: type === "pie" ? data.map((d: any) => d.categoria) : [],
  };

  const chartSeries = type === "pie"
    ? data.map((d: any) => d.qtd)
    : [{ name: title, data: data.map((d: any) => d.qtd) }];

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <ReactApexChart options={chartOptions} series={chartSeries} type={type} height={250} />
    </div>
  );
};

export default ChartCard;

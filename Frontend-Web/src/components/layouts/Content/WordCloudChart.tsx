import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

interface Props {
  title: string;
  words: string[];
}

const WordCloudChart: React.FC<Props> = ({ title, words }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!words?.length) return;

    const width = 400;
    const height = 250;

    cloud<cloud.Word>()
      .size([width, height])
      .words(words.map((w) => ({ text: w, size: 10 + Math.random() * 20 })))
      .padding(3)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font("Montserrat, sans-serif")
      .fontSize((d) => d.size as number)
      .on("end", draw)
      .start();

    function draw(layoutWords: cloud.Word[]) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // limpa

      svg
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "rgb(243, 244, 246)") // bg-gray-100
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .selectAll("text")
        .data(layoutWords)
        .enter()
        .append("text")
        .style("font-family", "Montserrat, sans-serif")
        .style("font-size", (d) => `${d.size}px`)
        .style("fill", (_, i) => d3.schemeCategory10[i % 10])
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text((d) => d.text as string);
    }
  }, [words]);

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col h-[350px]">
      <h2 className="text-lg font-semibold font-montserrat text-gray-800 mb-3">
        {title}
      </h2>
      <svg ref={svgRef} />
    </div>
  );
};

export default WordCloudChart;
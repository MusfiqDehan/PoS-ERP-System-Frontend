"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const VendorPlanChart: React.FC = () => {
  const options: ApexOptions = {
    chart: { height: 240, type: "donut", toolbar: { show: false } },
    // labels order: Enterprise / Premium / Basic
    colors: ["#7364c2", "#4687f4", "#0ac79e"],
    series: [20, 60, 20],
    labels: ["Enterprise", "Premium", "Basic"],
    plotOptions: {
      pie: { donut: { size: "60%", labels: { show: false } } },
    },
    stroke: {
      lineCap: "round",
      show: true,
      width: 3,
      colors: ["#fff"],
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { height: 180 }, legend: { position: "bottom" } },
      },
    ],
  };

  return (
    <ApexChart
      options={options}
      series={options.series as number[]}
      type="donut"
      height={240}
    />
  );
};

export default VendorPlanChart;

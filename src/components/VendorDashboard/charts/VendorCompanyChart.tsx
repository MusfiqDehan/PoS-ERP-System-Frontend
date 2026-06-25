"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const VendorCompanyChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      height: 240,
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#4687f4"],
    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusWhenStacked: "all",
        horizontal: false,
        columnWidth: "50%",
        colors: {
          backgroundBarColors: ["#eaf1fe"],
          backgroundBarOpacity: 0.6,
        },
      },
    },
    series: [{ name: "Company", data: [40, 60, 20, 80, 60, 60, 60] }],
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      labels: { style: { colors: "#667085", fontSize: "13px" } },
    },
    yaxis: { labels: { offsetX: -15, show: false } },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      padding: { left: -8 },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
  };

  return (
    <ApexChart options={options} series={options.series} type="bar" height={240} />
  );
};

export default VendorCompanyChart;

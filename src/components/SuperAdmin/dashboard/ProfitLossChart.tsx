"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenue = [200, 185, 160, 210, 195, 55, 60, 170, 205, 0, 0, 0];
const expense = [95, 65, 60, 20, 55, 130, 140, 95, 95, 0, 0, 0];
const profit = [60, 95, 110, 140, 90, 0, 0, 60, 115, 0, 0, 0];
const loss = [0, 0, 0, 0, 0, 25, 15, 0, 0, 0, 0, 0];

const pills = [
  { label: "Avg Monthly Profit", value: "$103,449", border: "#089b7c", bg: "#f1fcf5", color: "#089b7c" },
  { label: "Best Month (Apr)", value: "$188,700", border: "#237e46", bg: "#f1fcf5", color: "#237e46" },
  { label: "Worst Month (Jun)", value: "$23,449", border: "#e84245", bg: "#fff0f0", color: "#e84245" },
];

const legend = [
  { label: "Revenue", color: "#c0dbfd" },
  { label: "Expense", color: "#ffc7c7" },
  { label: "Profit", color: "#089b7c" },
  { label: "Loss", color: "#c80000" },
];

export default function ProfitLossChart() {
  const options: ApexOptions = {
    chart: { type: "bar", height: 300, toolbar: { show: false }, fontFamily: "inherit" },
    colors: ["#c0dbfd", "#ffc7c7", "#089b7c", "#c80000"],
    plotOptions: {
      bar: { borderRadius: 3, borderRadiusApplication: "end", columnWidth: "48%" },
    },
    series: [
      { name: "Revenue", data: revenue },
      { name: "Expense", data: expense },
      { name: "Profit", data: profit },
      { name: "Loss", data: loss },
    ],
    xaxis: {
      categories: months,
      labels: { style: { colors: "#666", fontSize: "13px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 240,
      tickAmount: 6,
      labels: { style: { colors: "#666", fontSize: "13px" }, formatter: (val) => `${val}K` },
    },
    grid: { borderColor: "#f0f0f0", strokeDashArray: 0, padding: { left: 0 } },
    legend: { show: false },
    dataLabels: { enabled: false },
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
    tooltip: { y: { formatter: (val) => `$${val}K` } },
    fill: { opacity: 1 },
  };

  return (
    <div className="card flex-fill mb-0" style={{ borderColor: "#f1f1f1", borderRadius: 8 }}>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h5 className="mb-0 fw-semibold" style={{ color: "#333", fontSize: 18 }}>
            Profit &amp; Loss Overview
          </h5>
          <button
            type="button"
            className="d-inline-flex align-items-center gap-2 bg-white rounded"
            style={{ border: "1px solid #e7e7e7", padding: "6px 12px", fontSize: 14, color: "#666" }}
          >
            <i className="ti ti-calendar" /> This Year <i className="ti ti-chevron-down" />
          </button>
        </div>

        <div className="d-flex align-items-center flex-wrap mb-2" style={{ gap: 24 }}>
          {pills.map((pill) => (
            <div
              key={pill.label}
              className="d-flex align-items-center"
              style={{ gap: 8, borderLeft: `2px solid ${pill.border}`, paddingLeft: 8, paddingBlock: 6 }}
            >
              <span className="fw-semibold" style={{ color: "#333", fontSize: 16 }}>
                {pill.label}
              </span>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded"
                style={{
                  background: pill.bg,
                  color: pill.color,
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "4px 8px",
                  minWidth: 64,
                }}
              >
                {pill.value}
              </span>
            </div>
          ))}
        </div>

        <ApexChart options={options} series={options.series} type="bar" height={300} />

        <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
          {legend.map((item) => (
            <span
              key={item.label}
              className="d-inline-flex align-items-center gap-1"
              style={{ color: "#666", fontSize: 16 }}
            >
              <span
                style={{ width: 12, height: 12, borderRadius: "50%", background: item.color, display: "inline-block" }}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const legend = [
  { label: "Present", value: "89", color: "#237e46" },
  { label: "Absent", value: "11", color: "#e84245" },
  { label: "Late", value: "05", color: "#e5950d" },
  { label: "Leave", value: "11", color: "#4687f4" },
];

export default function OverallAttendance() {
  const options: ApexOptions = {
    chart: { type: "donut", fontFamily: "inherit" },
    labels: ["Present", "Absent", "Leave", "Late"],
    colors: ["#237e46", "#e84245", "#4687f4", "#e5950d"],
    series: [89, 11, 11, 5],
    stroke: { width: 4, colors: ["#fff"] },
    plotOptions: { pie: { donut: { size: "68%" } } },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val) => `${val}` } },
  };

  return (
    <div className="card flex-fill mb-0" style={{ borderColor: "#f1f1f1", borderRadius: 8 }}>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
          <h5 className="mb-0 fw-semibold" style={{ color: "#333", fontSize: 18 }}>
            Overall Attendance
          </h5>
          <button
            type="button"
            className="d-inline-flex align-items-center gap-2 bg-white rounded"
            style={{ border: "1px solid #e7e7e7", padding: "6px 12px", fontSize: 14, color: "#666" }}
          >
            <i className="ti ti-building-store" /> All <i className="ti ti-chevron-down" />
          </button>
        </div>

        <div
          className="d-flex align-items-center gap-2 mb-3"
          style={{ borderLeft: "2px solid #089b7c", paddingLeft: 8 }}
        >
          <span className="fw-semibold" style={{ color: "#333", fontSize: 16 }}>
            Total Employee
          </span>
          <span
            className="rounded fw-semibold"
            style={{ background: "#e7e7e7", color: "#333", fontSize: 16, padding: "4px 12px" }}
          >
            100
          </span>
        </div>

        <ApexChart options={options} series={options.series} type="donut" height={260} />

        <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 mt-3">
          {legend.map((item) => (
            <span
              key={item.label}
              className="d-inline-flex align-items-center gap-2"
              style={{ color: "#666", fontSize: 16 }}
            >
              <span
                style={{ width: 12, height: 12, borderRadius: 2, background: item.color, display: "inline-block" }}
              />
              {item.label}
              <span
                className="rounded fw-semibold"
                style={{ background: "#f1f1f1", color: "#333", fontSize: 14, padding: "2px 8px" }}
              >
                {item.value}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

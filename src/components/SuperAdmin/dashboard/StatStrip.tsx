"use client";

import { ReactNode } from "react";

type Stat = {
  value: string;
  label: string;
  iconBg: string;
  icon: string;
  footer: ReactNode;
};

const stats: Stat[] = [
  {
    value: "$204,300",
    label: "Gross Profit",
    iconBg: "#089b7c",
    icon: "ti ti-chart-histogram",
    footer: (
      <>
        <span style={{ color: "#237e46" }}>+2.4% </span>
        <span style={{ color: "#666" }}>vs Last Week</span>
      </>
    ),
  },
  {
    value: "18.7%",
    label: "Avg Gross Margin",
    iconBg: "#347928",
    icon: "ti ti-percentage",
    footer: (
      <>
        <span style={{ color: "#237e46" }}>+0.6% </span>
        <span style={{ color: "#666" }}>vs Last Week</span>
      </>
    ),
  },
  {
    value: "$382,400",
    label: "Cash In Tills",
    iconBg: "#b13bff",
    icon: "ti ti-cash-banknote",
    footer: <span style={{ color: "#666" }}>Across 14 Open Shifts</span>,
  },
  {
    value: "$10.23M",
    label: "Stock Value",
    iconBg: "#f5845f",
    icon: "ti ti-building-warehouse",
    footer: <span style={{ color: "#666" }}>Across all 8 stores</span>,
  },
];

export default function StatStrip() {
  return (
    <div className="card mb-3" style={{ borderColor: "#f1f1f1", borderRadius: 8 }}>
      <div className="card-body">
        <div className="row g-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`col-sm-6 col-xl-3 px-3 ${
                index < stats.length - 1 ? "border-end" : ""
              }`}
            >
              <div className="d-flex align-items-start justify-content-between pb-2 mb-2 border-bottom">
                <div>
                  <h4 className="mb-1 fw-semibold" style={{ color: "#333", fontSize: 20 }}>
                    {stat.value}
                  </h4>
                  <p className="mb-0" style={{ color: "#666", fontSize: 16, fontWeight: 500 }}>
                    {stat.label}
                  </p>
                </div>
                <span
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 36, height: 36, borderRadius: 3, background: stat.iconBg }}
                >
                  <i className={stat.icon} style={{ color: "#fff", fontSize: 18 }} />
                </span>
              </div>
              <p className="mb-0" style={{ fontSize: 14, fontWeight: 500 }}>
                {stat.footer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

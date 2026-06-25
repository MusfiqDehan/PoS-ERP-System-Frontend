"use client";

import { CSSProperties, useState } from "react";
import Link from "next/link";

type Achievement = {
  fraction: number;
  barColor: string;
  text: string;
  textColor: string;
};

type BranchRow = {
  sn: number;
  branch: string;
  code: string;
  city: string;
  sales: string;
  target: string;
  achievement: Achievement;
  margin: string;
  txns: string;
  basket: string;
  stock: string;
  status: "Open" | "Close";
  alerts: string;
};

const SALES_BG = "#e7fbf7";

const rows: BranchRow[] = [
  { sn: 1, branch: "Mirpur-12", code: "DHK-01", city: "Dhaka", sales: "$221,840", target: "220.0k", achievement: { fraction: 1, barColor: "#089b7c", text: "+0.8%", textColor: "#666" }, margin: "21.4%", txns: "388", basket: "$572", stock: "5.21M", status: "Open", alerts: "2 Alters" },
  { sn: 2, branch: "Mirpur-10", code: "DHK-02", city: "Dhaka", sales: "$184,250", target: "200.0k", achievement: { fraction: 0.9, barColor: "#e5950d", text: "-7.9%", textColor: "#e5950d" }, margin: "18.2%", txns: "412", basket: "$447", stock: "4.82M", status: "Open", alerts: "2 Alters" },
  { sn: 3, branch: "Uttara-07", code: "DHK-04", city: "Dhaka", sales: "$162,110", target: "180.0k", achievement: { fraction: 0.83, barColor: "#e5950d", text: "-9.9%", textColor: "#e5950d" }, margin: "21.4%", txns: "351", basket: "$462", stock: "4.11M", status: "Open", alerts: "2 Alters" },
  { sn: 4, branch: "Dhanmondi", code: "DHK-05", city: "Dhaka", sales: "$141,060", target: "150.0k", achievement: { fraction: 0.93, barColor: "#e5950d", text: "-6.0%", textColor: "#e5950d" }, margin: "21.4%", txns: "309", basket: "$456", stock: "3.92M", status: "Open", alerts: "2 Alters" },
  { sn: 5, branch: "Shaheb Bazar", code: "RAJ-01", city: "Rajshahi", sales: "$119,720", target: "130.0k", achievement: { fraction: 0.9, barColor: "#e5950d", text: "-7.9%", textColor: "#e5950d" }, margin: "21.4%", txns: "282", basket: "$424", stock: "3.64M", status: "Open", alerts: "2 Alters" },
  { sn: 6, branch: "Mirpur-2", code: "DHK-03", city: "Dhaka", sales: "$94,420", target: "160.0k", achievement: { fraction: 0.21, barColor: "#e84245", text: "-38.5%", textColor: "#e84245" }, margin: "17.1%", txns: "224", basket: "$439", stock: "3.38M", status: "Open", alerts: "2 Alters" },
  { sn: 7, branch: "Agrabad", code: "CTG-01", city: "Chittagong", sales: "$98,420", target: "100.0k", achievement: { fraction: 0.69, barColor: "#e5950d", text: "-11.1%", textColor: "#e5950d" }, margin: "21.4%", txns: "198", basket: "$449", stock: "2.71M", status: "Open", alerts: "2 Alters" },
  { sn: 8, branch: "Sonadanga", code: "KHU-01", city: "Khulna", sales: "$76,210", target: "90.0k", achievement: { fraction: 0.66, barColor: "#e84245", text: "-15.3%", textColor: "#e84245" }, margin: "21.4%", txns: "174", basket: "$438", stock: "2.44M", status: "Close", alerts: "2 Alters" },
];

type FilterKey = "Sales" | "Target" | "Margin" | "Stock";

const filters: FilterKey[] = ["Sales", "Target", "Margin", "Stock"];

export default function BranchPerformance() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("Sales");

  const activeCellStyle: CSSProperties = {
    background: SALES_BG,
    color: "#089b7c",
    fontWeight: 500,
  };

  return (
    <div className="card mb-3" style={{ borderColor: "#f1f1f1", borderRadius: 8 }}>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h5 className="mb-0 fw-semibold" style={{ color: "#333", fontSize: 18 }}>
            Branch Performance
          </h5>
          <div className="d-flex align-items-center gap-1">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className="rounded"
                style={
                  filter === activeFilter
                    ? { background: SALES_BG, color: "#089b7c", border: "1px solid transparent", padding: "9px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease" }
                    : { background: "#fff", color: "#666", border: "1px solid #e7e7e7", padding: "9px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease" }
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ minWidth: 1000 }}>
            <thead>
              <tr style={{ borderTop: "1px solid #089b7c", borderBottom: "1px solid #089b7c" }}>
                <th style={thStyle}>SN</th>
                <th style={thStyle}>Branch</th>
                <th style={thStyle}>City</th>
                <th style={activeFilter === "Sales" ? { ...thStyle, background: SALES_BG } : thStyle}>Sales Today</th>
                <th style={activeFilter === "Target" ? { ...thStyle, background: SALES_BG } : thStyle}>Target</th>
                <th style={thStyle}>Achievement</th>
                <th style={activeFilter === "Margin" ? { ...thStyle, background: SALES_BG } : thStyle}>Margin</th>
                <th style={thStyle}>Txns</th>
                <th style={thStyle}>Basket</th>
                <th style={activeFilter === "Stock" ? { ...thStyle, background: SALES_BG } : thStyle}>Stock Value</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.code} style={{ borderBottom: "1px solid #e7e7e7" }}>
                  <td style={{ ...tdStyle, color: "#666" }}>{row.sn}.</td>
                  <td style={tdStyle}>
                    <div className="fw-semibold" style={{ color: "#333" }}>{row.branch}</div>
                    <div style={{ color: "#646b72", fontSize: 12 }}>{row.code}</div>
                  </td>
                  <td style={{ ...tdStyle, color: "#666" }}>{row.city}</td>
                  <td style={activeFilter === "Sales" ? { ...tdStyle, ...activeCellStyle } : { ...tdStyle, color: "#666" }}>
                    {row.sales}
                  </td>
                  <td style={activeFilter === "Target" ? { ...tdStyle, ...activeCellStyle } : { ...tdStyle, color: "#666" }}>{row.target}</td>
                  <td style={tdStyle}>
                    <div className="d-flex align-items-center gap-2">
                      <span
                        style={{
                          display: "inline-block",
                          position: "relative",
                          width: 70,
                          height: 4,
                          borderRadius: 1,
                          background: row.achievement.fraction >= 1 ? SALES_BG : "#e7e7e7",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: 4,
                            borderRadius: 1,
                            width: `${Math.min(row.achievement.fraction, 1) * 70}px`,
                            background: row.achievement.barColor,
                          }}
                        />
                      </span>
                      <span style={{ color: row.achievement.textColor, fontSize: 13, fontWeight: 500 }}>
                        {row.achievement.text}
                      </span>
                    </div>
                  </td>
                  <td style={activeFilter === "Margin" ? { ...tdStyle, ...activeCellStyle } : { ...tdStyle, color: "#666" }}>{row.margin}</td>
                  <td style={{ ...tdStyle, color: "#666" }}>{row.txns}</td>
                  <td style={{ ...tdStyle, color: "#666" }}>{row.basket}</td>
                  <td style={activeFilter === "Stock" ? { ...tdStyle, ...activeCellStyle } : { ...tdStyle, color: "#666" }}>{row.stock}</td>
                  <td style={tdStyle}>
                    <span style={{ color: "#666" }}>{row.status}</span>
                    <span className="ms-2" style={{ color: "#c80303" }}>{row.alerts}</span>
                  </td>
                  <td style={tdStyle}>
                    <Link href="#" className="d-inline-flex align-items-center gap-1" style={{ color: "#089b7c" }}>
                      View <i className="ti ti-arrow-right" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle: CSSProperties = {
  color: "#333",
  fontSize: 15,
  fontWeight: 600,
  borderBottom: "none",
  whiteSpace: "nowrap",
  padding: "10px 12px",
  transition: "background-color 0.3s ease, color 0.3s ease",
};

const tdStyle: CSSProperties = {
  fontSize: 14,
  borderBottom: "none",
  whiteSpace: "nowrap",
  padding: "12px",
  transition: "background-color 0.3s ease, color 0.3s ease",
};

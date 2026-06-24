"use client";

import { CSSProperties } from "react";
import Link from "next/link";

type Trend = "up" | "flat" | "down";

type AttendanceRow = {
  sn: number;
  branch: string;
  code: string;
  city: string;
  total: string;
  present: string;
  absent: string;
  late: string;
  leave: string;
  trend: Trend;
  trendText: string;
};

const rows: AttendanceRow[] = [
  { sn: 1, branch: "Mirpur-12", code: "DHK-01", city: "Dhaka", total: "16", present: "94%", absent: "6%", late: "12%", leave: "7%", trend: "up", trendText: "+1% vs Last Month" },
  { sn: 2, branch: "Mirpur-10", code: "DHK-02", city: "Dhaka", total: "14", present: "100%", absent: "0%", late: "0%", leave: "0%", trend: "flat", trendText: "0% vs Last Month" },
  { sn: 3, branch: "Uttara-07", code: "DHK-04", city: "Dhaka", total: "14", present: "71%", absent: "29%", late: "0%", leave: "29%", trend: "down", trendText: "-1% vs Last Month" },
  { sn: 4, branch: "Dhanmondi", code: "DHK-05", city: "Dhaka", total: "15", present: "94%", absent: "6%", late: "13%", leave: "7%", trend: "up", trendText: "+1% vs Last Month" },
  { sn: 5, branch: "Shaheb Bazar", code: "RAJ-01", city: "Rajshahi", total: "12", present: "99%", absent: "0%", late: "1%", leave: "0%", trend: "up", trendText: "+1% vs Last Month" },
  { sn: 6, branch: "Mirpur-2", code: "DHK-03", city: "Dhaka", total: "10", present: "90%", absent: "10%", late: "0%", leave: "10%", trend: "flat", trendText: "0% vs Last Month" },
  { sn: 7, branch: "Agrabad", code: "CTG-01", city: "Chittagong", total: "10", present: "100%", absent: "0%", late: "10%", leave: "0%", trend: "up", trendText: "+1% vs Last Month" },
  { sn: 8, branch: "Sonadanga", code: "KHU-01", city: "Khulna", total: "09", present: "55%", absent: "45%", late: "0%", leave: "44%", trend: "down", trendText: "-1% vs Last Month" },
];

const trendConfig: Record<Trend, { icon: string; color: string }> = {
  up: { icon: "ti ti-arrow-up", color: "#237e46" },
  flat: { icon: "ti ti-minus", color: "#666" },
  down: { icon: "ti ti-arrow-down", color: "#e84245" },
};

export default function BranchAttendance() {
  return (
    <div className="card flex-fill mb-0" style={{ borderColor: "#f1f1f1", borderRadius: 8 }}>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h5 className="mb-0 fw-semibold" style={{ color: "#333", fontSize: 18 }}>
            Branch Attendance Summary
          </h5>
          <button
            type="button"
            className="d-inline-flex align-items-center gap-2 bg-white rounded"
            style={{ border: "1px solid #e7e7e7", padding: "6px 12px", fontSize: 14, color: "#666" }}
          >
            <i className="ti ti-calendar" /> Monthly <i className="ti ti-chevron-down" />
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ minWidth: 700 }}>
            <thead>
              <tr style={{ borderTop: "1px solid #089b7c", borderBottom: "1px solid #089b7c" }}>
                <th style={thStyle}>SN</th>
                <th style={thStyle}>Branch</th>
                <th style={thStyle}>City</th>
                <th style={thStyle}>Total staff</th>
                <th style={thStyle}>Present</th>
                <th style={thStyle}>Absent</th>
                <th style={thStyle}>Late</th>
                <th style={thStyle}>Leave</th>
                <th style={thStyle}>Percentage</th>
                <th style={thStyle} />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const trend = trendConfig[row.trend];
                return (
                  <tr key={row.code} style={{ borderBottom: "1px solid #e7e7e7" }}>
                    <td style={{ ...tdStyle, color: "#666" }}>{row.sn}.</td>
                    <td style={tdStyle}>
                      <div className="fw-semibold" style={{ color: "#333" }}>{row.branch}</div>
                      <div style={{ color: "#646b72", fontSize: 12 }}>{row.code}</div>
                    </td>
                    <td style={{ ...tdStyle, color: "#666" }}>{row.city}</td>
                    <td style={{ ...tdStyle, color: "#666", fontWeight: 600 }}>{row.total}</td>
                    <td style={{ ...tdStyle, color: "#237e46", fontWeight: 600 }}>{row.present}</td>
                    <td style={{ ...tdStyle, color: "#e84245", fontWeight: 600 }}>{row.absent}</td>
                    <td style={{ ...tdStyle, color: "#e5950d", fontWeight: 600 }}>{row.late}</td>
                    <td style={{ ...tdStyle, color: "#4687f4", fontWeight: 600 }}>{row.leave}</td>
                    <td style={tdStyle}>
                      <span className="d-inline-flex align-items-center gap-1" style={{ color: trend.color, fontSize: 12 }}>
                        <i className={trend.icon} /> {row.trendText}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <Link href="#" style={{ color: "#089b7c" }}>
                        <i className="ti ti-arrow-right" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
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
};

const tdStyle: CSSProperties = {
  fontSize: 14,
  borderBottom: "none",
  whiteSpace: "nowrap",
  padding: "12px",
};

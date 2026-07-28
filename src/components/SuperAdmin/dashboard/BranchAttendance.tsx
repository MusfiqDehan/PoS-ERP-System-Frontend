"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { fetchBranches, type Branch } from "@/lib/branches";
import { getAccessToken, isPlatformSession } from "@/lib/auth-session";

/* ------------------------------------------------------------------ */
/*  No backend attendance API exists yet — attendance columns show 0.    */
/* ------------------------------------------------------------------ */

export default function BranchAttendance() {
  const token = getAccessToken();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBranches = useCallback(async () => {
    if (!token || isPlatformSession()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { ok, body } = await fetchBranches(token);
    if (ok && body.success && body.data) {
      setBranches(body.data);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    void loadBranches();
  }, [loadBranches]);

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
              {loading ? (
                <tr>
                  <td colSpan={10} style={{ ...tdStyle, textAlign: "center", color: "#999", padding: "32px 12px" }}>
                    Loading branches...
                  </td>
                </tr>
              ) : branches.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ ...tdStyle, textAlign: "center", color: "#999", padding: "32px 12px" }}>
                    No branches found.
                  </td>
                </tr>
              ) : (
                branches.map((branch, idx) => {
                  const sn = idx + 1;
                  return (
                    <tr key={branch.id} style={{ borderBottom: "1px solid #e7e7e7" }}>
                      <td style={{ ...tdStyle, color: "#666" }}>{sn}.</td>
                      <td style={tdStyle}>
                        <div className="fw-semibold" style={{ color: "#333" }}>{branch.name}</div>
                        <div style={{ color: "#646b72", fontSize: 12 }}>{branch.code}</div>
                      </td>
                      <td style={{ ...tdStyle, color: "#666" }}>{branch.city || "---"}</td>
                      <td style={{ ...tdStyle, color: "#666", fontWeight: 600 }}>0</td>
                      <td style={{ ...tdStyle, color: "#237e46", fontWeight: 600 }}>0</td>
                      <td style={{ ...tdStyle, color: "#e84245", fontWeight: 600 }}>0</td>
                      <td style={{ ...tdStyle, color: "#e5950d", fontWeight: 600 }}>0</td>
                      <td style={{ ...tdStyle, color: "#4687f4", fontWeight: 600 }}>0</td>
                      <td style={tdStyle}>
                        <span className="d-inline-flex align-items-center gap-1" style={{ color: "#666", fontSize: 12 }}>
                          <i className="ti ti-minus" /> 0
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <Link href="#" style={{ color: "#089b7c" }}>
                          <i className="ti ti-arrow-right" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
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

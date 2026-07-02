"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { fetchBranches, type Branch } from "@/lib/branches";
import { getAccessToken } from "@/lib/auth-session";
import { useActiveBranch } from "@/providers/branch-provider";

type FilterKey = "Sales" | "Target" | "Margin" | "Stock";

const filters: FilterKey[] = ["Sales", "Target", "Margin", "Stock"];
const SALES_BG = "#e7fbf7";

/* ------------------------------------------------------------------ */
/*  Table styles (unchanged)                                            */
/* ------------------------------------------------------------------ */

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

const activeCellStyle: CSSProperties = {
  background: SALES_BG,
  color: "#089b7c",
  fontWeight: 500,
};

/* ================================================================== */
/*  NO-BACKEND COLUMNS (shown as 0)                                     */
/*                                                                      */
/*  The following columns have no backend API yet:                      */
/*    - Sales Today — no GET endpoint for branch-level daily sales      */
/*    - Target     — no branch target model/field/endpoint              */
/*    - Margin     — no branch margin calculation endpoint              */
/*    - Txns       — no transaction count per branch endpoint           */
/*    - Basket     — no average basket size endpoint                    */
/*    - Stock Value — no branch-level stock valuation endpoint          */
/*                                                                      */
/*  Achievement is Sales / Target so it's 0 when both are 0.            */
/* ================================================================== */

function statusLabel(b: Branch): string {
  if (b.status === "closed") return "Close";
  if (b.status === "maintenance" || b.status === "opening_soon") return "Close";
  return b.is_active ? "Open" : "Close";
}

export default function BranchPerformance() {
  const token = getAccessToken();
  const router = useRouter();
  const { setActiveBranchId } = useActiveBranch();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("Sales");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBranches = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const { ok, body } = await fetchBranches(token);
    if (ok && body.success && body.data) {
      setBranches(body.data);
    }
    setLoading(false);
  }, [token]);

  const handleViewBranch = (branchId: string) => {
    setActiveBranchId(branchId);
    router.push("/admin-dashboard");
  };

  useEffect(() => {
    void loadBranches();
  }, [loadBranches]);

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
              {loading ? (
                <tr>
                  <td colSpan={12} style={{ ...tdStyle, textAlign: "center", color: "#999", padding: "32px 12px" }}>
                    Loading branches...
                  </td>
                </tr>
              ) : branches.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ ...tdStyle, textAlign: "center", color: "#999", padding: "32px 12px" }}>
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
                      <td style={activeFilter === "Sales" ? { ...tdStyle, ...activeCellStyle } : { ...tdStyle, color: "#666" }}>
                        0
                      </td>
                      <td style={activeFilter === "Target" ? { ...tdStyle, ...activeCellStyle } : { ...tdStyle, color: "#666" }}>0</td>
                      <td style={tdStyle}>
                        <div className="d-flex align-items-center gap-2">
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: 70,
                              height: 4,
                              borderRadius: 1,
                              background: "#e7e7e7",
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
                                width: 0,
                                background: "#e7e7e7",
                              }}
                            />
                          </span>
                          <span style={{ color: "#666", fontSize: 13, fontWeight: 500 }}>0</span>
                        </div>
                      </td>
                      <td style={activeFilter === "Margin" ? { ...tdStyle, ...activeCellStyle } : { ...tdStyle, color: "#666" }}>0</td>
                      <td style={{ ...tdStyle, color: "#666" }}>0</td>
                      <td style={{ ...tdStyle, color: "#666" }}>0</td>
                      <td style={activeFilter === "Stock" ? { ...tdStyle, ...activeCellStyle } : { ...tdStyle, color: "#666" }}>0</td>
                      <td style={tdStyle}>
                        <span style={{ color: "#666" }}>{statusLabel(branch)}</span>
                        <span className="ms-2" style={{ color: "#c80303" }}>---</span>
                      </td>
                      <td style={tdStyle}>
                        <button
                          type="button"
                          onClick={() => handleViewBranch(branch.id)}
                          className="d-inline-flex align-items-center gap-1 border-0 bg-transparent p-0"
                          style={{ color: "#089b7c", cursor: "pointer" }}
                        >
                          View <i className="ti ti-arrow-right" />
                        </button>
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

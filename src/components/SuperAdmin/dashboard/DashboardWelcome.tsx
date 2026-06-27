"use client";

export default function DashboardWelcome() {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
      <div>
        <h2 className="mb-1 text-[24px] font-bold" style={{ color: "#212B36" }}>
          Welcome Jamiuddin Saif
        </h2>
        <p className="mb-0" style={{ color: "#666", fontSize: 12, fontWeight: 500 }}>
          Let&apos;s see what&apos;s happening across your business.
        </p>
      </div>
      <div
        className="dropdown"
        title="Filter by period"
      >
        <button
          type="button"
          className="d-inline-flex align-items-center gap-2 bg-white rounded"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            border: "1px solid #e7e7e7",
            padding: "10px 12px",
            boxShadow: "0px 4px 30px rgba(231,231,231,0.48)",
          }}
        >
          <i className="ti ti-calendar" style={{ color: "#333", fontSize: 16 }} />
          <span style={{ color: "#333", fontSize: 14, fontWeight: 500 }}>Today</span>
          <i className="ti ti-chevron-down" style={{ color: "#333", fontSize: 14 }} />
        </button>
        <ul className="dropdown-menu dropdown-menu-end p-2">
          <li>
            <button className="dropdown-item rounded-1" type="button">Today</button>
          </li>
          <li>
            <button className="dropdown-item rounded-1" type="button">This Week</button>
          </li>
          <li>
            <button className="dropdown-item rounded-1" type="button">This Month</button>
          </li>
          <li>
            <button className="dropdown-item rounded-1" type="button">This Year</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

"use client";

import DashboardDateRange from "./DashboardDateRange";
import CollapesIcon from "@/core/common/tooltip-content/collapes";

export default function PageHeader() {
  return (
    <div className="d-lg-flex align-items-center justify-content-between mb-4">
      <div>
        <h2 className="mb-1 text-[24px] font-bold whitespace-nowrap">Welcome, Admin</h2>
        <p className="mb-0">
          You have <span className="text-primary fw-bold">200+</span>{" "}
          Orders, Today
        </p>
      </div>
      <ul className="table-top-head">
        <li>
          <DashboardDateRange />
        </li>
        <CollapesIcon />
      </ul>
    </div>
  );
}

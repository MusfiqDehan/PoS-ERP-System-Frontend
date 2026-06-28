"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import DashboardDateRange from "./DashboardDateRange";
import CollapesIcon from "@/core/common/tooltip-content/collapes";

export default function PageHeader() {
  const { user, loading } = useCurrentUser();

  const displayName = loading
    ? "Loading…"
    : user?.full_name || "User";

  return (
    <div className="d-lg-flex align-items-center justify-content-between mb-4">
      <div>
        <h2 className="mb-1 text-[24px] font-bold whitespace-nowrap">
          Welcome, {displayName.split(" ")[0]}
        </h2>
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

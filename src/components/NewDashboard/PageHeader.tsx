"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useActiveBranch } from "@/providers/branch-provider";
import DashboardDateRange from "./DashboardDateRange";
import CollapesIcon from "@/core/common/tooltip-content/collapes";

export default function PageHeader() {
  const { user, loading } = useCurrentUser();
  const { activeBranch } = useActiveBranch();

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
          <span className="fw-semibold">
            {activeBranch?.name ?? "All Branches"}
          </span>
          {activeBranch && ""}
          <span className="text-muted ms-1">
            — more metrics loading soon
          </span>
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

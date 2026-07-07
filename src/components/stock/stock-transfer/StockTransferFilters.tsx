"use client";

import Link from "next/link";
import type { BranchOption } from "@/hooks/stock/useStockTransfers";

type Props = {
  branches: BranchOption[];
  filterBranch: string;
  setFilterBranch: (v: string) => void;
};

export default function StockTransferFilters({
  branches,
  filterBranch,
  setFilterBranch,
}: Props) {
  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
      <div className="search-set" />
      <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
        <div className="dropdown me-2">
          <Link
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            {filterBranch
              ? (branches.find((b) => b.value === filterBranch)?.label ?? "Branch")
              : "All Branches"}
          </Link>
          <ul className="dropdown-menu dropdown-menu-end p-3">
            <li>
              <button
                type="button"
                className="dropdown-item rounded-1"
                onClick={() => setFilterBranch("")}
              >
                All Branches
              </button>
            </li>
            {branches.map((b) => (
              <li key={b.value}>
                <button
                  type="button"
                  className={`dropdown-item rounded-1 ${filterBranch === b.value ? "active" : ""}`}
                  onClick={() => setFilterBranch(b.value)}
                >
                  {b.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

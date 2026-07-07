"use client";

import Link from "next/link";
import type { BranchOption } from "@/hooks/sales/usePosOrders";
import type { PosOrderFiltersState } from "@/hooks/sales/usePosOrders";

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

type Props = {
  branches: BranchOption[];
  filters: PosOrderFiltersState;
  onFilterChange: (filters: PosOrderFiltersState) => void;
};

export default function PosOrderFilters({
  branches,
  filters,
  onFilterChange,
}: Props) {
  const selectedBranch = branches.find((branch) => branch.value === filters.branch);
  const selectedStatus = STATUS_OPTIONS.find((option) => option.value === (filters.status ?? ""));

  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
      <div className="search-set" />
      <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
        {branches.length > 0 && (
          <div className="dropdown me-2">
            <Link
              href="#"
              className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              {selectedBranch?.label ?? "Branch"}
            </Link>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li>
                <Link
                  href="#"
                  className="dropdown-item rounded-1"
                  onClick={(event) => {
                    event.preventDefault();
                    onFilterChange({ ...filters, branch: undefined });
                  }}
                >
                  All Branches
                </Link>
              </li>
              {branches.map((branch) => (
                <li key={branch.value}>
                  <Link
                    href="#"
                    className="dropdown-item rounded-1"
                    onClick={(event) => {
                      event.preventDefault();
                      onFilterChange({ ...filters, branch: branch.value });
                    }}
                  >
                    {branch.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="dropdown me-2">
          <Link
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            {selectedStatus?.label ?? "Status"}
          </Link>
          <ul className="dropdown-menu dropdown-menu-end p-3">
            {STATUS_OPTIONS.map((option) => (
              <li key={option.value || "all"}>
                <Link
                  href="#"
                  className="dropdown-item rounded-1"
                  onClick={(event) => {
                    event.preventDefault();
                    onFilterChange({
                      ...filters,
                      status: option.value || undefined,
                    });
                  }}
                >
                  {option.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="me-2">
          <input
            type="date"
            className="form-control form-control-sm"
            value={filters.from ?? ""}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                from: event.target.value || undefined,
              })
            }
            aria-label="From date"
          />
        </div>
        <div>
          <input
            type="date"
            className="form-control form-control-sm"
            value={filters.to ?? ""}
            onChange={(event) =>
              onFilterChange({
                ...filters,
                to: event.target.value || undefined,
              })
            }
            aria-label="To date"
          />
        </div>
      </div>
    </div>
  );
}

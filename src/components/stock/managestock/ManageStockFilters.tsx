"use client";

import Link from "next/link";
import type { BranchOption, WarehouseOption } from "@/hooks/stock/useManageStocks";

type Props = {
  branches: BranchOption[];
  warehouses: WarehouseOption[];
  filterBranch: string;
  setFilterBranch: (v: string) => void;
  filterWarehouse: string;
  setFilterWarehouse: (v: string) => void;
};

export default function ManageStockFilters({
  branches, warehouses, filterBranch, setFilterBranch, filterWarehouse, setFilterWarehouse,
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
            {filterBranch ? branches.find((b) => b.value === filterBranch)?.label ?? "Branch" : "Branch"}
          </Link>
          <ul className="dropdown-menu dropdown-menu-end p-3">
            <li>
              <button className="dropdown-item rounded-1" onClick={() => setFilterBranch("")}>All Branches</button>
            </li>
            {branches.map((b) => (
              <li key={b.value}>
                <button className={`dropdown-item rounded-1 ${filterBranch === b.value ? "active" : ""}`} onClick={() => setFilterBranch(b.value)}>
                  {b.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown me-2">
          <Link
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            {filterWarehouse ? warehouses.find((w) => w.value === filterWarehouse)?.label ?? "Warehouse" : "Warehouse"}
          </Link>
          <ul className="dropdown-menu dropdown-menu-end p-3">
            <li>
              <button className="dropdown-item rounded-1" onClick={() => setFilterWarehouse("")}>All Warehouses</button>
            </li>
            {warehouses.map((w) => (
              <li key={w.value}>
                <button className={`dropdown-item rounded-1 ${filterWarehouse === w.value ? "active" : ""}`} onClick={() => setFilterWarehouse(w.value)}>
                  {w.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

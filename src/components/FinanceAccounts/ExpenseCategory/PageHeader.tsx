"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Link from "next/link";
import { PlusCircle } from "react-feather";

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>Expense Category</h4>
          <h6>Manage your expense categories</h6>
        </div>
      </div>
      <ul className="table-top-head">
        <TooltipIcons />
        <RefreshIcon />
        <CollapesIcon />
      </ul>
      <div className="page-btn">
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#add-units"
          className="btn btn-primary"
        >
          <PlusCircle size={14} data-feather="plus-circle" className=" me-2" />
          Add Expense Category
        </Link>
      </div>
    </div>
  );
}

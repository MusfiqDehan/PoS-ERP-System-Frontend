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
          <h4 className="fw-bold">Money Transfer</h4>
          <h6>Manage Money Transfer List</h6>
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
          className="btn btn-primary text-white"
          data-bs-toggle="modal"
          data-bs-target="#add-units"
        >
          <PlusCircle size={14} className="me-2" />
          Add Money Transfer
        </Link>
      </div>
    </div>
  );
}

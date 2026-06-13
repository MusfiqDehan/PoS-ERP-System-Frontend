"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Link from "next/link";

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>Discount</h4>
          <h6>Manage Your discount</h6>
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
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#add-units"
        >
          <i className="ti ti-circle-plus me-1"></i>
          Add Discount
        </Link>
      </div>
    </div>
  );
}

"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Link from "next/link";
import { Download } from "react-feather";

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>Stock Transfer</h4>
          <h6>Manage your stock transfer</h6>
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
          Add New
        </Link>
      </div>
      <div className="page-btn import d-none" title="Import not available yet">
        <Link
          href="#"
          className="btn btn-secondary color disabled"
          aria-disabled
          tabIndex={-1}
        >
          <Download className="me-2" />
          Import Transfer
        </Link>
      </div>
    </div>
  );
}

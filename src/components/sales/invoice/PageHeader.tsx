"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>Invoices </h4>
          <h6>Manage your stock invoices</h6>
        </div>
      </div>
      <ul className="table-top-head">
        <TooltipIcons />
        <RefreshIcon />
        <CollapesIcon />
      </ul>
    </div>
  );
}

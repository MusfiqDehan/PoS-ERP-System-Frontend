"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4 className="fw-bold">Print QR Code</h4>
          <h6>Manage your QR code</h6>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <ul className="table-top-head">
          <RefreshIcon />
          <CollapesIcon />
        </ul>
      </div>
    </div>
  );
}

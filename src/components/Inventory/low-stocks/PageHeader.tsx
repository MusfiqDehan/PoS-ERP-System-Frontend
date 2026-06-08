"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Link from "next/link";

export default function PageHeader() {
  return (
          <div className="page-header">
            <div className="page-title me-auto">
              <h4 className="fw-bold">Low Stocks</h4>
              <h6>Manage your low stocks</h6>
            </div>
            <ul className="table-top-head low-stock-top-head">
              <TooltipIcons />
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <Link
                  href="#"
                  className="btn btn-secondary w-auto shadow-none"
                  data-bs-toggle="modal"
                  data-bs-target="#send-email"
                >
                  <i data-feather="mail" className="feather-mail me-1" />
                  Send Email
                </Link>
              </li>
            </ul>
          </div>
  );
}

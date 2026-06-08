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
                            <h4 className="fw-bold">Contacts</h4>
                            <h6>Manage your contacts</h6>
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
                            data-bs-target="#add-contact"
                        >
                            <i className="ti ti-circle-plus me-1" />
                            Add Contact
                        </Link>
                    </div>
                </div>
  );
}

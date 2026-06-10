"use client";

import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import Link from "next/link";
import { PlusCircle } from "react-feather";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  addLabel: string;
  addModalTarget: string;
  showTooltipIcons?: boolean;
  usePlusCircleIcon?: boolean;
};

export default function PageHeader({
  title,
  subtitle,
  addLabel,
  addModalTarget,
  showTooltipIcons = true,
  usePlusCircleIcon = false,
}: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4 className="fw-bold">{title}</h4>
          <h6>{subtitle}</h6>
        </div>
      </div>
      <ul className="table-top-head">
        {showTooltipIcons && <TooltipIcons />}
        <RefreshIcon />
        <CollapesIcon />
      </ul>
      <div className="page-btn">
        <Link
          href="#"
          className="btn btn-primary text-white"
          data-bs-toggle="modal"
          data-bs-target={addModalTarget}
        >
          {usePlusCircleIcon ? (
            <PlusCircle size={14} className="me-2" />
          ) : (
            <i className="ti ti-circle-plus me-1"></i>
          )}
          {addLabel}
        </Link>
      </div>
    </div>
  );
}

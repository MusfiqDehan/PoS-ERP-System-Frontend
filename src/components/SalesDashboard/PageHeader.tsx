"use client";
/* eslint-disable @next/next/no-img-element */
import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import RefreshIcon from "@/core/common/tooltip-content/refresh";

export default function PageHeader() {
  return (
<div className="welcome d-lg-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center welcome-text">
            <h3 className="d-flex align-items-center">
              <img src="assets/img/icons/hi.svg" alt="img" />
              &nbsp;Hi John Smilga,
            </h3>
            &nbsp;
            <h6>here&apos;s what&apos;s happening with your store today.</h6>
          </div>
          <div className="d-flex align-items-center">
            <div className="input-icon-start position-relative me-2">
              <span className="input-icon-addon fs-16 text-gray-9">
                <i className="ti ti-calendar" />
              </span>
              <PredefinedDateRanges />
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
            </ul>
          </div>
        </div>
  );
}

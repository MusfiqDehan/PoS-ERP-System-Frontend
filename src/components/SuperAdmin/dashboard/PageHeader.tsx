"use client";
/* eslint-disable @next/next/no-img-element */
import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import CollapesIcon from "@/core/common/tooltip-content/collapes";

export default function PageHeader() {
  return (
<div className="d-lg-flex align-items-center justify-content-between mb-4">
          <div>
            <h2 className="mb-1 custome-heading">Welcome, Admin</h2>
            <p>
              You have <span className="text-primary fw-bold">200+</span>{" "}
              Orders, Today
            </p>
          </div>
          <ul className="table-top-head">
            <li>
              <div className="input-icon-start position-relative">
                <span className="input-icon-addon fs-16 text-gray-9">
                  <i className="ti ti-calendar" />
                </span>
                <PredefinedDateRanges />
              </div>
            </li>
            <CollapesIcon />
          </ul>
        </div>
  );
}

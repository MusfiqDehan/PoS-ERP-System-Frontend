"use client";
/* eslint-disable @next/next/no-img-element */
import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";

export default function PageHeader() {
  return (
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
          <div className="mb-3">
            <h1 className="mb-1 custome-heading">Welcome, Admin</h1>
            <p className="fw-medium">
              You have <span className="text-primary fw-bold">200+</span>{" "}
              Orders, Today
            </p>
          </div>
          <div className="input-icon-start position-relative mb-3">
            <span className="input-icon-addon fs-16 text-gray-9">
              <i className="ti ti-calendar" />
            </span>
            <PredefinedDateRanges />
          </div>
        </div>
  );
}

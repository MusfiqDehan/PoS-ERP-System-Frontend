"use client";

import Link from "next/link";
import Select from "react-select";
import { posCustomerOptions } from "./posOrderData";

type PosCustomerSectionProps = {
  showAlert: boolean;
  onDismissAlert: () => void;
};

export default function PosCustomerSection({
  showAlert,
  onDismissAlert,
}: PosCustomerSectionProps) {
  return (
    <div className="customer-info block-section">
      <h5 className="mb-2">Customer Information</h5>
      <div className="d-flex align-items-center gap-2">
        <div className="flex-grow-1">
          <Select
            options={posCustomerOptions}
            classNamePrefix="react-select select"
            placeholder="Choose a Name"
            defaultValue={posCustomerOptions[0]}
          />
        </div>
        <Link
          href="#"
          className="btn btn-teal btn-icon fs-20"
          data-bs-toggle="modal"
          data-bs-target="#create"
        >
          <i className="ti ti-user-plus" />
        </Link>
        <Link
          href="#"
          className="btn btn-info btn-icon fs-20"
          data-bs-toggle="modal"
          data-bs-target="#barcode"
        >
          <i className="ti ti-scan" />
        </Link>
      </div>
      {showAlert && (
        <div className="customer-item border border-orange bg-orange-100 d-flex align-items-center justify-content-between flex-wrap gap-2 mt-3">
          <div>
            <h6 className="fs-16 fw-bold mb-1">James Anderson</h6>
            <div className="d-inline-flex align-items-center gap-2 customer-bonus">
              <p className="fs-13 d-inline-flex align-items-center gap-1">
                Bonus :
                <span className="badge bg-cyan fs-13 fw-bold p-1">148</span>
              </p>
              <p className="fs-13 d-inline-flex align-items-center gap-1">
                Loyality :
                <span className="badge bg-teal fs-13 fw-bold p-1">$20</span>
              </p>
            </div>
          </div>
          <Link href="#" className="btn btn-orange btn-sm">
            Apply
          </Link>
          <Link href="#" className="close-icon" onClick={onDismissAlert}>
            <i className="ti ti-x" />
          </Link>
        </div>
      )}
    </div>
  );
}

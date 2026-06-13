"use client";
/* eslint-disable @next/next/no-img-element */

import { Eye } from "react-feather";
import Link from "next/link";
import type { QuotationRecord } from "./types";

type QuotationRowCellProps = {
  record: QuotationRecord;
};

export function QuotationProductCell({ record }: QuotationRowCellProps) {
  return (
    <div className="d-flex align-items-center me-2">
      <Link href="#" className="avatar avatar-md me-2">
        <img src={record.Product_image} alt="product" />
      </Link>
      <Link href="#">{record.Product_Name}</Link>
    </div>
  );
}

export function QuotationCustomerCell({ record }: QuotationRowCellProps) {
  return (
    <div className="d-flex align-items-center me-2">
      <Link href="#" className="avatar avatar-md me-2">
        <img src={record.Custmer_Image} alt="product" />
      </Link>
      <Link href="#">{record.Custmer_Name}</Link>
    </div>
  );
}

export function QuotationStatusCell({ status }: { status: string }) {
  return (
    <div>
      <span
        className={`badge  ${status === "Sent" ? "badge-success" : status === "Ordered" ? "badge-warning" : "badge-cyan"}`}
      >
        {status}
      </span>
    </div>
  );
}

export function QuotationActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link className="me-2 p-2" href="#">
          <Eye className="feather-view" />
        </Link>
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-units"
        >
          <i data-feather="edit" className="feather-edit"></i>
        </Link>
        <Link
          className="confirm-text p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
        >
          <i data-feather="trash-2" className="feather-trash-2"></i>
        </Link>
      </div>
    </div>
  );
}

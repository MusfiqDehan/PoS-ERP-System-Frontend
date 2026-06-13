"use client";
/* eslint-disable @next/next/no-img-element */

import { all_routes } from "@/data/all_routes";
import { Eye, Trash2 } from "react-feather";
import Link from "next/link";
import type { InvoiceRecord } from "./types";

const route = all_routes;

type InvoiceRowCellProps = {
  record: InvoiceRecord;
};

export function InvoiceNoCell({ record }: InvoiceRowCellProps) {
  return <Link href={route.invoicedetails}>{record.invoiceno}</Link>;
}

export function InvoiceCustomerCell({ record }: InvoiceRowCellProps) {
  return (
    <div className="d-flex align-items-center">
      <Link href="#" className="avatar avatar-md">
        <img src={`assets/img/users/${record.image}`} alt="product" />
      </Link>
      <Link href="#" className="ms-2">
        {record.customer}
      </Link>
    </div>
  );
}

export function InvoiceStatusCell({ status }: { status: string }) {
  return (
    <div>
      {status === "Paid" && (
        <span className="badge badge-soft-success badge-xs shadow-none">
          <i className="ti ti-point-filled me-1"></i>
          {status}
        </span>
      )}
      {status === "Unpaid" && (
        <span className="badge badge-soft-danger badge-xs shadow-none">
          <i className="ti ti-point-filled me-1"></i>
          {status}
        </span>
      )}
      {status === "Overdue" && (
        <span className="badge badge-soft-warning badge-xs shadow-none">
          <i className="ti ti-point-filled me-1"></i>
          {status}
        </span>
      )}
    </div>
  );
}

export function InvoiceActionsCell() {
  return (
    <div className="edit-delete-action d-flex align-items-center justify-content-center">
      <Link
        className="me-2 p-2 d-flex align-items-center justify-content-between border rounded"
        href={route.invoicedetails}
      >
        <Eye className="feather-eye" />
      </Link>
      <Link
        className="p-2 d-flex align-items-center justify-content-between border rounded"
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#delete-modal"
      >
        <Trash2 className="feather-trash-2" />
      </Link>
    </div>
  );
}

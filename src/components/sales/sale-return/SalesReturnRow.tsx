"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { SalesReturnRecord } from "./types";

type SalesReturnRowCellProps = {
  record: SalesReturnRecord;
};

export function SalesReturnProductCell({ record }: SalesReturnRowCellProps) {
  return (
    <div className="productimgname">
      <Link href="#" className="product-img" />
      <img alt="img" src={record.img} />
      <Link href="#" className="ms-2">
        {record.productname}
      </Link>
    </div>
  );
}

export function SalesReturnCustomerCell({ record }: SalesReturnRowCellProps) {
  return (
    <div className="d-flex align-items-center">
      <Link href="#" className="avatar avatar-md me-2">
        <img src={record.customer_image} alt="product" />
      </Link>
      <a href="#">{record.customer}</a>
    </div>
  );
}

export function SalesReturnStatusCell({ status }: { status: string }) {
  return (
    <div>
      {status === "Received" && (
        <span className="badge badge-success shadow-none">{status}</span>
      )}
      {status === "Pending" && (
        <span className="badge badge-cyan shadow-none">{status}</span>
      )}
      {status === "Ordered" && (
        <span className="badges bg-lightyellow">{status}</span>
      )}
    </div>
  );
}

export function SalesReturnPaymentStatusCell({
  paymentstatus,
}: {
  paymentstatus: string;
}) {
  return (
    <div>
      {paymentstatus === "Paid" && (
        <span className="badge badge-soft-success badge-xs shadow-none">
          <i className="ti ti-point-filled me2"></i>
          {paymentstatus}
        </span>
      )}
      {paymentstatus === "Unpaid" && (
        <span className="badge badge-soft-danger badge-xs shadow-none">
          <i className="ti ti-point-filled me2"></i>
          {paymentstatus}
        </span>
      )}
      {paymentstatus === "Partial" && (
        <span className="badge badge-soft-warning badge-xs shadow-none">
          <i className="ti ti-point-filled me2"></i>
          {paymentstatus}
        </span>
      )}
    </div>
  );
}

export function SalesReturnActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-sales-new"
        >
          <i data-feather="edit" className="feather-edit"></i>
        </Link>
        <Link className="confirm-text p-2" href="#">
          <i
            data-feather="trash-2"
            className="feather-trash-2"
            data-bs-toggle="modal"
            data-bs-target="#delete-modal"
          ></i>
        </Link>
      </div>
    </div>
  );
}

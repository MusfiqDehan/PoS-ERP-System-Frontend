"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export function PurchaseReturnImageCell({ img }: { img: string }) {
  return (
    <Link href="#" className="avatar avatar-md me-2">
      <img src={img} alt="product" />
    </Link>
  );
}

export function PurchaseReturnStatusCell({ status }: { status: string }) {
  return (
    <span
      className={`badges status-badge fs-10 p-1 px-2 rounded-1 ${
        status === "Pending"
          ? "badge-pending"
          : status === "Pending"
            ? "bg-warning"
            : ""
      }`}
    >
      {status}
    </span>
  );
}

export function PurchaseReturnPaymentStatusCell({ status }: { status: string }) {
  return (
    <span
      className={`p-1 pe-2 rounded-1  fs-10 ${
        status === "Paid"
          ? "text-success bg-success-transparent"
          : status === "Overdue"
            ? "text-warning bg-warning-transparent "
            : "text-danger bg-danger-transparent "
      }`}
    >
      <i className="ti ti-point-filled me-1 fs-11"> </i> {status}
    </span>
  );
}

export function PurchaseReturnActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          href="#"
          className="me-2 p-2"
          data-bs-toggle="modal"
          data-bs-target="#edit-sales-new"
        >
          <i data-feather="edit" className="feather-edit"></i>
        </Link>
        <Link
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          className="p-2"
          href="#"
        >
          <i data-feather="trash-2" className="feather-trash-2"></i>
        </Link>
      </div>
    </div>
  );
}

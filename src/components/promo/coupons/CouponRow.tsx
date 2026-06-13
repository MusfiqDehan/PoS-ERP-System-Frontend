"use client";

import Link from "next/link";

export function CouponCodeCell({ code }: { code: string }) {
  return <span className="badge purple-badge">{code}</span>;
}

export function CouponStatusCell({ status }: { status: string }) {
  return (
    <span
      className={`badge table-badge ${status === "Active" ? "bg-success" : "bg-danger"} fw-medium fs-10`}
    >
      {status}
    </span>
  );
}

export function CouponActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-units"
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

"use client";

import Link from "next/link";

export function DiscountStatusCell({ status }: { status: string }) {
  return (
    <span
      className={`badge table-badge ${
        status === "Active"
          ? "bg-success"
          : status === "Redeemed"
            ? "bg-pink"
            : status === "Expired"
              ? "bg-light"
              : "bg-danger"
      } fw-medium fs-10`}
    >
      {status}
    </span>
  );
}

export function DiscountActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-units"
        >
          <i data-feather="edit" className="feather-edit" />
        </Link>
        <Link
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          className="p-2"
          href="#"
        >
          <i data-feather="trash-2" className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
}

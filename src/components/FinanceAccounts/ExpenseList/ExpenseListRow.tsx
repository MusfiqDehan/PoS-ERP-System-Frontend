"use client";

import Link from "next/link";

export function ExpenseListStatusCell({ status }: { status: string }) {
  return (
    <span
      className={`badges status-badge fs-10 p-1 px-2 rounded-1 ${
        status === "Approved" ? "" : "badge-pending"
      }`}
    >
      {status}
    </span>
  );
}

export function ExpenseListActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link className="me-2 p-2 mb-0" href="#">
          <i data-feather="eye" className="feather-eye"></i>
        </Link>
        <Link
          href="#"
          className="me-2 p-2 mb-0"
          data-bs-toggle="modal"
          data-bs-target="#edit-units"
        >
          <i data-feather="edit" className="feather-edit"></i>
        </Link>
        <Link
          className="me-3 confirm-text p-2 mb-0"
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

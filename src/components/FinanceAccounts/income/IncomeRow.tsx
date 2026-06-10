"use client";

import Link from "next/link";

export function IncomeActionsCell() {
  return (
    <div className="edit-delete-action">
      <Link
        href="#"
        className="me-2 p-2 mb-0"
        data-bs-toggle="modal"
        data-bs-target="#edit-units"
      >
        <i data-feather="edit" className="feather-edit" />
      </Link>
      <Link
        data-bs-toggle="modal"
        data-bs-target="#delete-modal"
        className="me-0 p-2 mb-0"
        href="#"
      >
        <i data-feather="trash-2" className="feather-trash-2" />
      </Link>
    </div>
  );
}

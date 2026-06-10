"use client";

import Link from "next/link";

export function ExpenseCategoryStatusCell() {
  return (
    <span className="badge  badge-success d-inline-flex align-items-center badge-xs">
      <i className="ti ti-point-filled me-1" />
      Active
    </span>
  );
}

export function ExpenseCategoryActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          href="#"
          className="me-2 p-2 mb-0"
          data-bs-toggle="modal"
          data-bs-target="#edit-units"
        >
          <i data-feather="edit" className="feather-edit"></i>
        </Link>
        <Link
          href="#"
          className="me-0 confirm-text p-2 mb-0"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
        >
          <i data-feather="trash-2" className="feather-trash-2"></i>
        </Link>
      </div>
    </div>
  );
}

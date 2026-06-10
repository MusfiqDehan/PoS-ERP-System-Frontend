"use client";

import Link from "next/link";

export function AccountListStatusCell({ status }: { status: string }) {
  return (
    <div>
      {status === "Active" && (
        <span className="badge table-badge bg-success fw-medium fs-10">
          {status}
        </span>
      )}
      {status === "Closed" && (
        <span className="badge table-badge bg-danger fw-medium fs-10">
          {status}
        </span>
      )}
    </div>
  );
}

export function AccountTypeStatusCell({ status }: { status: string }) {
  return (
    <div>
      {status === "Active" && (
        <span className="badge table-badge bg-success fw-medium fs-10">
          {status}
        </span>
      )}
      {status === "Inactive" && (
        <span className="badge table-badge bg-danger fw-medium fs-10">
          {status}
        </span>
      )}
    </div>
  );
}

export function AccountActionsCell() {
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

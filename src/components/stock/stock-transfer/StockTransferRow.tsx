"use client";

import { Edit, Trash2 } from "react-feather";
import Link from "next/link";

export function StockTransferActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <div className="input-block add-lists"></div>
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-units"
        >
          <Edit className="feather-edit" />
        </Link>
        <Link
          className="confirm-text p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
        >
          <Trash2 className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
}

"use client";

import { Edit, Trash2 } from "react-feather";
import Link from "next/link";
import type { ManageStockRecord } from "./types";

type CellProps = {
  record: ManageStockRecord;
  onEdit?: (record: ManageStockRecord) => void;
  onDelete?: (record: ManageStockRecord) => void;
};

export function ManageStockProductCell({ record }: CellProps) {
  return (
    <span className="userimgname">
      <Link href="#">{record.product_name ?? record.product}</Link>
    </span>
  );
}

export function ManageStockActionsCell({ record, onEdit, onDelete }: CellProps) {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-units"
          onClick={() => onEdit?.(record)}
        >
          <Edit className="feather-edit" />
        </Link>
        <Link
          className="confirm-text p-2"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          href="#"
          onClick={() => onDelete?.(record)}
        >
          <Trash2 className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
}

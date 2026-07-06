"use client";

import Link from "next/link";
import { FileText } from "react-feather";
import type { StockAdjustmentRecord } from "./types";

type CellProps = {
  record: StockAdjustmentRecord;
  onViewNotes?: (record: StockAdjustmentRecord) => void;
};

export function StockAdjustmentProductCell({ record }: CellProps) {
  return (
    <span className="userimgname">
      <Link href="#">{record.product_name ?? record.product}</Link>
    </span>
  );
}

export function StockAdjustmentPersonCell({ record }: CellProps) {
  return (
    <span>{record.responsible_person_name ?? record.responsible_person ?? "—"}</span>
  );
}

export function StockAdjustmentActionsCell({ record, onViewNotes }: CellProps) {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          className="me-2 p-2"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onViewNotes?.(record);
          }}
        >
          <FileText className="feather-file-text" />
        </Link>
      </div>
    </div>
  );
}

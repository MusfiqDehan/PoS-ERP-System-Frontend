"use client";

import {
  ManageStockPersonCell,
  ManageStockProductCell,
} from "@/components/stock/managestock/ManageStockRow";
import type { ManageStockRecord } from "@/components/stock/managestock/types";
import { Edit, FileText, Trash2 } from "react-feather";
import Link from "next/link";

type StockAdjustmentRowCellProps = {
  record: ManageStockRecord;
};

export function StockAdjustmentProductCell({
  record,
}: StockAdjustmentRowCellProps) {
  return <ManageStockProductCell record={record} />;
}

export function StockAdjustmentPersonCell({
  record,
}: StockAdjustmentRowCellProps) {
  return <ManageStockPersonCell record={record} />;
}

export function StockAdjustmentActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <div className="input-block add-lists"></div>
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#view-notes"
        >
          <FileText className="feather-file-text" />
        </Link>
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

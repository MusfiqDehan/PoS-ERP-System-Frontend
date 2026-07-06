"use client";

import { Edit } from "react-feather";
import Link from "next/link";
import type { StockTransferRecord } from "./types";

type Props = {
  record: StockTransferRecord;
  onView: (record: StockTransferRecord) => void;
};

export function StockTransferActionsCell({ record, onView }: Props) {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          className="me-2 p-2"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onView(record);
          }}
        >
          <Edit className="feather-edit" />
        </Link>
      </div>
    </div>
  );
}

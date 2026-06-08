"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ExpiredProductRecord } from "./types";

type ExpiredProductRowCellProps = {
  record: ExpiredProductRecord;
};

export function ExpiredProductNameCell({ record }: ExpiredProductRowCellProps) {
  return (
    <span className="productimgname">
      <Link href="#" className="product-img stock-img">
        <img alt="" src={record.img} />
      </Link>
      {record.product}
    </span>
  );
}

export function ExpiredProductActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          data-bs-toggle="modal"
          data-bs-target="#add-units"
          className="me-2 p-2"
          href="#"
        >
          <i data-feather="edit" className="feather-edit"></i>
        </Link>
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          className="p-2"
        >
          <i data-feather="trash-2" className="feather-trash-2"></i>
        </Link>
      </div>
    </div>
  );
}

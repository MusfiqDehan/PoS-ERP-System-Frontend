"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { SubCategoryRecord } from "./types";

type SubCategoryRowCellProps = {
  record: SubCategoryRecord;
};

export function SubCategoryImageCell({ record }: SubCategoryRowCellProps) {
  return (
    <span className="productimgname">
      <Link href="#" className="product-img stock-img">
        <img alt="" src={record.img} />
      </Link>
    </span>
  );
}

export function SubCategoryStatusCell({ status }: { status: string }) {
  return <span className="badge bg-success fw-medium fs-10">{status}</span>;
}

export function SubCategoryActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-category"
        >
          <i data-feather="edit" className="feather-edit"></i>
        </Link>
        <Link
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          className="p-2"
          href="#"
        >
          <i data-feather="trash-2" className="feather-trash-2"></i>
        </Link>
      </div>
    </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

import { Edit, Trash2 } from "react-feather";
import Link from "next/link";
import type { ManageStockRecord } from "./types";

type ManageStockRowCellProps = {
  record: ManageStockRecord;
};

export function ManageStockProductCell({ record }: ManageStockRowCellProps) {
  return (
    <span className="userimgname">
      <Link href="#" className="product-img">
        <img alt="img" src={record.Product.Image} />
      </Link>
      <Link href="#">{record.Product.Name}</Link>
    </span>
  );
}

export function ManageStockPersonCell({ record }: ManageStockRowCellProps) {
  return (
    <span className="userimgname">
      <Link href="#" className="product-img">
        <img alt="img" src={record.Person.Image} />
      </Link>
      <Link href="#">{record.Person.Name}</Link>
    </span>
  );
}

export function ManageStockActionsCell() {
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
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          href="#"
        >
          <Trash2 className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
}

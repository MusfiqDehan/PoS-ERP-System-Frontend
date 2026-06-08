"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Edit, Eye, Trash2 } from "react-feather";
import { all_routes } from "@/data/all_routes";
import type { ProductListRecord } from "./types";

const route = all_routes;

type ProductListRowCellProps = {
  record: ProductListRecord;
};

/** Product name + thumbnail — one cell in the product list row. */
export function ProductListProductCell({ record }: ProductListRowCellProps) {
  return (
    <div className="d-flex align-items-center">
      <Link href="#" className="avatar avatar-md me-2">
        <img alt="" src={record.productImage} />
      </Link>
      <Link href="#">{record.product}</Link>
    </div>
  );
}

/** Creator avatar + name — one cell in the product list row. */
export function ProductListCreatedByCell({ record }: ProductListRowCellProps) {
  return (
    <span className="userimgname">
      <Link href="/profile" className="product-img">
        <img alt="" src={record.img} />
      </Link>
      <Link href="/profile">{record.createdby}</Link>
    </span>
  );
}

/** View / edit / delete actions — one cell in the product list row. */
export function ProductListActionsCell({ record }: ProductListRowCellProps) {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          className="me-2 p-2"
          href={route.productdetails}
          aria-label={`View ${record.product}`}
        >
          <Eye className="feather-view" />
        </Link>
        <Link
          className="me-2 p-2"
          href={route.editproduct}
          aria-label={`Edit ${record.product}`}
        >
          <Edit className="feather-edit" />
        </Link>
        <Link
          className="confirm-text p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          aria-label={`Delete ${record.product}`}
        >
          <Trash2 className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
}

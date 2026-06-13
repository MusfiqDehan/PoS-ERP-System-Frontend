"use client";
/* eslint-disable @next/next/no-img-element */

import type { GiftCardRecord } from "./types";
import Link from "next/link";

type GiftCardRowCellProps = {
  record: GiftCardRecord;
};

export function GiftCardCustomerCell({ record }: GiftCardRowCellProps) {
  return (
    <div className="userimgname">
      <span className="avatar avatar-md me-2">
        <Link href="#">
          <img src={`assets/img/users/${record.Image}`} alt="user" />
        </Link>
      </span>
      <Link href="#">{record.Customer}</Link>
    </div>
  );
}

export function GiftCardStatusCell({ status }: { status: string }) {
  return (
    <span
      className={`badge table-badge ${
        status === "Active"
          ? "bg-success"
          : status === "Redeemed"
            ? "bg-pink"
            : status === "Expired"
              ? "bg-light"
              : "bg-danger"
      } fw-medium fs-10`}
    >
      {status}
    </span>
  );
}

export function GiftCardActionsCell() {
  return (
    <div className="action-table-data">
      <div className="edit-delete-action">
        <Link
          data-bs-toggle="modal"
          data-bs-target="#gift-card-details"
          className="me-2 edit-icon  p-2"
          href="#"
        >
          <i data-feather="eye" className="feather-eye" />
        </Link>
        <Link
          className="me-2 p-2"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-units"
        >
          <i data-feather="edit" className="feather-edit" />
        </Link>
        <Link
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          className="p-2"
          href="#"
        >
          <i data-feather="trash-2" className="feather-trash-2" />
        </Link>
      </div>
    </div>
  );
}

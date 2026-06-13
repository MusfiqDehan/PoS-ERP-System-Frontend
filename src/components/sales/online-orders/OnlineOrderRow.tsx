"use client";
/* eslint-disable @next/next/no-img-element */

import {
  DollarSign,
  Download,
  Edit,
  Eye,
  PlusCircle,
  Trash2,
} from "react-feather";
import Link from "next/link";
import type { OnlineOrderRecord } from "./types";

type OnlineOrderRowCellProps = {
  record: OnlineOrderRecord;
};

export function OnlineOrderCustomerCell({ record }: OnlineOrderRowCellProps) {
  return (
    <div className="d-flex align-items-center">
      <Link href="#" className="avatar avatar-md">
        <img src={`assets/img/users/${record.image}`} alt="product" />
      </Link>
      <Link href="#">{record.customer}</Link>
    </div>
  );
}

export function OnlineOrderStatusCell({ status }: { status: string }) {
  return (
    <span
      className={`badge ${
        status === "Pending"
          ? "badge-cyan"
          : status === "Completed"
            ? "badge-success"
            : ""
      } `}
    >
      {status}
    </span>
  );
}

export function OnlineOrderPaymentStatusCell({
  paymentstatus,
}: {
  paymentstatus: string;
}) {
  return (
    <span
      className={`badge badge-xs shadow-none ${
        paymentstatus === "Unpaid"
          ? "badge-soft-danger"
          : paymentstatus === "Paid"
            ? "badge-soft-success"
            : "badge-soft-warning"
      } `}
    >
      <i className="ti ti-point-filled me-1"></i>
      {paymentstatus}
    </span>
  );
}

export function OnlineOrderActionsCell() {
  return (
    <>
      <Link
        className="action-set"
        href="#"
        data-bs-toggle="dropdown"
        aria-expanded="true"
      >
        <i className="fa fa-ellipsis-v" aria-hidden="true" />
      </Link>
      <ul className="dropdown-menu">
        <li>
          <Link
            href="#"
            className="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#sales-details-new"
          >
            <Eye className="info-img" />
            Sale Detail
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#edit-sales-new"
          >
            <Edit className="info-img" />
            Edit Sale
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#showpayment"
          >
            <DollarSign size={14} className="info-img" />
            Show Payments
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#createpayment"
          >
            <PlusCircle size={14} className="info-img" />
            Create Payment
          </Link>
        </li>
        <li>
          <Link href="#" className="dropdown-item">
            <Download className="info-img" />
            Download pdf
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="dropdown-item mb-0"
            data-bs-toggle="modal"
            data-bs-target="#delete-modal"
          >
            <Trash2 className="info-img" />
            Delete Sale
          </Link>
        </li>
      </ul>
    </>
  );
}

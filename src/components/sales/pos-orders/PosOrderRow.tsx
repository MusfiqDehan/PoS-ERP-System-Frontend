"use client";

import {
  DollarSign,
  Download,
  Edit,
  Eye,
  PlusCircle,
  Trash2,
} from "react-feather";
import Link from "next/link";
import type { PosOrderRecord } from "./types";

type PosOrderRowCellProps = {
  record: PosOrderRecord;
};

export function PosOrderCustomerCell({ record }: PosOrderRowCellProps) {
  return (
    <div className="d-flex align-items-center">
      <span className="avatar avatar-md bg-light d-flex align-items-center justify-content-center">
        <i className="ti ti-user text-[#646B72]" />
      </span>
      <Link href="#" className="ms-2">
        {record.customer}
      </Link>
    </div>
  );
}

export function PosOrderStatusCell({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  return (
    <span
      className={`badge ${
        normalized === "pending"
          ? "badge-cyan"
          : normalized === "completed"
            ? "badge-success"
            : normalized === "cancelled"
              ? "badge-danger"
              : ""
      }`}
    >
      {status}
    </span>
  );
}

export function PosOrderPaymentStatusCell({
  paymentstatus,
}: {
  paymentstatus: string;
}) {
  const normalized = paymentstatus.toLowerCase();
  return (
    <span
      className={`badge badge-xs shadow-none ${
        normalized === "unpaid"
          ? "badge-soft-danger"
          : normalized === "paid"
            ? "badge-soft-success"
            : "badge-soft-warning"
      }`}
    >
      <i className="ti ti-point-filled me-1" />
      {paymentstatus}
    </span>
  );
}

export function PosOrderActionsCell() {
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
          <Link href="#" className="dropdown-item">
            <Eye className="info-img" />
            Sale Detail
          </Link>
        </li>
        <li>
          <Link href="#" className="dropdown-item">
            <Edit className="info-img" />
            Edit Sale
          </Link>
        </li>
        <li>
          <Link href="#" className="dropdown-item">
            <DollarSign size={14} className="info-img" />
            Show Payments
          </Link>
        </li>
        <li>
          <Link href="#" className="dropdown-item">
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
          <Link href="#" className="dropdown-item mb-0">
            <Trash2 className="info-img" />
            Delete Sale
          </Link>
        </li>
      </ul>
    </>
  );
}

"use client";

import Link from "next/link";

export default function InvoiceActionButtons() {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4">
      <Link
        href="#"
        className="btn btn-primary d-flex justify-content-center align-items-center me-2"
      >
        <i className="ti ti-printer me-2" />
        Print Invoice
      </Link>
      <Link
        href="#"
        className="btn btn-secondary d-flex justify-content-center align-items-center border"
      >
        <i className="ti ti-copy me-2" />
        Clone Invoice
      </Link>
    </div>
  );
}

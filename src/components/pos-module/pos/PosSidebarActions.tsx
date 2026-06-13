"use client";

import Link from "next/link";

export default function PosSidebarActions() {
  return (
    <div className="btn-row d-flex align-items-center justify-content-between gap-3">
      <Link
        href="#"
        className="btn btn-white d-flex align-items-center justify-content-center flex-fill m-0"
        data-bs-toggle="modal"
        data-bs-target="#hold-order"
      >
        <i className="ti ti-printer me-2" />
        Print Order
      </Link>
      <Link
        href="#"
        className="btn btn-secondary d-flex align-items-center justify-content-center flex-fill m-0"
      >
        <i className="ti ti-shopping-cart me-2" />
        Place Order
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function CashFlowFilters() {
  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
      <div className="search-set"></div>
      <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
        <div className="dropdown">
          <Link
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Payment Method
          </Link>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Stripe
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Cash
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Paypal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

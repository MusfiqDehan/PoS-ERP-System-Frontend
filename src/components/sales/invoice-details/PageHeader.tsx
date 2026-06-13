"use client";
/* eslint-disable @next/next/no-img-element */

import { all_routes } from "@/data/all_routes";
import Link from "next/link";

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="add-item d-flex">
        <div className="page-title">
          <h4>Invoice Details</h4>
        </div>
      </div>
      <ul className="table-top-head">
        <li>
          <Link href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf">
            <img src="assets/img/icons/pdf.svg" alt="img" />
          </Link>
        </li>
        <li>
          <Link href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Print">
            <i data-feather="printer" className="feather-rotate-ccw" />
          </Link>
        </li>
        <li>
          <Link
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Collapse"
            id="collapse-header"
          >
            <i className="ti ti-chevron-up" />
          </Link>
        </li>
      </ul>
      <div className="page-btn">
        <Link href={all_routes.invoice} className="btn btn-primary">
          <i data-feather="arrow-left" className="me-2" />
          Back to Invoices
        </Link>
      </div>
    </div>
  );
}

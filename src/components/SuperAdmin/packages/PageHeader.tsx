"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function PageHeader() {
  return (
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="page-title">
                  <h4>Packages</h4>
                  <h6>Manage your packages</h6>
                </div>
              </div>
              <ul className="table-top-head">
                <li>
                  <Link href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf">
                    <img src="assets/img/icons/pdf.svg" alt="img" />
                  </Link>
                </li>
                <li>
                  <Link href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Excel">
                    <img src="assets/img/icons/excel.svg" alt="img" />
                  </Link>
                </li>
                <li>
                  <Link href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh">
                    <i data-feather="rotate-ccw" className="feather-rotate-ccw" />
                  </Link>
                </li>
                <li>
                  <Link href="#"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Collapse"
                    id="collapse-header"
                  >
                    <i data-feather="chevron-up" className="feather-chevron-up" />
                  </Link>
                </li>
              </ul>
              <div className="page-btn">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add_plans"
                  className="btn btn-primary"
                >
                  <i className='ti ti-circle-plus me-1'></i>
                  Add Packages
                </Link>
              </div>
            </div>
  );
}

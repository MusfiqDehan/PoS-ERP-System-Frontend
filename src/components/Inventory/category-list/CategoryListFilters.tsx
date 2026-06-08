"use client";

import Link from "next/link";

export default function CategoryListFilters() {
  return (
    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
      <div className="search-set"></div>
      <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
        <div className="dropdown me-2">
          <Link
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Status
          </Link>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Active
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Inactive
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <Link
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Sort By : Last 7 Days
          </Link>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Recently Added
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Ascending
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Desending
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Last Month
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Last 7 Days
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

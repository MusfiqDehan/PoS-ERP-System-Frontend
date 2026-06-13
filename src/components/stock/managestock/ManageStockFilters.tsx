"use client";

import Link from "next/link";

export default function ManageStockFilters() {
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
            Warehouse
          </Link>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Lavish Warehouse
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Quaint Warehouse{" "}
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Traditional Warehouse
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Cool Warehouse
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown me-2">
          <Link
            href="#"
            className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            Store
          </Link>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Electro Mart
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Quantum Gadgets
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Prime Bazaar
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Gadget World
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
            Product
          </Link>
          <ul className="dropdown-menu  dropdown-menu-end p-3">
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Lenovo IdeaPad 3
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Beats Pro{" "}
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Nike Jordan
              </Link>
            </li>
            <li>
              <Link href="#" className="dropdown-item rounded-1">
                Apple Series 5 Watch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

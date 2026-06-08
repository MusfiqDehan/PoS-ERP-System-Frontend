"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function LowStockAlert() {
  return (
        <div className="alert bg-orange-transparent alert-dismissible fade show mb-4">
          <div>
            <span>
              {" "}
              <i className="ti ti-info-circle fs-14 text-orange me-2" /> Your
              Product{" "}
            </span>
            <span className="text-orange fw-semibold">
              {" "}
              Apple Iphone 15 is running Low,{" "}
            </span>{" "}
            already below 5 Pcs.,
            <Link
              href="#"
              className="link-orange text-decoration-underline fw-semibold"
              data-bs-toggle="modal"
              data-bs-target="#add-stock"
            >
              Add Stock
            </Link>
          </div>
          <button
            type="button"
            className="btn-close text-gray-9 fs-14"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
  );
}

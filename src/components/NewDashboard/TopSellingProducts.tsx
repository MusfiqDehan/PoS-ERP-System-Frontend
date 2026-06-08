"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function TopSellingProducts() {
  return (
          <div className="col-xxl-4 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-pink fs-16 me-2">
                    <i className="ti ti-box" />
                  </span>
                  <h5 className="card-title mb-0">Top Selling Products</h5>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-sm btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-calendar me-1" />
                    Today
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link href="#" className="dropdown-item">
                        Today
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Weekly
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Monthly
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body sell-product">
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-01.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Charger Cable - Lighting</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$187</p>
                        <p>247+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-up-left me-1" />
                    25%
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-16.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Yves Saint Eau De Parfum</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$145</p>
                        <p>289+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-up-left me-1" />
                    25%
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-03.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Apple Airpods 2</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$458</p>
                        <p>300+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-up-left me-1" />
                    25%
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-04.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Vacuum Cleaner</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$139</p>
                        <p>225+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-danger badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-down-left me-1" />
                    21%
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-05.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Samsung Galaxy S21 Fe 5g</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>$898</p>
                        <p>365+ Sales</p>
                      </div>
                    </div>
                  </div>
                  <span className="badge bg-outline-success badge-xs d-inline-flex align-items-center">
                    <i className="ti ti-arrow-up-left me-1" />
                    25%
                  </span>
                </div>
              </div>
            </div>
          </div>
  );
}

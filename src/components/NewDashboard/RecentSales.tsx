"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function RecentSales() {
  return (
          <div className="col-xxl-4 col-md-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-pink fs-16 me-2">
                    <i className="ti ti-box" />
                  </span>
                  <h5 className="card-title mb-0">Recent Sales</h5>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-sm btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-calendar me-1" />
                    Weekly
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
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-11.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Apple Watch Series 9</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>Electronics</p>
                        <p className="text-gray-9">$640</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">Today</p>
                    <span className="badge bg-purple badge-xs d-inline-flex align-items-center">
                      <i className="ti ti-circle-filled fs-5 me-1" />
                      Processing
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-12.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Gold Bracelet</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>Fashion</p>
                        <p className="text-gray-9">$126</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">Today</p>
                    <span className="badge badge-danger badge-xs d-inline-flex align-items-center">
                      <i className="ti ti-circle-filled fs-5 me-1" />
                      Cancelled
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-13.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Parachute Down Duvet</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>Health</p>
                        <p className="text-gray-9">$69</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">15 Jan 2025</p>
                    <span className="badge badge-cyan badge-xs d-inline-flex align-items-center">
                      <i className="ti ti-circle-filled fs-5 me-1" />
                      Onhold
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-14.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">YETI Rambler Tumbler</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>Sports</p>
                        <p className="text-gray-9">$65</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">12 Jan 2025</p>
                    <span className="badge bg-purple badge-xs d-inline-flex align-items-center">
                      <i className="ti ti-circle-filled fs-5 me-1" />
                      Processing
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-0">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg">
                      <img src="assets/img/products/product-15.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">
                        <Link href="#">Osmo Genius Starter Kit</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p>Lifestyles</p>
                        <p className="text-gray-9">$87.56</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="fs-13 mb-1">11 Jan 2025</p>
                    <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                      <i className="ti ti-circle-filled fs-5 me-1" />
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

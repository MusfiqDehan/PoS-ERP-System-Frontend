"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CustomerChart from "@/components/charts/customerchart";

export default function OverallInformation() {
  return (
          <div className="col-xxl-4 col-xl-5 d-flex">
            <div className="card flex-fill">
              <div className="card-header">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-info fs-16 me-2">
                    <i className="ti ti-info-circle" />
                  </span>
                  <h5 className="card-title mb-0">Overall Information</h5>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-info fs-24">
                        <i className="ti ti-user-check" />
                      </div>
                      <p className="mb-1">Suppliers</p>
                      <h5>6987</h5>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-orange fs-24">
                        <i className="ti ti-users" />
                      </div>
                      <p className="mb-1">Customer</p>
                      <h5>4896</h5>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-item border bg-light p-3 text-center">
                      <div className="mb-3 text-teal fs-24">
                        <i className="ti ti-shopping-cart" />
                      </div>
                      <p className="mb-1">Orders</p>
                      <h5>487</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer pb-sm-0">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <h6>Customers Overview</h6>
                  <div className="dropdown dropdown-wraper">
                    <Link
                      href="#"
                      className="dropdown-toggle btn btn-sm"
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
                <div className="row align-items-center">
                  <div className="col-sm-5">
                    <div id="customer-chart">
                      <CustomerChart />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="row gx-0">
                      <div className="col-sm-6">
                        <div className="text-center border-end">
                          <h2 className="mb-1">5.5K</h2>
                          <p className="text-orange mb-2">First Time</p>
                          <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                            <i className="ti ti-arrow-up-left me-1" />
                            25%
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="text-center">
                          <h2 className="mb-1">3.5K</h2>
                          <p className="text-teal mb-2">Return</p>
                          <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                            <i className="ti ti-arrow-up-left me-1" />
                            21%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

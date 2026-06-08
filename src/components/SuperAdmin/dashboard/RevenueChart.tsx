"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import RevenueIncomeChart from "@/components/charts/superAdmincharts/revenuChart";

export default function RevenueChart() {
  return (
<div className="col-lg-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2 custome-heading">Revenue</h5>
                <div className="dropdown mb-2">
                  <Link
                    href="#"
                    className="btn btn-white border btn-sm d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-calendar me-1" />
                    2025
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        2024
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        2025
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        2023
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body pb-0">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <div className="mb-1">
                    <h5 className="mb-1 custome-heading">$45787</h5>
                    <p>
                      <span className="text-success fw-bold">+40%</span>{" "}
                      increased from last year
                    </p>
                  </div>
                  <p className="fs-13 text-gray-9 d-flex align-items-center mb-1">
                    <i className="ti ti-circle-filled me-1 fs-6 text-primary" />
                    Revenue
                  </p>
                </div>
                <RevenueIncomeChart />
              </div>
            </div>
          </div>
  );
}

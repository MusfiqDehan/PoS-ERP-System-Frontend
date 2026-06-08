"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SalesStatisticsChart from "@/components/charts/salesstatisticschart";

export default function SalesStatistics() {
  return (
          <div className="col-xl-6 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-danger fs-16 me-2">
                    <i className="ti ti-alert-triangle" />
                  </span>
                  <h5 className="card-title mb-0">Sales Statics</h5>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-sm btn-white"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-calendar me-1" />
                    2025
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link href="#" className="dropdown-item">
                        2025
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        2022
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        2021
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body pb-0">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <div className="border p-2 br-8">
                    <h5 className="d-inline-flex align-items-center text-teal">
                      $12,189
                      <span className="badge badge-success badge-xs d-inline-flex align-items-center ms-2">
                        <i className="ti ti-arrow-up-left me-1" />
                        25%
                      </span>
                    </h5>
                    <p>Revenue</p>
                  </div>
                  <div className="border p-2 br-8">
                    <h5 className="d-inline-flex align-items-center text-orange">
                      $48,988,078
                      <span className="badge badge-danger badge-xs d-inline-flex align-items-center ms-2">
                        <i className="ti ti-arrow-down-right me-1" />
                        25%
                      </span>
                    </h5>
                    <p>Expense</p>
                  </div>
                </div>
                <div id="sales-statistics">
                  <SalesStatisticsChart />
                </div>
              </div>
            </div>
          </div>
  );
}

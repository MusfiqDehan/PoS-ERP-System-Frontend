"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import HeatmapChart from "@/components/charts/heartchat";

export default function OrderStatistics() {
  return (
          <div className="col-xxl-4 col-md-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-indigo fs-16 me-2">
                    <i className="ti ti-package" />
                  </span>
                  <h5 className="card-title mb-0">Order Statistics</h5>
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
              <div className="card-body pb-0">
                <div id="heat_chart">
                 <HeatmapChart />
                </div>
              </div>
            </div>
          </div>
  );
}

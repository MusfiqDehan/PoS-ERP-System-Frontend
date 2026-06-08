"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PlanOverviewChart from "@/components/charts/superAdmincharts/planChart";

export default function TopPlans() {
  return (
<div className="col-xxl-3 col-xl-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2 custome-heading">Top Plans</h5>
                <div className="dropdown mb-2">
                  <Link
                    href="#"
                    className="btn btn-white border btn-sm d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-calendar me-1" />
                    This Month
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        This Month
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        This Week
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Today
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <PlanOverviewChart />
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <p className="f-13 mb-0">
                    <i className="ti ti-circle-filled text-primary me-1" />
                    Basic{" "}
                  </p>
                  <p className="f-13 fw-medium text-gray-9">60%</p>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <p className="f-13 mb-0">
                    <i className="ti ti-circle-filled text-warning me-1" />
                    Premium
                  </p>
                  <p className="f-13 fw-medium text-gray-9">20%</p>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-0">
                  <p className="f-13 mb-0">
                    <i className="ti ti-circle-filled text-info me-1" />
                    Enterprise
                  </p>
                  <p className="f-13 fw-medium text-gray-9">20%</p>
                </div>
              </div>
            </div>
          </div>
  );
}

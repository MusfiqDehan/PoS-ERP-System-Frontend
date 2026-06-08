"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CompanyChart from "@/components/charts/superAdmincharts/companyChart";

export default function CompaniesChart() {
  return (
<div className="col-xxl-3 col-lg-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2 custome-heading">Companies</h5>
                <div className="dropdown mb-2">
                  <Link
                    href="#"
                    className="btn btn-white border btn-sm d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-calendar me-1" />
                    This Week
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
                <CompanyChart />
                <p className="f-13 d-inline-flex align-items-center">
                  <span className="badge badge-success me-1">+6%</span> 5
                  Companies from last month
                </p>
              </div>
            </div>
          </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function RecentTransactions() {
  const routes = all_routes;
  return (
<div className="col-xxl-4 col-xl-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2 custome-heading">Recent Transactions</h5>
                <Link
                  href={routes.superAdminPurchaseTransaction}
                  className="btn btn-light btn-md mb-2"
                >
                  View All
                </Link>
              </div>
              <div className="card-body pb-2">
                <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/company/company-02.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Stellar Dynamics</Link>
                      </h6>
                      <p className="fs-13 d-inline-flex align-items-center">
                        <span className="text-info">#12457</span>
                        <i className="ti ti-circle-filled fs-6 text-primary mx-1" />
                        14 Jan 2025
                      </p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="mb-1 custome-heading">+$245</h6>
                    <p className="fs-13">Basic</p>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/company/company-03.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Quantum Nexus</Link>
                      </h6>
                      <p className="fs-13 d-inline-flex align-items-center">
                        <span className="text-info custome-heading">#65974</span>
                        <i className="ti ti-circle-filled fs-6 text-primary mx-1" />
                        14 Jan 2025
                      </p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="mb-1 custome-heading">+$395</h6>
                    <p className="fs-13">Enterprise</p>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/company/company-05.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Aurora Technologies</Link>
                      </h6>
                      <p className="fs-13 d-inline-flex align-items-center">
                        <span className="text-info">#22457</span>
                        <i className="ti ti-circle-filled fs-6 text-primary mx-1" />
                        14 Jan 2025
                      </p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="mb-1 custome-heading">+$145</h6>
                    <p className="fs-13">Advanced</p>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/company/company-07.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">TerraFusion Energy</Link>
                      </h6>
                      <p className="fs-13 d-inline-flex align-items-center">
                        <span className="text-info">#43412</span>
                        <i className="ti ti-circle-filled fs-6 text-primary mx-1" />
                        14 Jan 2025
                      </p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="mb-1 custome-heading">+$145</h6>
                    <p className="fs-13">Enterprise</p>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-between flex-wrap mb-1">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/company/company-08.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Epicurean Delights</Link>
                      </h6>
                      <p className="fs-13 d-inline-flex align-items-center">
                        <span className="text-info">#43567</span>
                        <i className="ti ti-circle-filled fs-6 text-primary mx-1" />
                        14 Jan 2025
                      </p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="mb-1 custome-heading">+$977</h6>
                    <p className="fs-13">Premium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

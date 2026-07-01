"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function RecentlyRegistered() {
  const routes = all_routes;
  return (
<div className="col-xxl-4 col-xl-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2 custome-heading">Recently Registered</h5>
                <Link
                  href={routes.companies}
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
                        src="assets/img/icons/company-icon-11.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Pitch</Link>
                      </h6>
                      <p className="fs-13">Basic (Monthly)</p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="custome-heading">150 Users</h6>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar  bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/icons/company-icon-12.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Initech</Link>
                      </h6>
                      <p className="fs-13">Enterprise (Yearly)</p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="custome-heading">200 Users</h6>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar  bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/icons/company-icon-13.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Umbrella Corp</Link>
                      </h6>
                      <p className="fs-13">Advanced (Monthly)</p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="custome-heading">129 Users</h6>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar  bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/icons/company-icon-14.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Capital Partners</Link>
                      </h6>
                      <p className="fs-13">Enterprise (Monthly)</p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="custome-heading">103 Users</h6>
                  </div>
                </div>
                <div className="d-sm-flex justify-content-between flex-wrap mb-1">
                  <div className="d-flex align-items-center mb-2">
                    <Link
                      href="#"
                      className="avatar  bg-gray-100 rounded-circle flex-shrink-0"
                    >
                      <img
                        src="assets/img/icons/company-icon-15.svg"
                        className="img-fluid w-auto h-auto"
                        alt="img"
                      />
                    </Link>
                    <div className="ms-2 flex-fill">
                      <h6 className="fs-medium text-truncate mb-1 custome-heading">
                        <Link href="#">Massive Dynamic</Link>
                      </h6>
                      <p className="fs-13">Premium (Yearly)</p>
                    </div>
                  </div>
                  <div className="text-sm-end mb-2">
                    <h6 className="custome-heading">108 Users</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

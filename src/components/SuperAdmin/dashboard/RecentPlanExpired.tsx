"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function RecentPlanExpired() {
  return (
<div className="col-xxl-4 col-xl-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                <h5 className="mb-2 custome-heading">Recent Plan Expired</h5>
                <div className="dropdown mb-2">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-white border btn-sm d-inline-flex align-items-center fs-13"
                    data-bs-toggle="dropdown"
                  >
                    Expired
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end p-3">
                    <ul className="nav d-block">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item d-block rounded-1"
                          data-bs-toggle="tab"
                          data-bs-target="#expired"
                        >
                          Expired
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item d-block rounded-1"
                          data-bs-toggle="tab"
                          data-bs-target="#request"
                        >
                          Request
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body pb-2">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="expired">
                    <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <Link
                          href="#"
                          className="avatar  bg-gray-100 rounded-circle flex-shrink-0"
                        >
                          <img
                            src="assets/img/icons/company-icon-16.svg"
                            className="img-fluid w-auto h-auto"
                            alt="img"
                          />
                        </Link>
                        <div className="ms-2 flex-fill">
                          <h6 className="fs-medium text-truncate mb-1 custome-heading">
                            <Link href="#">Silicon Corp</Link>
                          </h6>
                          <p className="fs-13">Expired : 10 Apr 2025</p>
                        </div>
                      </div>
                      <div className="text-sm-end mb-2">
                        <Link
                          href="#"
                          className="link-info text-decoration-underline d-block mb-1"
                        >
                          Send Reminder
                        </Link>
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
                            <Link href="#">Hubspot</Link>
                          </h6>
                          <p className="fs-13">Expired : 12 Jun 2025</p>
                        </div>
                      </div>
                      <div className="text-sm-end mb-2">
                        <Link
                          href="#"
                          className="link-info text-decoration-underline d-block mb-1"
                        >
                          Send Reminder
                        </Link>
                      </div>
                    </div>
                    <div className="d-sm-flex justify-content-between flex-wrap mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <Link
                          href="#"
                          className="avatar  bg-gray-100 rounded-circle flex-shrink-0"
                        >
                          <img
                            src="assets/img/icons/company-icon-18.svg"
                            className="img-fluid w-auto h-auto"
                            alt="img"
                          />
                        </Link>
                        <div className="ms-2 flex-fill">
                          <h6 className="fs-medium text-truncate mb-1 custome-heading">
                            <Link href="#">Licon Industries</Link>
                          </h6>
                          <p className="fs-13">Expired : 16 Jun 2025</p>
                        </div>
                      </div>
                      <div className="text-sm-end mb-2">
                        <Link
                          href="#"
                          className="link-info text-decoration-underline d-block mb-1"
                        >
                          Send Reminder
                        </Link>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <Link
                          href="#"
                          className="avatar  bg-gray-100 rounded-circle flex-shrink-0"
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
                          <p className="fs-13">Expired : 12 May 2025</p>
                        </div>
                      </div>
                      <div className="text-sm-end mb-2">
                        <Link
                          href="#"
                          className="link-info text-decoration-underline d-block mb-1"
                        >
                          Send Reminder
                        </Link>
                      </div>
                    </div>
                    <div className="d-sm-flex justify-content-between flex-wrap mb-1">
                      <div className="d-flex align-items-center mb-2">
                        <Link
                          href="#"
                          className="avatar  bg-gray-100 rounded-circle flex-shrink-0"
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
                          <p className="fs-13">Expired : 15 May 2025</p>
                        </div>
                      </div>
                      <div className="text-sm-end mb-2">
                        <Link
                          href="#"
                          className="link-info text-decoration-underline d-block mb-1"
                        >
                          Send Reminder
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="request">
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex align-items-center overflow-hidden">
                        <Link
                          href="#"
                          className="avatar bg-gray-100 rounded-circle flex-shrink-0"
                        >
                          <img
                            src="assets/img/icons/company-icon-16.svg"
                            className="img-fluid w-auto h-auto"
                            alt="img"
                          />
                        </Link>
                        <div className="ms-2 flex-fill overflow-hidden">
                          <h6 className="fs-medium text-truncate mb-1 custome-heading">
                            <Link href="#">Silicon Corp</Link>
                          </h6>
                          <p className="fs-13 text-info text-truncate">
                            silicon.example.com
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="link-success text-decoration-underline fs-13 fw-medium me-3"
                        >
                          Approve
                        </Link>
                        <Link
                          href="#"
                          className="link-danger text-decoration-underline fs-13 fw-medium"
                        >
                          Reject
                        </Link>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex align-items-center overflow-hidden">
                        <Link
                          href="#"
                          className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0"
                        >
                          <img
                            src="assets/img/icons/company-icon-14.svg"
                            className="img-fluid w-auto h-auto"
                            alt="img"
                          />
                        </Link>
                        <div className="ms-2 flex-fill overflow-hidden">
                          <h6 className="fs-medium text-truncate mb-1 custome-heading">
                            <Link href="#">Hubspot</Link>
                          </h6>
                          <p className="fs-13 text-info text-truncate">
                            hubspot.example.com
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="link-success text-decoration-underline fs-13 fw-medium me-3"
                        >
                          Approve
                        </Link>
                        <Link
                          href="#"
                          className="link-danger text-decoration-underline fs-13 fw-medium"
                        >
                          Reject
                        </Link>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex align-items-center overflow-hidden">
                        <Link
                          href="#"
                          className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0"
                        >
                          <img
                            src="assets/img/icons/company-icon-18.svg"
                            className="img-fluid w-auto h-auto"
                            alt="img"
                          />
                        </Link>
                        <div className="ms-2 flex-fill overflow-hidden">
                          <h6 className="fs-medium text-truncate mb-1 custome-heading">
                            <Link href="#">Licon Industries</Link>
                          </h6>
                          <p className="fs-13 text-info text-truncate">
                            licon.example.com
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="link-success text-decoration-underline fs-13 fw-medium me-3"
                        >
                          Approve
                        </Link>
                        <Link
                          href="#"
                          className="link-danger text-decoration-underline fs-13 fw-medium"
                        >
                          Reject
                        </Link>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex align-items-center overflow-hidden">
                        <Link
                          href="#"
                          className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0"
                        >
                          <img
                            src="assets/img/company/company-07.svg"
                            className="img-fluid w-auto h-auto"
                            alt="img"
                          />
                        </Link>
                        <div className="ms-2 flex-fill overflow-hidden">
                          <h6 className="fs-medium text-truncate mb-1 custome-heading">
                            <Link href="#">TerraFusion Energy</Link>
                          </h6>
                          <p className="fs-13 text-info text-truncate">
                            fusion.example.com
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="link-success text-decoration-underline fs-13 fw-medium me-3"
                        >
                          Approve
                        </Link>
                        <Link
                          href="#"
                          className="link-danger text-decoration-underline fs-13 fw-medium"
                        >
                          Reject
                        </Link>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-0">
                      <div className="d-flex align-items-center overflow-hidden">
                        <Link
                          href="#"
                          className="avatar avatar-md bg-gray-100 rounded-circle flex-shrink-0"
                        >
                          <img
                            src="assets/img/company/company-08.svg"
                            className="img-fluid w-auto h-auto"
                            alt="img"
                          />
                        </Link>
                        <div className="ms-2 flex-fill overflow-hidden">
                          <h6 className="fs-medium text-truncate mb-1 custome-heading">
                            <Link href="#">Epicurean Delights</Link>
                          </h6>
                          <p className="fs-13 text-info text-truncate">
                            epicuran.example.com
                          </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="link-success text-decoration-underline fs-13 fw-medium me-3"
                        >
                          Approve
                        </Link>
                        <Link
                          href="#"
                          className="link-danger text-decoration-underline fs-13 fw-medium"
                        >
                          Reject
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

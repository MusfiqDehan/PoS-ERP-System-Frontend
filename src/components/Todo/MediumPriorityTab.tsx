"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function MediumPriorityTab() {
  return (
                  <div
                    className="tab-pane fade"
                    id="pills-medium"
                    role="tabpanel"
                  >
                    <div className="accordion todo-accordion">
                      <div className="accordion-item mb-3">
                        <div className="row align-items-center mb-3 row-gap-3">
                          <div className="col-lg-4 col-sm-6">
                            <div className="accordion-header" id="headingSeven">
                              <div
                                className="accordion-button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSeven"
                                aria-controls="collapseSeven"
                              >
                                <div className="d-flex align-items-center w-100">
                                  <div className="me-2">
                                    <Link href="#">
                                      <span>
                                        <i className="fas fa-chevron-down" />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <span>
                                      <i className="ti ti-square-rounded text-warning me-2" />
                                    </span>
                                    <h5 className="fw-semibold">Medium</h5>
                                    <span className="badge bg-light rounded-pill ms-2">
                                      05
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-8 col-sm-6">
                            <div className="d-flex align-items-center justify-content-sm-end">
                              <Link
                                href="#"
                                className="btn btn-light me-2"
                                data-bs-toggle="modal"
                                data-inert={true}
                                data-bs-target="#edit-note-units"
                              >
                                <i className="ti ti-circle-plus me-2" />
                                Add New
                              </Link>
                              <Link
                                href="#"
                                className="btn btn-outline-light border"
                              >
                                See All <i className="ti ti-arrow-right ms-2" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div
                          id="collapseSeven"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingSeven"
                        >
                          <div className="accordion-body">
                            <div className="list-group list-group-flush">
                              <div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
                                <div className="row align-items-center row-gap-3">
                                  <div className="col-lg-6 col-md-7">
                                    <div className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
                                      <span className="me-2 d-flex align-items-center">
                                        <i className="ti ti-grid-dots text-dark" />
                                      </span>
                                      <div className="form-check form-check-md me-2">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                        />
                                      </div>
                                      <span className="me-2 rating-select d-flex align-items-center">
                                        <i className="ti ti-star" />
                                      </span>
                                      <div className="strike-info">
                                        <h4 className="fs-14">
                                          Check and respond to emails
                                        </h4>
                                      </div>
                                      <span className="badge bg-transparent-dark text-dark rounded-pill ms-2">
                                        <i className="ti ti-calendar me-1" />
                                        Tomorrow
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-5">
                                    <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                                      <span className="badge badge-secondary me-3 shadow-none">
                                        Reminder
                                      </span>
                                      <span className="badge badge-soft-success align-items-center me-3">
                                        <i className="fas fa-circle fs-6 me-1" />
                                        Completed
                                      </span>
                                      <div className="d-flex align-items-center">
                                        <div className="avatar-list-stacked avatar-group-sm">
                                          <span className="avatar avatar-rounded">
                                            <img
                                              className="border border-white"
                                              src="assets/img/profiles/avatar-28.jpg"
                                              alt="img"
                                            />
                                          </span>
                                          <span className="avatar avatar-rounded">
                                            <img
                                              className="border border-white"
                                              src="assets/img/profiles/avatar-29.jpg"
                                              alt="img"
                                            />
                                          </span>
                                          <span className="avatar avatar-rounded">
                                            <img
                                              className="border border-white"
                                              src="assets/img/profiles/avatar-24.jpg"
                                              alt="img"
                                            />
                                          </span>
                                        </div>
                                        <div className="dropdown ms-2">
                                          <Link
                                            href="#"
                                            className="d-inline-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                          >
                                            <i className="ti ti-dots-vertical" />
                                          </Link>
                                          <ul className="dropdown-menu dropdown-menu-end p-3">
                                            <li>
                                              <Link
                                                href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-inert={true}
                                                data-bs-target="#edit-note-units"
                                              >
                                                <i className="ti ti-edit me-2" />
                                                Edit
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-inert={true}
                                                data-bs-target="#delete-note-units"
                                              >
                                                <i className="ti ti-trash me-2" />
                                                Delete
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-inert={true}
                                                data-bs-target="#view-note-units"
                                              >
                                                <i className="ti ti-eye me-2" />
                                                View
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
                                <div className="row align-items-center row-gap-3">
                                  <div className="col-lg-6 col-md-7">
                                    <div className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
                                      <span className="me-2 d-flex align-items-center">
                                        <i className="ti ti-grid-dots text-dark" />
                                      </span>
                                      <div className="form-check form-check-md me-2">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                        />
                                      </div>
                                      <span className="me-2 rating-select d-flex align-items-center">
                                        <i className="ti ti-star" />
                                      </span>
                                      <div className="strike-info">
                                        <h4 className="fs-14">
                                          Coordinate with department head on
                                          progress
                                        </h4>
                                      </div>
                                      <span className="badge bg-transparent-dark text-dark rounded-pill ms-2">
                                        <i className="ti ti-calendar me-1" />
                                        25 May 2024
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-5">
                                    <div className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
                                      <span className="badge badge-danger me-3">
                                        Internal
                                      </span>
                                      <span className="badge bg-transparent-purple d-flex align-items-center me-3">
                                        <i className="fas fa-circle fs-6 me-1" />
                                        Inprogress
                                      </span>
                                      <div className="d-flex align-items-center">
                                        <div className="avatar-list-stacked avatar-group-sm">
                                          <span className="avatar avatar-rounded">
                                            <img
                                              className="border border-white"
                                              src="assets/img/profiles/avatar-06.jpg"
                                              alt="img"
                                            />
                                          </span>
                                          <span className="avatar avatar-rounded">
                                            <img
                                              className="border border-white"
                                              src="assets/img/profiles/avatar-09.jpg"
                                              alt="img"
                                            />
                                          </span>
                                          <span className="avatar avatar-rounded">
                                            <img
                                              className="border border-white"
                                              src="assets/img/profiles/avatar-14.jpg"
                                              alt="img"
                                            />
                                          </span>
                                        </div>
                                        <div className="dropdown ms-2">
                                          <Link
                                            href="#"
                                            className="d-inline-flex align-items-center"
                                            data-bs-toggle="dropdown"
                                          >
                                            <i className="ti ti-dots-vertical" />
                                          </Link>
                                          <ul className="dropdown-menu dropdown-menu-end p-3">
                                            <li>
                                              <Link
                                                href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-inert={true}
                                                data-bs-target="#edit-note-units"
                                              >
                                                <i className="ti ti-edit me-2" />
                                                Edit
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-inert={true}
                                                data-bs-target="#delete-note-units"
                                              >
                                                <i className="ti ti-trash me-2" />
                                                Delete
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                href="#"
                                                className="dropdown-item rounded-1"
                                                data-bs-toggle="modal"
                                                data-inert={true}
                                                data-bs-target="#view-note-units"
                                              >
                                                <i className="ti ti-eye me-2" />
                                                View
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
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

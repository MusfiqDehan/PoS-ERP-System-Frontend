"use client";

import Link from "next/link";

export default function TodoFilters() {
  return (
                <div className="row border-bottom mb-3">
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                      <h6 className="me-2">Priority</h6>
                      <ul
                        className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto active"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-selected="true"
                          >
                            All
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-contact"
                            type="button"
                            role="tab"
                            aria-selected="false"
                          >
                            High
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-medium"
                            type="button"
                            role="tab"
                            aria-selected="false"
                          >
                            Medium
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-low"
                            type="button"
                            role="tab"
                            aria-selected="false"
                          >
                            Low
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3">
                      <div className="input-icon w-120 position-relative me-2">
                        <span className="input-icon-addon">
                          <i className="ti ti-calendar text-gray-9" />
                        </span>
                        <input
                          type="text"
                          className="form-control datetimepicker"
                          placeholder="Due Date"
                        />
                      </div>
                      <div className="dropdown me-2">
                        <Link
                          href="#"
                          className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          All Tags
                        </Link>
                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              All Tags
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Internal
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Projects
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Meetings
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Reminder
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              Research
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="d-inline-flex me-2">Sort By : </span>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center border-0 bg-transparent p-0 text-dark"
                            data-bs-toggle="dropdown"
                          >
                            Created Date
                          </Link>
                          <ul className="dropdown-menu  dropdown-menu-end p-3">
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                Created Date
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                Priority
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded-1"
                              >
                                Due Date
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  );
}

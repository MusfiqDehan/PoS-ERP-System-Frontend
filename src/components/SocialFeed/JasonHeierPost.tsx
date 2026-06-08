"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function JasonHeierPost() {
  return (
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            className="avatar avatar-lg avatar-rounded flex-shrink-0 me-2"
                          >
                            <img src="assets/img/users/user-05.jpg" alt="Img" />
                          </Link>
                          <div>
                            <h5 className="mb-1">
                              <Link href="#">
                                Jason Heier{" "}
                                <i className="ti ti-circle-check-filled text-success" />
                              </Link>
                            </h5>
                            <p className="d-flex align-items-center">
                              <span className="text-info">@jason118</span>
                              <i className="ti ti-circle-filled fs-5 mx-2" />
                              United Kingdom
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0 text-dark">About 1 hr ago</p>
                          <div className="dropdown ms-3 me-1">
                            <button
                              className="btn btn-icon dropdown-toggle bg-transparent d-flex align-items-center text-dark border-0 p-0 btn-sm"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-world pe-1" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <Link
                                  className="dropdown-item"
                                  href="#"
                                >
                                  Private
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item"
                                  href="#"
                                >
                                  Public
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="dropdown">
                            <Link
                              href="#"
                              className="d-inline-flex align-items-center show"
                              data-bs-toggle="dropdown"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical" />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                              <li>
                                <Link
                                  href="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-edit me-2" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-eye me-2" />
                                  Hide Post
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-report me-2" />
                                  Report
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  className="dropdown-item rounded-1"
                                >
                                  <i className="ti ti-trash-x me-2" />
                                  Delete
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="mb-2">
                        <p className="text-dark fw-medium">
                          Drinking water boosts skin health and beauty. Stay hydrated!
                          <Link
                            href="#"
                            className="text-info link-hover"
                          >
                            #HealthTips{" "}
                          </Link>
                          <Link
                            href="#"
                            className="text-info link-hover"
                          >
                            {" "}
                            #Wellness
                          </Link>
                          💧
                        </p>
                      </div>
                      <div className="card shadow-none mb-3">
                        <div className="card-img card-img-hover rounded-0">
                          <Link href="#" className="rounded-top">
                            <img
                              src="assets/img/social/social-feed-02.jpg"
                              className="rounded-top"
                              alt="Img"
                            />
                          </Link>
                        </div>
                        <div className="card-body p-2">
                          <h6 className="mb-1 text-truncate">
                            <Link href="#">
                              Drinking water boosts skin health and beauty. Stay
                              hydrated!💧
                            </Link>
                          </h6>
                          <Link href="#">Health.com</Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <div className="d-flex align-items-center flex-wrap row-gap-3">
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-heart me-2" />
                            340K Likes
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center me-3"
                          >
                            <i className="ti ti-message-dots me-2" />
                            45 Comments
                          </Link>
                          <Link
                            href="#"
                            className="d-inline-flex align-items-center"
                          >
                            <i className="ti ti-share-3 me-2" />
                            28 Share
                          </Link>
                        </div>
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            className="btn btn-icon btn-sm rounded-circle"
                          >
                            <i className="ti ti-heart" />
                          </Link>
                          <Link
                            href="#"
                            className="btn btn-icon btn-sm rounded-circle"
                          >
                            <i className="ti ti-share" />
                          </Link>
                          <Link
                            href="#"
                            className="btn btn-icon btn-sm rounded-circle"
                          >
                            <i className="ti ti-message-star" />
                          </Link>
                          <Link
                            href="#"
                            className="btn btn-icon btn-sm rounded-circle"
                          >
                            <i className="ti ti-bookmark" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
  );
}

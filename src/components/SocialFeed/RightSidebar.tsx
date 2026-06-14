"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function RightSidebar() {
  return (
                <div className="sticky-class">
                <div className="card ">
                  <div className="card-body">
                    <h5 className="mb-3">Peoples</h5>
                    <ul
                      className="nav nav-pills border d-flex p-2 rounded mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item flex-fill" role="presentation">
                        <button
                          className="nav-link btn active w-100"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-selected="true"
                        >
                          General
                        </button>
                      </li>
                      <li className="nav-item flex-fill" role="presentation">
                        <button
                          className="nav-link btn w-100"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-selected="false"
                        >
                          Primary
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                      >
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img
                                  src="assets/img/profiles/avatar-29.jpg"
                                  alt="Sortonium"
                                />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Anthony Lewis</Link>
                                  <i className="ti ti-circle-check-filled text-success ms-1" />
                                </h6>
                                <span className="fs-12 d-block">United States</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-01.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Harvey Smith</Link>
                                </h6>
                                <span className="fs-12 d-block">Ukrain</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-18.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Stephan Peralt</Link>
                                </h6>
                                <span className="fs-12 d-block">Isreal</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-19.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Doglas Martini</Link>
                                </h6>
                                <span className="fs-12 d-block">Belgium</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-09.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Brian Villalobos</Link>
                                  <i className="ti ti-circle-check-filled text-success ms-1" />
                                </h6>
                                <span className="fs-12 d-block">United Kingdom</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-02.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Linda Ray</Link>
                                </h6>
                                <span className="fs-12 d-block">Argentina</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                        </div>
                        <div>
                          <Link
                            href="#"
                            className="btn btn-outline-light w-100 border"
                          >
                            View All <i className="ti ti-arrow-right ms-2" />
                          </Link>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                      >
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img
                                  src="assets/img/profiles/avatar-11.jpg"
                                  alt="Sortonium"
                                />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Anthony Lewis</Link>
                                  <i className="ti ti-circle-check-filled text-success ms-1" />
                                </h6>
                                <span className="fs-12 d-block">United States</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-12.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Harvey Smith</Link>
                                </h6>
                                <span className="fs-12 d-block">Ukrain</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-13.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Stephan Peralt</Link>
                                </h6>
                                <span className="fs-12 d-block">Isreal</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-14.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Doglas Martini</Link>
                                </h6>
                                <span className="fs-12 d-block">Belgium</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-15.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Brian Villalobos</Link>
                                  <i className="ti ti-circle-check-filled text-success ms-1" />
                                </h6>
                                <span className="fs-12 d-block">United Kingdom</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <Link
                                href="#"
                                className="avatar avatar-rounded flex-shrink-0 me-2"
                              >
                                <img src="assets/img/users/user-16.jpg" alt="Sortonium" />
                              </Link>
                              <div>
                                <h6 className="d-inline-flex align-items-center fw-medium mb-1">
                                  <Link href="#">Linda Ray</Link>
                                </h6>
                                <span className="fs-12 d-block">Argentina</span>
                              </div>
                            </div>
                            <Link
                              href="#"
                              className="btn btn-sm btn-icon"
                            >
                              <i className="ti ti-user-x" />
                            </Link>
                          </div>
                        </div>
                        <div>
                          <Link
                            href="#"
                            className="btn btn-outline-light w-100 border"
                          >
                            View All <i className="ti ti-arrow-right ms-2" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-3">Saved Feeds</h5>
                    <div className="bg-light-500 rounded p-2 mb-2">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <Link
                          href="#"
                          className="d-flex align-items-center"
                        >
                          <span>
                            <img
                              src="assets/img/icons/feeds-01.svg"
                              className="me-2"
                              alt="Sortonium"
                            />
                          </span>
                          <p className="fs-12 fw-medium">World Health</p>
                        </Link>
                        <Link href="#">
                          <i className="ti ti-bookmark-filled text-warning" />
                        </Link>
                      </div>
                      <p className="text-dark fw-medium">
                        <Link href="#">
                          Retail investor party continues even as
                        </Link>
                      </p>
                    </div>
                    <div className="bg-light-500 rounded p-2 mb-2">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <Link
                          href="#"
                          className="d-flex align-items-center"
                        >
                          <span>
                            <img
                              src="assets/img/icons/feeds-02.svg"
                              className="me-2"
                              alt="Sortonium"
                            />
                          </span>
                          <p className="fs-12 fw-medium">T3 Tech</p>
                        </Link>
                        <Link href="#">
                          <i className="ti ti-bookmark-filled text-warning" />
                        </Link>
                      </div>
                      <p className="text-dark fw-medium">
                        <Link href="#">
                          Ipad Air (2020) vs Samsung Galaxy Tab
                        </Link>
                      </p>
                    </div>
                    <div className="bg-light-500 rounded p-2 mb-2">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <Link
                          href="#"
                          className="d-flex align-items-center"
                        >
                          <span>
                            <img
                              src="assets/img/icons/feeds-03.svg"
                              className="me-2"
                              alt="Sortonium"
                            />
                          </span>
                          <p className="fs-12 fw-medium">Fstoppers</p>
                        </Link>
                        <Link href="#">
                          <i className="ti ti-bookmark-filled text-warning" />
                        </Link>
                      </div>
                      <p className="text-dark fw-medium">
                        <Link href="#">
                          Beyond capital gains tax! Top 50 stock
                        </Link>
                      </p>
                    </div>
                    <div className="bg-light-500 rounded p-2">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <Link
                          href="#"
                          className="d-flex align-items-center"
                        >
                          <span>
                            <img
                              src="assets/img/icons/feeds-04.svg"
                              className="me-2"
                              alt="Sortonium"
                            />
                          </span>
                          <p className="fs-12 fw-medium">Evernote</p>
                        </Link>
                        <Link href="#">
                          <i className="ti ti-bookmark-filled text-warning" />
                        </Link>
                      </div>
                      <p className="text-dark fw-medium">
                        <Link href="#">
                          Sony Just Destroyed the Competition
                        </Link>
                      </p>
                    </div>
                    <div className="mt-3">
                      <Link
                        href="#"
                        className="btn btn-outline-light w-100 border"
                      >
                        View All <i className="ti ti-arrow-right ms-2" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-3">Trending Hastags</h5>
                    <div className="d-flex align-items-center flex-wrap gap-1">
                      <Link
                        href="#"
                        className="text-info d-inline-flex link-hover"
                      >
                        #HealthTips
                      </Link>
                      <Link
                        href="#"
                        className="text-info d-inline-flex link-hover"
                      >
                        #Wellness
                      </Link>
                      <Link
                        href="#"
                        className="text-info d-inline-flex link-hover"
                      >
                        #Motivation
                      </Link>
                      <Link
                        href="#"
                        className="text-info d-inline-flex link-hover"
                      >
                        #Inspiration{" "}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="card-img card-img-hover mb-3">
                      <Link href="#" className="rounded">
                        <img
                          src="assets/img/social/social-feed-04.jpg"
                          className="rounded"
                          alt="Sortonium"
                        />
                      </Link>
                    </div>
                    <h6 className="text-center">
                      <Link href="#">
                        Enjoy Unlimited Access on a small price monthly.
                      </Link>
                    </h6>
                    <div className="mt-3">
                      <Link
                        href="#"
                        className="btn btn-outline-light w-100 border"
                      >
                        Upgrade Now <i className="ti ti-arrow-right ms-2" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap justify-content-center template-more-links mb-4">
                  <Link href="#" className="d-inline-flex">
                    About
                  </Link>
                  <Link href="#" className="d-inline-flex">
                    Privacy
                  </Link>
                  <Link href="#" className="d-inline-flex">
                    Terms
                  </Link>
                  <Link href="#" className="d-inline-flex">
                    Help
                  </Link>
                </div>
                </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

type LeftSidebarProps = { toggle: boolean; setToggle: (value: boolean) => void; };

export default function LeftSidebar(props: LeftSidebarProps) {
  const { toggle, setToggle } = props;
  return (
                <div className="card sticky-class">
                  <div className="card-body">
                    <div className="bg-light rounded p-3 mb-4">
                      <div className="text-center mb-3">
                        <Link
                          href="#"
                          className="avatar avatar-xl online avatar-rounded"
                        >
                          <img src="assets/img/users/user-11.jpg" alt="Sortonium" />
                        </Link>
                        <h5 className="mb-1">
                          <Link href="#">James Hong </Link>
                        </h5>
                        <p className="fs-12">@James Hong324</p>
                      </div>
                      <div className="row g-1">
                        <div className="col-sm-4">
                          <div className="rounded bg-white text-center py-1">
                            <h4 className="mb-1">89K</h4>
                            <p className="fs-12">Followers</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="rounded bg-white text-center py-1">
                            <h4 className="mb-1">45</h4>
                            <p className="fs-12">Follows</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="rounded bg-white text-center py-1">
                            <h4 className="mb-1">45</h4>
                            <p className="fs-12">Post</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <Link
                        href="#"
                        className="btn btn-primary d-inline-flex align-items-center justify-content-center w-100"
                      >
                        <i className="ti ti-circle-plus me-2" />
                        Create Post
                      </Link>
                    </div>
                    <div className="files-list border-bottom pb-2 mb-4">
                      <Link
                        href="#"
                        className="d-flex align-items-center justify-content-between active fw-medium p-2"
                      >
                        <span>
                          <i className="ti ti-brand-feedly me-2" />
                          All Feeds
                        </span>
                        <span className="badge badge-danger badge-xs rounded-pill">
                          56
                        </span>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-mood-search me-2" />
                        Explore
                      </Link>
                      <Link
                        href="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-mail-check me-2" />
                        Messages
                      </Link>
                      <Link
                        href="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-list me-2" />
                        Lists
                      </Link>
                      <Link
                        href="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-bookmark me-2" />
                        Bookmark
                      </Link>
                      <Link
                        href="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-coffee me-2" />
                        Marketplace
                      </Link>
                      <Link
                        href="#"
                        className="d-flex align-items-center justify-content-between fw-medium p-2"
                      >
                        <span>
                          <i className="ti ti-file-text me-2" />
                          Files
                        </span>
                        <span className="badge badge-info badge-xs rounded-pill">
                          14
                        </span>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-music me-2" />
                        Media
                      </Link>
                      <Link
                        href="#"
                        className="d-flex align-items-center fw-medium p-2"
                      >
                        <i className="ti ti-user-share me-2" />
                        Profile
                      </Link>
                    </div>
                    <div>
                      <div className="mb-2">
                        <h5>Pages You Liked</h5>
                      </div>
                      <div>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center justify-content-between text-dark py-1 mb-2"
                        >
                          <span className="d-inline-flex align-items-center">
                            <img
                              src="assets/img/icons/liked-page-01.svg"
                              className="me-2"
                              alt="Sortonium"
                            />
                            Dribble
                          </span>
                          <span className="btn btn-icon btn-sm">
                            <i className="ti ti-thumb-down" />
                          </span>
                        </Link>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center justify-content-between text-dark py-1 mb-2"
                        >
                          <span className="d-inline-flex align-items-center">
                            <img
                              src="assets/img/icons/liked-page-02.svg"
                              className="me-2"
                              alt="Sortonium"
                            />
                            UI/UX Designs
                          </span>
                          <span className="btn btn-icon btn-sm">
                            <i className="ti ti-thumb-down" />
                          </span>
                        </Link>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center justify-content-between text-dark py-1"
                        >
                          <span className="d-inline-flex align-items-center">
                            <img
                              src="assets/img/icons/liked-page-03.svg"
                              className="me-2"
                              alt="Sortonium"
                            />
                            Figma Update
                          </span>
                          <span className="btn btn-icon btn-sm">
                            <i className="ti ti-thumb-down" />
                          </span>
                        </Link>
                        <div>
                          <div className={`more-menu-3 ${toggle ? 'd-block':'d-none'}`} >
                            <Link
                              href="#"
                              className="fw-medium d-flex align-items-center justify-content-between text-dark py-1 mb-2"
                            >
                              <span className="d-inline-flex align-items-center">
                                <img
                                  src="assets/img/icons/liked-page-04.svg"
                                  className="me-2"
                                  alt="Sortonium"
                                />
                                I Am Techie
                              </span>
                              <span className="btn btn-icon btn-sm">
                                <i className="ti ti-thumb-down" />
                              </span>
                            </Link>
                          </div>
                          <div className="view-all mt-2">
                            <Link
                              href="#"
                              className="viewall-button-3 fw-medium"
                              onClick={()=>setToggle(!toggle)}
                            >
                              <span>Show {toggle ? 'Less':'More'}</span>
                              <i className="fa fa-chevron-down fs-10 ms-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

type EmailSidebarProps = {
  onCompose: () => void;
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
  showMenu2: boolean;
  setShowMenu2: (value: boolean) => void;
  showMenu3: boolean;
  setShowMenu3: (value: boolean) => void;
};

export default function EmailSidebar({
  onCompose,
  showMenu,
  setShowMenu,
  showMenu2,
  setShowMenu2,
  showMenu3,
  setShowMenu3,
}: EmailSidebarProps) {
  return (
            <div className="email-sidebar border-end border-bottom">

              <div className="active slimscroll h-100">
                <div className="slimscroll-active-sidebar">
                  <div className="p-3">
                    <div className="shadow-md bg-white rounded p-2 mb-4">
                      <div className="d-flex align-items-center">
                        <Link
                          href="#"
                          className="avatar avatar-md flex-shrink-0 me-2"
                        >
                          <img
                            src="assets/img/profiles/avatar-02.jpg"
                            className="rounded-circle"
                            alt="Sortonium"
                          />
                        </Link>
                        <div>
                          <h6 className="mb-1">
                            <Link href="#">James Hong</Link>
                          </h6>
                          <p>Jnh343@example.com</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="btn btn-primary w-100"
                      id="compose_mail"
                      onClick={onCompose}
                    >
                      <i className="ti ti-edit me-2" />
                      Compose
                    </Link>
                    <div className="mt-4">
                      <h5 className="mb-2">Emails</h5>
                      <div className="d-block mb-4 pb-4 border-bottom email-tags" >
                        <Link
                          href="#"
                          className="d-flex align-items-center justify-content-between p-2 rounded active"
                        >
                          <span className="d-flex align-items-center fw-medium">
                            <i className="ti ti-inbox text-gray me-2" />
                            Inbox
                          </span>
                          <span className="badge badge-danger rounded-pill badge-xs">
                            56
                          </span>
                        </Link>
                        <Link
                          href="#"
                          className="d-flex align-items-center justify-content-between p-2 rounded"
                        >
                          <span className="d-flex align-items-center fw-medium">
                            <i className="ti ti-star text-gray me-2" />
                            Starred
                          </span>
                          <span className="fw-semibold fs-12 badge text-gray rounded-pill">
                            46
                          </span>
                        </Link>
                        <Link
                          href="#"
                          className="d-flex align-items-center justify-content-between p-2 rounded"
                        >
                          <span className="d-flex align-items-center fw-medium">
                            <i className="ti ti-rocket text-gray me-2" />
                            Sent
                          </span>
                          <span className="badge text-gray rounded-pill">14</span>
                        </Link>
                        <Link
                          href="#"
                          className="d-flex align-items-center justify-content-between p-2 rounded"
                        >
                          <span className="d-flex align-items-center fw-medium">
                            <i className="ti ti-file text-gray me-2" />
                            Drafts
                          </span>
                          <span className="badge text-gray rounded-pill">12</span>
                        </Link>
                        <Link
                          href="#"
                          className="d-flex align-items-center justify-content-between p-2 rounded"
                        >
                          <span className="d-flex align-items-center fw-medium">
                            <i className="ti ti-trash text-gray me-2" />
                            Deleted
                          </span>
                          <span className="badge text-gray rounded-pill">08</span>
                        </Link>
                        <Link
                          href="#"
                          className="d-flex align-items-center justify-content-between p-2 rounded"
                        >
                          <span className="d-flex align-items-center fw-medium">
                            <i className="ti ti-info-octagon text-gray me-2" />
                            Spam
                          </span>
                          <span className="badge text-gray rounded-pill">0</span>
                        </Link>
                        <div >
                          <div className="more-menu" style={{ display: !showMenu ? 'none' : 'block' }}>
                            <Link
                              href="#"
                              className="d-flex align-items-center justify-content-between p-2 rounded"
                            >
                              <span className="d-flex align-items-center fw-medium">
                                <i className="ti ti-location-up text-gray me-2" />
                                Important
                              </span>
                              <span className="badge text-gray rounded-pill">
                                12
                              </span>
                            </Link>
                            <Link
                              href="#"
                              className="d-flex align-items-center justify-content-between p-2 rounded"
                            >
                              <span className="d-flex align-items-center fw-medium">
                                <i className="ti ti-transition-top text-gray me-2" />
                                All Emails
                              </span>
                              <span className="badge text-gray rounded-pill">
                                34
                              </span>
                            </Link>
                          </div>
                          <div className="view-all mt-2">
                            <Link
                              href="#"
                              className="viewall-button fw-medium" onClick={() => { setShowMenu(!showMenu) }}
                            >
                              {showMenu ? 'Show Less' : 'Show More'}
                              <i className="fa fa-chevron-down fs-10 ms-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom mb-4 pb-4">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h5>Labels</h5>
                        <Link href="#">
                          <i className="ti ti-square-rounded-plus-filled text-primary fs-16" />
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center text-dark py-1"
                        >
                          <i className="ti ti-square-rounded text-success me-2" />
                          Team Events
                        </Link>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center text-dark py-1"
                        >
                          <i className="ti ti-square-rounded text-warning me-2" />
                          Work
                        </Link>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center text-dark py-1"
                        >
                          <i className="ti ti-square-rounded text-danger me-2" />
                          External
                        </Link>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center text-dark py-1"
                        >
                          <i className="ti ti-square-rounded text-skyblue me-2" />
                          Projects
                        </Link>
                        <div>
                          <div className="more-menu-2" style={{ display: !showMenu2 ? 'none' : 'block' }}>
                            <Link
                              href="#"
                              className="fw-medium d-flex align-items-center text-dark py-1"
                            >
                              <i className="ti ti-square-rounded text-purple me-2" />
                              Applications
                            </Link>
                            <Link
                              href="#"
                              className="fw-medium d-flex align-items-center text-dark py-1"
                            >
                              <i className="ti ti-square-rounded text-info me-2" />
                              Desgin
                            </Link>
                          </div>
                          <div className="view-all mt-2">
                            <Link
                              href="#"
                              className="viewall-button-2 fw-medium" onClick={() => { setShowMenu2(!showMenu2) }}
                            >
                              {showMenu2 ? 'Show Less' : 'Show More'}
                              <i className="fa fa-chevron-down fs-10 ms-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-bottom mb-4 pb-4">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h5>Folders</h5>
                        <Link href="#">
                          <i className="ti ti-square-rounded-plus-filled text-primary fs-16" />
                        </Link>
                      </div>
                      <div>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center text-dark py-1"
                        >
                          <i className="ti ti-folder-filled text-danger me-2" />
                          Projects
                        </Link>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center text-dark py-1"
                        >
                          <i className="ti ti-folder-filled text-warning me-2" />
                          Personal
                        </Link>
                        <Link
                          href="#"
                          className="fw-medium d-flex align-items-center text-dark py-1"
                        >
                          <i className="ti ti-folder-filled text-success me-2" />
                          Finance
                        </Link>
                        <div>
                          <div className="more-menu-3" style={{ display: !showMenu3 ? 'none' : 'block' }}>
                            <Link
                              href="#"
                              className="fw-medium d-flex align-items-center text-dark py-1"
                            >
                              <i className="ti ti-folder-filled text-info me-2" />
                              Projects
                            </Link>
                            <Link
                              href="#"
                              className="fw-medium d-flex align-items-center text-dark py-1"
                            >
                              <i className="ti ti-folder-filled text-primary me-2" />
                              Personal
                            </Link>
                          </div>
                          <div className="view-all mt-2">
                            <Link
                              href="#"
                              className="viewall-button-3 fw-medium" onClick={() => { setShowMenu3(!showMenu3) }}
                            >
                              {showMenu3 ? 'Show Less' : 'Show More'}
                              <i className="fa fa-chevron-down fs-10 ms-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-dark rounded text-center position-relative p-4">
                      <span className="avatar avatar-lg rounded-circle bg-white mb-2">
                        <i className="ti ti-alert-triangle text-dark" />
                      </span>
                      <h6 className="text-white mb-3">
                        Enjoy Unlimited Access on a small price monthly.
                      </h6>
                      <Link href="#" className="btn btn-white">
                        Upgrade Now <i className="ti ti-arrow-right" />
                      </Link>
                      <div className="box-bg">
                        <span className="bg-right">
                          <img src="assets/img/bg/email-bg-01.png" alt="Sortonium" />
                        </span>
                        <span className="bg-left">
                          <img src="assets/img/bg/email-bg-02.png" alt="Sortonium" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
  );
}

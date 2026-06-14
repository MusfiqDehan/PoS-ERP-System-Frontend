"use client";
/* eslint-disable @next/next/no-img-element */

import { all_routes } from "@/data/all_routes";
import Link from "next/link";

export default function InboxList() {
  const routes = all_routes;

  return (
                  <div className="list-group list-group-flush mails-list">
                    <div className="list-group-item border-bottom p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                          <Link
                            href={routes.emailreply}
                            className="avatar bg-purple avatar-rounded me-2"
                          >
                            <span className="avatar-title">CD</span>
                          </Link>
                          <div className="flex-fill">
                            <div className="d-flex align-items-start justify-content-between">
                              <div>
                                <h6 className="mb-1">
                                  <Link href={routes.emailreply}>Justin Lapointe</Link>
                                </h6>
                                <span className="fw-semibold">
                                  Client Dashboard
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-sm rounded-circle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href={routes.emailreply}
                                      >
                                        Open Email
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply All
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward As Attachment
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mark As Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move to Junk
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mute
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Archive
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move To
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <span>
                                  <i className="ti ti-point-filled text-success" />
                                  3:13 PM
                                </span>
                              </div>
                            </div>
                            <p>It seems that recipients are receiving...</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="d-flex align-items-center btn btn-sm text-dark bg-transparent-dark me-2">
                            <i className="ti ti-folder-open me-2" />3
                          </span>
                          <span className="d-flex align-items-center text-dark btn btn-sm bg-transparent-dark">
                            <i className="ti ti-photo me-2" />
                            +24
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span>
                            <i className="ti ti-star-filled text-warning" />
                          </span>
                          <span className="badge badge-soft-info mx-2 shadow-none">
                            <i className="ti ti-square me-1" />
                            Projects
                          </span>
                          <Link
                            href="#"
                            className="badge badge-dark rounded-pill badge-xs"
                          >
                            +1
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item border-bottom p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                          <Link
                            href={routes.emailreply}
                            className="avatar avatar-md avatar-rounded me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-01.jpg"
                              alt="Sortonium"
                            />
                          </Link>
                          <div className="flex-fill">
                            <div className="d-flex align-items-start justify-content-between">
                              <div>
                                <h6 className="mb-1">
                                  <Link href={routes.emailreply}>Rufana</Link>
                                </h6>
                                <span className="fw-semibold">UI project</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-sm rounded-circle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href={routes.emailreply}
                                      >
                                        Open Email
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply All
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward As Attachment
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mark As Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move to Junk
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mute
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Archive
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move To
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <span>
                                  <i className="ti ti-point-filled text-danger" />
                                  3:13 PM
                                </span>
                              </div>
                            </div>
                            <p>Regardless, you can usually expect an increase</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <Link href="#">
                          <img src="assets/img/icons/google-meet.svg" alt="Sortonium" />
                        </Link>
                        <div className="d-flex align-items-center">
                          <span>
                            <i className="ti ti-star-filled text-warning" />
                          </span>
                          <span className="badge badge-soft-purple mx-2 shadow-none">
                            <i className="ti ti-square me-1" />
                            Applications
                          </span>
                          <Link
                            href="#"
                            className="badge badge-dark rounded-pill badge-xs shadow-none"
                          >
                            +1
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item border-bottom p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                          <Link
                            href={routes.emailreply}
                            className="avatar avatar-md avatar-rounded me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-03.jpg"
                              alt="Sortonium"
                            />
                          </Link>
                          <div className="flex-fill">
                            <div className="d-flex align-items-start justify-content-between">
                              <div>
                                <h6 className="mb-1">
                                  <Link href={routes.emailreply}>Cameron Drake</Link>
                                </h6>
                                <span className="fw-semibold">You’re missing</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-sm rounded-circle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href={routes.emailreply}
                                      >
                                        Open Email
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply All
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward As Attachment
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mark As Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move to Junk
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mute
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Archive
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move To
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <span>
                                  <i className="ti ti-point-filled text-danger" />
                                  3:13 PM
                                </span>
                              </div>
                            </div>
                            <p>
                              Here are a few catchy email subject line
                              examples&nbsp;
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="d-flex align-items-center text-dark btn btn-sm bg-transparent-dark fs-14">
                            <i className="ti ti-video me-2" />1
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span>
                            <i className="ti ti-star-filled text-warning" />
                          </span>
                          <span className="badge badge-soft-danger mx-2 shadow-none">
                            <i className="ti ti-square me-1" />
                            External
                          </span>
                          <Link
                            href="#"
                            className="badge badge-dark rounded-pill badge-xs"
                          >
                            +1
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item border-bottom p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                          <Link
                            href={routes.emailreply}
                            className="avatar avatar-md avatar-rounded me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-04.jpg"
                              alt="Sortonium"
                            />
                          </Link>
                          <div className="flex-fill">
                            <div className="d-flex align-items-start justify-content-between">
                              <div>
                                <h6 className="mb-1">
                                  <Link href={routes.emailreply}>Sean Hill</Link>
                                </h6>
                                <span className="fw-semibold">
                                  How Have You Progressed
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-sm rounded-circle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href={routes.emailreply}
                                      >
                                        Open Email
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply All
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward As Attachment
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mark As Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move to Junk
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mute
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Archive
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move To
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <span>
                                  <i className="ti ti-point-filled text-danger" />
                                  3:13 PM
                                </span>
                              </div>
                            </div>
                            <p>You can write effective retargeting subject</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="d-flex align-items-center text-dark btn btn-sm bg-transparent-dark">
                            <i className="ti ti-photo me-2" />1
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-soft-success shadow-none">
                            <i className="ti ti-square me-1" />
                            Team Events
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item border-bottom p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                          <Link
                            href={routes.emailreply}
                            className="avatar avatar-md avatar-rounded me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-05.jpg"
                              alt="Sortonium"
                            />
                          </Link>
                          <div className="flex-fill">
                            <div className="d-flex align-items-start justify-content-between">
                              <div>
                                <h6 className="mb-1">
                                  <Link href={routes.emailreply}>Kevin Alley</Link>
                                </h6>
                                <span className="fw-semibold">
                                  Flash. Sale. Alert.
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-sm rounded-circle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href={routes.emailreply}
                                      >
                                        Open Email
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply All
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward As Attachment
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mark As Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move to Junk
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mute
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Archive
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move To
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <span>
                                  <i className="ti ti-point-filled text-danger" />
                                  3:13 PM
                                </span>
                              </div>
                            </div>
                            <p>You can also use casual language,</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="d-flex align-items-center text-dark btn btn-sm bg-transparent-dark">
                            <i className="ti ti-link me-2" />1
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-soft-danger me-2 shadow-none">
                            <i className="ti ti-square me-1" />
                            External
                          </span>
                          <Link
                            href="#"
                            className="badge badge-dark rounded-pill badge-xs"
                          >
                            +1
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item border-bottom p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                          <Link
                            href={routes.emailreply}
                            className="avatar avatar-md avatar-rounded me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-08.jpg"
                              alt="Sortonium"
                            />
                          </Link>
                          <div className="flex-fill">
                            <div className="d-flex align-items-start justify-content-between">
                              <div>
                                <h6 className="mb-1">
                                  <Link href={routes.emailreply}>Linda Zimmer</Link>
                                </h6>
                                <span className="fw-semibold">
                                  Products the celebs are
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-sm rounded-circle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href={routes.emailreply}
                                      >
                                        Open Email
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply All
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward As Attachment
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mark As Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move to Junk
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mute
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Archive
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move To
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <span>
                                  <i className="ti ti-point-filled text-danger" />
                                  3:13 PM
                                </span>
                              </div>
                            </div>
                            <p>It seems that recipients are receiving...</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="d-flex align-items-center text-dark btn btn-sm bg-transparent-dark">
                            <i className="ti ti-link me-2" />1
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-soft-warning me-2 shadow-none">
                            <i className="ti ti-square me-1" />
                            Work
                          </span>
                          <Link
                            href="#"
                            className="badge badge-dark rounded-pill badge-xs"
                          >
                            +1
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item border-bottom p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                          <Link
                            href={routes.emailreply}
                            className="avatar bg-success avatar-rounded me-2"
                          >
                            <span className="avatar-title">ER</span>
                          </Link>
                          <div className="flex-fill">
                            <div className="d-flex align-items-start justify-content-between">
                              <div>
                                <h6 className="mb-1">
                                  <Link href={routes.emailreply}>Emly Reachel</Link>
                                </h6>
                                <span className="fw-semibold">No Subject</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-sm rounded-circle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href={routes.emailreply}
                                      >
                                        Open Email
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply All
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward As Attachment
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mark As Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move to Junk
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mute
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Archive
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move To
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <span>
                                  <i className="ti ti-point-filled text-danger" />
                                  3:13 PM
                                </span>
                              </div>
                            </div>
                            <p>Announcing Fake Name Generator Premium</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="d-flex align-items-center text-dark btn btn-sm bg-transparent-dark">
                            <i className="ti ti-folder-open me-2" />3
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="badge badge-soft-info shadow-none">
                            <i className="ti ti-square me-1" />
                            Projects
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="form-check form-check-md d-flex align-items-center flex-shrink-0 me-2">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2 flex-fill">
                          <Link
                            href={routes.emailreply}
                            className="avatar avatar-md avatar-rounded me-2"
                          >
                            <img
                              src="assets/img/profiles/avatar-07.jpg"
                              alt="Sortonium"
                            />
                          </Link>
                          <div className="flex-fill">
                            <div className="d-flex align-items-start justify-content-between">
                              <div>
                                <h6 className="mb-1">
                                  <Link href={routes.emailreply}>Sean Hill</Link>
                                </h6>
                                <span className="fw-semibold">You’re missing</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-icon btn-sm rounded-circle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ti ti-dots" />
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href={routes.emailreply}
                                      >
                                        Open Email
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Reply All
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Forward As Attachment
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mark As Unread
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move to Junk
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Mute
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Delete
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Archive
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        className="dropdown-item rounded-1"
                                        href="#"
                                      >
                                        Move To
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                <span>
                                  <i className="ti ti-point-filled text-danger" />
                                  3:13 PM
                                </span>
                              </div>
                            </div>
                            <p>Regardless, you can usually expect an increase</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className="d-flex align-items-center text-dark btn btn-sm bg-transparent-dark me-2">
                            <i className="ti ti-folder-open me-2" />3
                          </span>
                          <span className="d-flex align-items-center text-dark btn btn-sm bg-transparent-dark">
                            <i className="ti ti-photo me-2" />
                            +24
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span>
                            <i className="ti ti-star-filled text-warning" />
                          </span>
                          <span className="badge badge-soft-info mx-2 shadow-none">
                            <i className="ti ti-square me-1" />
                            Applications
                          </span>
                          <Link
                            href="#"
                            className="badge badge-dark rounded-pill badge-xs"
                          >
                            +1
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
  );
}

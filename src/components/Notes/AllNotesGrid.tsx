"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Edit, Eye, Star, Trash2 } from "react-feather";

export default function AllNotesGrid() {
  return (
                <div className="row">
                  <div className="col-md-4 d-flex">
                    <div className="card rounded-3 mb-4 flex-fill">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="badge bg-outline-success d-inline-flex align-items-center">
                            <i className="fas fa-circle fs-6 me-1" />
                            High
                          </span>
                          <div>
                            <Link
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu notes-menu dropdown-menu-end">
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#edit-note-units"
                              >
                                <span>
                                  <Edit />
                                </span>
                                Edit
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#delete_modal"
                              >
                                <span>
                                  <Trash2 />
                                </span>
                                Delete
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                              >
                                <span>
                                  <Star />
                                </span>
                                Not Important
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#view-note-units"
                              >
                                <span>
                                  <Eye />
                                </span>
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Backup Files EOD</Link>
                          </h5>
                          <p className="mb-3 d-flex align-items-center text-dark">
                            <i className="ti ti-calendar me-1" />
                            20 Jan 2024
                          </p>
                          <p className="text-truncate line-clamb-2 text-wrap">
                            Project files should be took backup before end of the
                            day.
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                          <div className="d-flex align-items-center">
                            <Link
                              href="#"
                              className="avatar avatar-md me-2"
                            >
                              <img
                                src="./assets/img/profiles/avatar-05.jpg"
                                alt="Profile"
                                className="img-fluid rounded-circle"
                              />
                            </Link>
                            <span className="text-info d-flex align-items-center">
                              <i className="fas fa-square square-rotate fs-10 me-1" />
                              Personal
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link href="#" className="me-2">
                              <span>
                                <i className="fas fa-star text-warning" />
                              </span>
                            </Link>
                            <Link href="#">
                              <span>
                                <i className="ti ti-trash text-danger" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex">
                    <div className="card rounded-3 mb-4 flex-fill">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="badge bg-outline-danger d-inline-flex align-items-center">
                            <i className="fas fa-circle fs-6 me-1" />
                            Low
                          </span>
                          <div>
                            <Link
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu notes-menu dropdown-menu-end">
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#edit-note-units"
                              >
                                <span>
                                  <Edit />
                                </span>
                                Edit
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#delete_modal"
                              >
                                <span>
                                  <Trash2 />
                                </span>
                                Delete
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                              >
                                <span>
                                  <Star />
                                </span>
                                Not Important
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#view-note-units"
                              >
                                <span>
                                  <Eye />
                                </span>
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">Download Server Logs</Link>
                          </h5>
                          <p className="mb-3 d-flex align-items-center text-dark">
                            <i className="ti ti-calendar me-1" />
                            25 Jan 2024
                          </p>
                          <p className="text-truncate line-clamb-2 text-wrap">
                            Server log is a text document that contains a record
                            of all activity.
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                          <div className="d-flex align-items-center">
                            <Link
                              href="#"
                              className="avatar avatar-md me-2"
                            >
                              <img
                                src="./assets/img/profiles/avatar-06.jpg"
                                alt="Profile"
                                className="img-fluid rounded-circle"
                              />
                            </Link>
                            <span className="text-success d-flex align-items-center">
                              <i className="fas fa-square square-rotate fs-10 me-1" />
                              Work
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link href="#" className="me-2">
                              <span>
                                <i className="fas fa-star text-warning" />
                              </span>
                            </Link>
                            <Link href="#">
                              <span>
                                <i className="ti ti-trash text-danger" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex">
                    <div className="card rounded-3 mb-4 flex-fill">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="badge bg-outline-warning d-inline-flex align-items-center">
                            <i className="fas fa-circle fs-6 me-1" />
                            Medium
                          </span>
                          <div>
                            <Link
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu notes-menu dropdown-menu-end">
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#edit-note-units"
                              >
                                <span>
                                  <Edit />
                                </span>
                                Edit
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#delete_modal"
                              >
                                <span>
                                  <Trash2 />
                                </span>
                                Delete
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                              >
                                <span>
                                  <Star />
                                </span>
                                Not Important
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#view-note-units"
                              >
                                <span>
                                  <Eye />
                                </span>
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">
                              Team meet at Starbucks
                            </Link>
                          </h5>
                          <p className="mb-3 d-flex align-items-center text-dark">
                            <i className="ti ti-calendar me-1" />
                            26 Jan 2024
                          </p>
                          <p className="text-truncate line-clamb-2 text-wrap">
                            Meeting all teamets at Starbucks for identifying them
                            all.
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                          <div className="d-flex align-items-center">
                            <Link
                              href="#"
                              className="avatar avatar-md me-2"
                            >
                              <img
                                src="./assets/img/profiles/avatar-07.jpg"
                                alt="Profile"
                                className="img-fluid rounded-circle"
                              />
                            </Link>
                            <span className="text-warning d-flex align-items-center">
                              <i className="fas fa-square square-rotate fs-10 me-1" />
                              Social
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link href="#" className="me-2">
                              <span>
                                <i className="fas fa-star text-warning" />
                              </span>
                            </Link>
                            <Link href="#">
                              <span>
                                <i className="ti ti-trash text-danger" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex">
                    <div className="card rounded-3 mb-4 flex-fill">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="badge bg-outline-success d-inline-flex align-items-center">
                            <i className="fas fa-circle fs-6 me-1" />
                            High
                          </span>
                          <div>
                            <Link
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu notes-menu dropdown-menu-end">
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#edit-note-units"
                              >
                                <span>
                                  <Edit />
                                </span>
                                Edit
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#delete_modal"
                              >
                                <span>
                                  <Trash2 />
                                </span>
                                Delete
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                              >
                                <span>
                                  <Star />
                                </span>
                                Not Important
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#view-note-units"
                              >
                                <span>
                                  <Eye />
                                </span>
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">
                              Create a compost pile
                            </Link>
                          </h5>
                          <p className="mb-3 d-flex align-items-center text-dark">
                            <i className="ti ti-calendar me-1" />
                            27 Jan 2024
                          </p>
                          <p className="text-truncate line-clamb-2 text-wrap">
                            Compost pile refers to fruit and vegetable scraps,
                            used tea, coffee grounds etc..
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                          <div className="d-flex align-items-center">
                            <Link
                              href="#"
                              className="avatar avatar-md me-2"
                            >
                              <img
                                src="./assets/img/profiles/avatar-08.jpg"
                                alt="Profile"
                                className="img-fluid rounded-circle"
                              />
                            </Link>
                            <span className="text-warning d-flex align-items-center">
                              <i className="fas fa-square square-rotate fs-10 me-1" />
                              Social
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link href="#" className="me-2">
                              <span>
                                <i className="fas fa-star text-warning" />
                              </span>
                            </Link>
                            <Link href="#">
                              <span>
                                <i className="ti ti-trash text-danger" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex">
                    <div className="card rounded-3 mb-4 flex-fill">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="badge bg-outline-danger d-inline-flex align-items-center">
                            <i className="fas fa-circle fs-6 me-1" />
                            Low
                          </span>
                          <div>
                            <Link
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu notes-menu dropdown-menu-end">
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#edit-note-units"
                              >
                                <span>
                                  <Edit />
                                </span>
                                Edit
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#delete_modal"
                              >
                                <span>
                                  <Trash2 />
                                </span>
                                Delete
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                              >
                                <span>
                                  <Star />
                                </span>
                                Not Important
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#view-note-units"
                              >
                                <span>
                                  <Eye />
                                </span>
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">
                              Take a hike at a local park
                            </Link>
                          </h5>
                          <p className="mb-3 d-flex align-items-center text-dark">
                            <i className="ti ti-calendar me-1" />
                            28 Jan 2024
                          </p>
                          <p className="text-truncate line-clamb-2 text-wrap">
                            Hiking involves a long energetic walk in a natural
                            environment.
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                          <div className="d-flex align-items-center">
                            <Link
                              href="#"
                              className="avatar avatar-md me-2"
                            >
                              <img
                                src="./assets/img/profiles/avatar-09.jpg"
                                alt="Profile"
                                className="img-fluid rounded-circle"
                              />
                            </Link>
                            <span className="text-info d-flex align-items-center">
                              <i className="fas fa-square square-rotate fs-10 me-1" />
                              Personal
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link href="#" className="me-2">
                              <span>
                                <i className="fas fa-star text-warning" />
                              </span>
                            </Link>
                            <Link href="#">
                              <span>
                                <i className="ti ti-trash text-danger" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex">
                    <div className="card rounded-3 mb-4 flex-fill">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="badge bg-outline-info d-inline-flex align-items-center">
                            <i className="fas fa-circle fs-6 me-1" />
                            medium
                          </span>
                          <div>
                            <Link
                              href="#"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                            <div className="dropdown-menu notes-menu dropdown-menu-end">
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#edit-note-units"
                              >
                                <span>
                                  <Edit />
                                </span>
                                Edit
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#delete_modal"
                              >
                                <span>
                                  <Trash2 />
                                </span>
                                Delete
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                              >
                                <span>
                                  <Star />
                                </span>
                                Not Important
                              </Link>
                              <Link
                                href="#"
                                className="dropdown-item"
                                data-bs-toggle="modal" data-inert={true}
                                data-bs-target="#view-note-units"
                              >
                                <span>
                                  <Eye />
                                </span>
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="my-3">
                          <h5 className="text-truncate mb-1">
                            <Link href="#">
                              Research a topic interested
                            </Link>
                          </h5>
                          <p className="mb-3 d-flex align-items-center text-dark">
                            <i className="ti ti-calendar me-1" />
                            28 Jan 2024
                          </p>
                          <p className="text-truncate line-clamb-2 text-wrap">
                            Research a topic interested by listen actively and
                            attentively.
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                          <div className="d-flex align-items-center">
                            <Link
                              href="#"
                              className="avatar avatar-md me-2"
                            >
                              <img
                                src="./assets/img/profiles/avatar-10.jpg"
                                alt="Profile"
                                className="img-fluid rounded-circle"
                              />
                            </Link>
                            <span className="text-success d-flex align-items-center">
                              <i className="fas fa-square square-rotate fs-10 me-1" />
                              Work
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link href="#" className="me-2">
                              <span>
                                <i className="fas fa-star text-warning" />
                              </span>
                            </Link>
                            <Link href="#">
                              <span>
                                <i className="ti ti-trash text-danger" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  );
}

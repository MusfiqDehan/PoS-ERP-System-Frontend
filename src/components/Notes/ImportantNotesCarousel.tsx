"use client";
/* eslint-disable @next/next/no-img-element */

import { importantNotesSliderSettings } from "@/components/Notes/sliderSettings";
import Link from "next/link";
import Slider from "react-slick";
import { Edit, Eye, Star, Trash2 } from "react-feather";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImportantNotesCarousel() {
  return (
                <div className="border-bottom mb-4 pb-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                        <div className="d-flex align-items-center mb-3">
                          <h4>Important Notes </h4>
                          <div className="owl-nav slide-nav5 text-end nav-control ms-3" />
                        </div>
                        <div className="notes-close mb-3">
                          <Link
                            href="#"
                            className="text-danger fs-15"
                          >
                            <i className="fas fa-times me-1" /> Close{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">

                      <Slider {...importantNotesSliderSettings} className="notes-slider owl-carousel">
                        <div className="card rounded-3 mb-0">
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
                                  Plan a trip to another country
                                </Link>
                              </h5>
                              <p className="mb-3 d-flex align-items-center text-dark">
                                <i className="ti ti-calendar me-1" />
                                20 Jan 2024
                              </p>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                Space, the final frontier. These are the voyages
                                of the Starship Enterprise.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="avatar avatar-md me-2"
                                >
                                  <img
                                    src="./assets/img/profiles/avatar-01.jpg"
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
                        <div className="card rounded-3 mb-0">
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
                                  Improve touch typing
                                </Link>
                              </h5>
                              <p className="mb-3 d-flex align-items-center text-dark">
                                <i className="ti ti-calendar me-1" />
                                22 Jan 2024
                              </p>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                Well, the way they make shows is, they make one
                                show.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="avatar avatar-md me-2"
                                >
                                  <img
                                    src="./assets/img/profiles/avatar-02.jpg"
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
                        <div className="card rounded-3 mb-0">
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
                                  Learn calligraphy
                                </Link>
                              </h5>
                              <p className="mb-3 d-flex align-items-center text-dark">
                                <i className="ti ti-calendar me-1" />
                                24 Jan 2024
                              </p>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                Calligraphy, the art of beautiful handwriting. The
                                term may derive from the Greek words.{" "}
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="avatar avatar-md me-2"
                                >
                                  <img
                                    src="./assets/img/profiles/avatar-03.jpg"
                                    alt="Profile"
                                    className="img-fluid rounded-circle"
                                  />
                                </Link>
                                <span className="text-info d-flex align-items-center">
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
                        <div className="card rounded-3 mb-0">
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
                                  Plan a trip to another country
                                </Link>
                              </h5>
                              <p className="mb-3 d-flex align-items-center text-dark">
                                <i className="ti ti-calendar me-1" />
                                25 Jan 2024
                              </p>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                Space, the final frontier. These are the voyages
                                of the Starship Enterprise.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="avatar avatar-md me-2"
                                >
                                  <img
                                    src="./assets/img/profiles/avatar-01.jpg"
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
                        <div className="card rounded-3 mb-0">
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
                                  Improve touch typing
                                </Link>
                              </h5>
                              <p className="mb-3 d-flex align-items-center text-dark">
                                <i className="ti ti-calendar me-1" />
                                26 Jan 2024
                              </p>
                              <p className="text-truncate line-clamb-2 text-wrap">
                                Well, the way they make shows is, they make one
                                show.
                              </p>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                              <div className="d-flex align-items-center">
                                <Link
                                  href="#"
                                  className="avatar avatar-md me-2"
                                >
                                  <img
                                    src="./assets/img/profiles/avatar-02.jpg"
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
                      </Slider>
                    </div>
                  </div>
                </div>
  );
}

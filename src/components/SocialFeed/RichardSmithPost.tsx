"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { gallerySliderSettings } from "./sliderSettings";

type RichardSmithPostProps = { open1: boolean; setOpen1: (value: boolean) => void; };

export default function RichardSmithPost(props: RichardSmithPostProps) {
  const { open1, setOpen1 } = props;
  return (
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <div className="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-3">
                        <div className="d-flex align-items-center">
                          <Link
                            href="#"
                            className="avatar avatar-lg avatar-rounded flex-shrink-0 me-2"
                          >
                            <img src="assets/img/users/user-03.jpg" alt="Sortorium" />
                          </Link>
                          <div>
                            <h5 className="mb-1">
                              <Link href="#">
                                Richard Smith{" "}
                                <i className="ti ti-circle-check-filled text-success" />
                              </Link>
                            </h5>
                            <p className="d-flex align-items-center">
                              <span className="text-info">@richard442</span>
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
                          "Believe in yourself and all that you are. Know that there
                          is something inside you that is greater than any obstacle.
                          <Link
                            href="#"
                            className="text-info link-hover"
                          >
                            #MotivationMonday
                          </Link>
                          <Link
                            href="#"
                            className="text-info link-hover"
                          >
                            #Inspiration
                          </Link>
                          🌟"
                        </p>
                      </div>
                      <div className="mb-2">
                        <img
                          src="assets/img/social/social-feed-01.jpg"
                          className="rounded"
                          alt="Sortorium"
                        />
                      </div>
                      <Lightbox
                          open={open1}
                          close={() => setOpen1(false)}
                          slides={[
                              { src: "/react/template/assets/img/social/gallery-big-01.jpg" },
                              { src: "/react/template/assets/img/social/gallery-big-02.jpg" },
                              { src: "/react/template/assets/img/social/gallery-big-03.jpg" },
                              { src: "/react/template/assets/img/social/gallery-big-04.jpg" },
                              { src: "/react/template/assets/img/social/gallery-big-01.jpg" },
                          ]}
                      />
                      <Slider {...gallerySliderSettings} className="social-gallery-slider owl-carousel mb-3">
                        <Link
                           href="#"
                           onClick={() => setOpen1(true)}
                          className="gallery-item"
                        >
                          <img
                            src="assets/img/social/gallery-01.jpg"
                            className="rounded"
                            alt="img"
                          />
                          <span className="avatar avatar-md avatar-rounded">
                            <i className="ti ti-eye" />
                          </span>
                        </Link>
                        <Link
                           href="#"
                           onClick={() => setOpen1(true)}
                          className="gallery-item"
                        >
                          <img
                            src="assets/img/social/gallery-02.jpg"
                            className="rounded"
                            alt="img"
                          />
                          <span className="avatar avatar-md avatar-rounded">
                            <i className="ti ti-eye" />
                          </span>
                        </Link>
                        <Link
                           href="#"
                           onClick={() => setOpen1(true)}
                          className="gallery-item"
                        >
                          <img
                            src="assets/img/social/gallery-03.jpg"
                            className="rounded"
                            alt="img"
                          />
                          <span className="avatar avatar-md avatar-rounded">
                            <i className="ti ti-eye" />
                          </span>
                        </Link>
                        <Link
                           href="#"
                           onClick={() => setOpen1(true)}
                          className="gallery-item"
                        >
                          <img
                            src="assets/img/social/gallery-04.jpg"
                            className="rounded"
                            alt="img"
                          />
                          <span className="avatar avatar-md avatar-rounded">
                            <i className="ti ti-eye" />
                          </span>
                        </Link>
                        <Link
                          href="#"
                          onClick={() => setOpen1(true)}
                          className="gallery-item"
                        >
                          <img
                            src="assets/img/social/gallery-01.jpg"
                            className="rounded"
                            alt="img"
                          />
                          <span className="avatar avatar-md avatar-rounded">
                            <i className="ti ti-eye" />
                          </span>
                        </Link>
                      </Slider>
                      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
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
                            <i className="ti ti-heart-filled text-danger" />
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
                            <i className="ti ti-bookmark-filled text-warning" />
                          </Link>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <Link
                          href="#"
                          className="avatar avatar-rounded me-2 flex-shrink-0"
                        >
                          <img src="assets/img/users/user-11.jpg" alt="Sortorium" />
                        </Link>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Comments"
                        />
                      </div>
                    </div>
                  </div>
  );
}

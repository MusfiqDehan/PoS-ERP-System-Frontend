"use client";
/* eslint-disable @next/next/no-img-element */

import dynamic from "next/dynamic";
import Link from "next/link";
import { filesCarouselSettings } from "@/components/FileManager/filesCarouselSettings";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function RecentFiles() {
  return (
              <div className="border-bottom mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h4 className="mb-2">
                    <Link
                      href="#"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#preview"
                    >
                      Recent Files
                    </Link>
                  </h4>
                  <div className="dropdown mb-2">
                    <Link
                      href="#"
                      className="dropdown-toggle btn btn-white"
                      data-bs-toggle="dropdown"
                    >
                      Last Modified
                    </Link>
                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Newest to Oldest
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Last Modified
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Oldest to Newest
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <Slider {...filesCarouselSettings} className="owl-carousel files-carousel">
                  <div className="files-wrap">
                    <div className="bg-transparent-dark p-5 d-flex align-items-center justify-content-center  files-icon">
                      <i className="ti ti-file-description fs-24 text-title" />
                    </div>
                    <div className="bg-white d-flex align-items-center justify-content-between p-3 files-content">
                      <h6 className="fw-medium">customer_data.txt</h6>
                      <div className="dropdown ms-2">
                        <Link
                          href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link
                              href="#"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#preview"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-folder-open me-2" />
                              Preview
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-copy me-2" />
                              Duplicate
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-arrow-left-right me-2" />
                              Move
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-user-plus me-2" />
                              Invite
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-share-3 me-2" />
                              Share Link
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider my-2" />
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-eye me-2" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-download me-2" />
                              Download
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-trash-x me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="files-wrap">
                    <div className="bg-secondary-transparent p-5 d-flex align-items-center justify-content-center files-icon">
                      <i className="ti ti-file-type-pdf fs-24 text-title" />
                    </div>
                    <div className="bg-white d-flex align-items-center justify-content-between p-3 files-content">
                      <h6 className="fw-medium text-truncate">
                        <Link
                          href="#"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#preview"
                        >
                          video_player_installer_setup.rar
                        </Link>
                      </h6>
                      <div className="dropdown ms-2">
                        <Link
                          href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link
                              href="#"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#preview"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-folder-open me-2" />
                              Preview
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-copy me-2" />
                              Duplicate
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-arrow-left-right me-2" />
                              Move
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-user-plus me-2" />
                              Invite
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-share-3 me-2" />
                              Share Link
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider my-2" />
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-eye me-2" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-download me-2" />
                              Download
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-trash-x me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="files-wrap">
                    <div className="bg-secondary-transparent p-5 d-flex align-items-center justify-content-center files-icon">
                      <i className="fa-regular fa-file-audio fs-24 text-title" />
                    </div>
                    <div className="bg-white d-flex align-items-center justify-content-between p-3 files-content">
                      <h6 className="fw-medium text-truncate">
                        <Link
                          href="#"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#preview"
                        >
                          recording.mp3
                        </Link>
                      </h6>
                      <div className="dropdown ms-2">
                        <Link
                          href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link
                              href="#"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#preview"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-folder-open me-2" />
                              Preview
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-copy me-2" />
                              Duplicate
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-arrow-left-right me-2" />
                              Move
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-user-plus me-2" />
                              Invite
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-share-3 me-2" />
                              Share Link
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider my-2" />
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-eye me-2" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-download me-2" />
                              Download
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-trash-x me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="files-wrap">
                    <div className="bg-secondary-transparent p-5 d-flex align-items-center justify-content-center files-icon">
                      <i className="fa-solid fa-file-zipper fs-24 text-title" />
                    </div>
                    <div className="bg-white d-flex align-items-center justify-content-between p-3 files-content">
                      <h6 className="fw-medium">
                        <Link
                          href="#"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#preview"
                        >
                          header_file.zip
                        </Link>
                      </h6>
                      <div className="dropdown ms-2">
                        <Link
                          href="#"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots" />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link
                              href="#"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#preview"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-folder-open me-2" />
                              Preview
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-copy me-2" />
                              Duplicate
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-arrow-left-right me-2" />
                              Move
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-user-plus me-2" />
                              Invite
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-share-3 me-2" />
                              Share Link
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider my-2" />
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-eye me-2" />
                              View Details
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-download me-2" />
                              Download
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item rounded-1">
                              <i className="ti ti-trash-x me-2" />
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
  );
}

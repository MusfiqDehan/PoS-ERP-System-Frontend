"use client";
/* eslint-disable @next/next/no-img-element */

export default function RecentFolders() {
  return (
              <div className="border-bottom mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h4 className="mb-2">Recent Folders</h4>
                  <div className="dropdown mb-2">
                    <a
                      href="javascript:void(0);"
                      className="dropdown-toggle btn btn-white"
                      data-bs-toggle="dropdown"
                    >
                      Last 7 Days
                    </a>
                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                        >
                          Last 7 Days
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                        >
                          Last 1 month
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                        >
                          Last 1 year
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="owl-carousel folders-carousel">
                  <div className="folder-wrap bg-white d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="text-warning fs-30">
                        <i className="ti ti-folder-filled" />
                      </span>
                      <div className="ms-2">
                        <h6 className="mb-1">
                          <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            Personal Assets
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <p className="fs-12 mb-0 me-2">2.4 GB</p>
                          <p className="fs-12 mb-0 d-flex align-items-center">
                            <i className="ti ti-circle-filled fs-6 me-2 text-title" />
                            135&nbsp;files
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="avatar-list-stacked avatar-group-sm">
                        <span className="avatar avatar-rounded">
                          <img
                            className="border border-white"
                            src="assets/img/profiles/avatar-19.jpg"
                            alt="img"
                          />
                        </span>
                        <span className="avatar avatar-rounded">
                          <img
                            className="border border-white"
                            src="assets/img/profiles/avatar-29.jpg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dropdown ms-2">
                        <a
                          href="javascript:void(0);"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#preview"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-folder-open me-2" />
                              Preview
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-copy me-2" />
                              Duplicate
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-arrow-left-right me-2" />
                              Move
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-user-plus me-2" />
                              Invite
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-share-3 me-2" />
                              Share Link
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider my-2" />
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-eye me-2" />
                              View Details
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-download me-2" />
                              Download
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-trash-x me-2" />
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="folder-wrap bg-white d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="text-warning fs-30">
                        <i className="ti ti-folder-filled" />
                      </span>
                      <div className="ms-2">
                        <h6 className="mb-1">
                          <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            Document
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <p className="fs-12 mb-0 me-2">4 GB</p>
                          <p className="fs-12 mb-0 d-flex align-items-center">
                            <i className="ti ti-circle-filled fs-6 me-2 text-title" />
                            15&nbsp;files
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="avatar-list-stacked avatar-group-sm">
                        <span className="avatar avatar-rounded">
                          <img
                            className="border border-white"
                            src="assets/img/profiles/avatar-05.jpg"
                            alt="img"
                          />
                        </span>
                        <span className="avatar avatar-rounded">
                          <img
                            className="border border-white"
                            src="assets/img/profiles/avatar-02.jpg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dropdown ms-2">
                        <a
                          href="javascript:void(0);"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#preview"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-folder-open me-2" />
                              Preview
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-copy me-2" />
                              Duplicate
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-arrow-left-right me-2" />
                              Move
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-user-plus me-2" />
                              Invite
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-share-3 me-2" />
                              Share Link
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider my-2" />
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-eye me-2" />
                              View Details
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-download me-2" />
                              Download
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-trash-x me-2" />
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="folder-wrap bg-white d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="text-warning fs-30">
                        <i className="ti ti-folder-filled" />
                      </span>
                      <div className="ms-2">
                        <h6 className="mb-1">
                          <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            Handyimages
                          </a>
                        </h6>
                        <div className="d-flex align-items-center">
                          <p className="fs-12 mb-0 me-2">1.4 GB</p>
                          <p className="fs-12 mb-0 d-flex align-items-center">
                            <i className="ti ti-circle-filled fs-6 me-2 text-title" />
                            115&nbsp;files
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="dropdown ms-2">
                        <a
                          href="javascript:void(0);"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <a
                              href="javascript:void(0);"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#preview"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-folder-open me-2" />
                              Preview
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-copy me-2" />
                              Duplicate
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-arrow-left-right me-2" />
                              Move
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-user-plus me-2" />
                              Invite
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-share-3 me-2" />
                              Share Link
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider my-2" />
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-eye me-2" />
                              View Details
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-download me-2" />
                              Download
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-trash-x me-2" />
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  );
}

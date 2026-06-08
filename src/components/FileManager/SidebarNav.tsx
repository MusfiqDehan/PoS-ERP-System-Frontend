"use client";
/* eslint-disable @next/next/no-img-element */

export default function SidebarNav() {
  return (
              <div className="card">
                <div className="card-body p-3">
                  <div className="shadow-xs p-2 mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center overflow-hidden">
                        <span className="avatar avatar-md rounded-circle">
                          <img
                            src="assets/img/profiles/avatar-29.jpg"
                            alt="img"
                            className="rounded-circle"
                          />
                        </span>
                        <div className="overflow-hidden ms-2">
                          <h5 className="text-truncate">James Hong</h5>
                          <p className="fs-12 text-truncate">
                            Jnh343@example.com
                          </p>
                        </div>
                      </div>
                      <div className="dropdown ms-2">
                        <a
                          href="javascript:void(0);"
                          className="d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-dots" />
                        </a>
                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                          <li>
                            <a
                              href="javascript:void(0);"
                              className="dropdown-item rounded-1"
                            >
                              <i className="ti ti-edit me-1" />
                              Edit
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="file-drop mb-3 text-center">
                    <span className="avatar avatar-sm bg-primary text-white mb-2">
                      <i className="ti ti-upload fs-16" />
                    </span>
                    <h6 className="mb-2">Drop files here</h6>
                    <p className="fs-12 mb-0">
                      Browse and chose the files you want to upload from your
                      computer
                    </p>
                    <input type="file" />
                  </div>
                  <div className="files-list nav d-block">
                    <a
                      href="#"
                      className="d-flex align-items-center fw-medium p-2 active"
                    >
                      <i className="ti ti-folder-up me-2" />
                      All Folder / Files
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center fw-medium p-2"
                    >
                      <i className="ti ti-star me-2" />
                      Drive
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center fw-medium p-2"
                    >
                      <i className="ti ti-octahedron me-2" />
                      Dropbox
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center fw-medium p-2"
                    >
                      <i className="ti ti-share-2 me-2" />
                      Shared with Me
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center fw-medium p-2"
                    >
                      <i className="ti ti-file me-2" />
                      Document
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center fw-medium p-2"
                    >
                      <i className="ti ti-clock-hour-11 me-2" />
                      Recent File
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center fw-medium p-2"
                    >
                      <i className="ti ti-star me-2" />
                      Important
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center fw-medium p-2"
                    >
                      <i className="ti ti-music me-2" />
                      Media
                    </a>
                  </div>
                </div>
              </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

export default function FilesTable() {
  return (
    <>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h4 className="mb-2">Files</h4>
                <div className="d-flex align-items-center">
                  <div className="dropdown mb-2 me-2">
                    <a
                      href="javascript:void(0);"
                      className="dropdown-toggle btn btn-white"
                      data-bs-toggle="dropdown"
                    >
                      Sort By : Docs Type
                    </a>
                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                        >
                          Docs
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                        >
                          Pdf
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                        >
                          Image
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                        >
                          Folder
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          className="dropdown-item rounded-1"
                        >
                          Xml
                        </a>
                      </li>
                    </ul>
                  </div>
                  <a
                    href="javascript:void(0);"
                    className="link-primary fw-medium mb-2"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div className="table-responsive mb-4">
                <table className="table datatable">
                  <thead className="thead-light">
                    <tr>
                      <th className="no-sort">
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="select-all"
                          />
                        </div>
                      </th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Type</th>
                      <th>Modified</th>
                      <th>Share</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center file-name-icon">
                          <a
                            href="#"
                            className="avatar avatar-md bg-light"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            <img
                              src="assets/img/icons/file-01.svg"
                              className="img-fluid"
                              alt="img"
                            />
                          </a>
                          <div className="ms-2">
                            <p className="text-title fw-medium  mb-0">
                              <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#preview"
                              >
                                Secret
                              </a>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>7.6 MB</td>
                      <td>Doc</td>
                      <td>
                        <p className="text-title mb-0">Mar 15, 2025</p>
                        <span>05:00:14 PM</span>
                      </td>
                      <td>
                        <div className="avatar-list-stacked avatar-group-sm">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-27.jpg"
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
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-12.jpg"
                              alt="img"
                            />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rating-select me-2">
                            <a href="javascript:void(0);">
                              <i className="ti ti-star" />
                            </a>
                          </div>
                          <div className="dropdown">
                            <a
                              href="#"
                              className="d-flex align-items-center justify-content-center"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-dots fs-14" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right p-3">
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-trash me-2" />
                                  Permanent Delete
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-edit-circle me-2" />
                                  Restore File
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center file-name-icon">
                          <a
                            href="#"
                            className="avatar avatar-md bg-light"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            <img
                              src="assets/img/icons/file-02.svg"
                              className="img-fluid"
                              alt="img"
                            />
                          </a>
                          <div className="ms-2">
                            <p className="text-title fw-medium  mb-0">
                              <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#preview"
                              >
                                Sophie Headrick
                              </a>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>7.4 MB</td>
                      <td>PDF</td>
                      <td>
                        <p className="text-title mb-0">Jan 8, 2025</p>
                        <span>08:20:13 PM</span>
                      </td>
                      <td>
                        <div className="avatar-list-stacked avatar-group-sm">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-15.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-16.jpg"
                              alt="img"
                            />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rating-select me-2">
                            <a href="javascript:void(0);">
                              <i className="ti ti-star" />
                            </a>
                          </div>
                          <div className="dropdown">
                            <a
                              href="#"
                              className="d-flex align-items-center justify-content-center"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-dots fs-14" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right p-3">
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-trash me-2" />
                                  Permanent Delete
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-edit-circle me-2" />
                                  Restore File
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center file-name-icon">
                          <a
                            href="#"
                            className="avatar avatar-md bg-light"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            <img
                              src="assets/img/icons/file-03.svg"
                              className="img-fluid"
                              alt="img"
                            />
                          </a>
                          <div className="ms-2">
                            <p className="text-title fw-medium  mb-0">
                              <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#preview"
                              >
                                Gallery
                              </a>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>6.1 MB</td>
                      <td>Image</td>
                      <td>
                        <p className="text-title mb-0">Aug 6, 2025</p>
                        <span>04:10:12 PM</span>
                      </td>
                      <td>
                        <div className="avatar-list-stacked avatar-group-sm">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-02.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-03.jpg"
                              alt="img"
                            />
                          </span>
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
                              src="assets/img/profiles/avatar-06.jpg"
                              alt="img"
                            />
                          </span>
                          <a
                            className="avatar bg-primary avatar-rounded text-fixed-white"
                            href="javascript:void(0);"
                          >
                            +1
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rating-select me-2">
                            <a href="javascript:void(0);">
                              <i className="ti ti-star" />
                            </a>
                          </div>
                          <div className="dropdown">
                            <a
                              href="#"
                              className="d-flex align-items-center justify-content-center"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-dots fs-14" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right p-3">
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-trash me-2" />
                                  Permanent Delete
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-edit-circle me-2" />
                                  Restore File
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center file-name-icon">
                          <a
                            href="#"
                            className="avatar avatar-md bg-light"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            <img
                              src="assets/img/icons/file-04.svg"
                              className="img-fluid"
                              alt="img"
                            />
                          </a>
                          <div className="ms-2">
                            <p className="text-title fw-medium  mb-0">
                              <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#preview"
                              >
                                Doris Crowley
                              </a>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>5.2 MB</td>
                      <td>Folder</td>
                      <td>
                        <p className="text-title mb-0">Jan 6, 2025</p>
                        <span>03:40:14 PM</span>
                      </td>
                      <td>
                        <div className="avatar-list-stacked avatar-group-sm">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-06.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-10.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-15.jpg"
                              alt="img"
                            />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rating-select me-2">
                            <a href="javascript:void(0);">
                              <i className="ti ti-star" />
                            </a>
                          </div>
                          <div className="dropdown">
                            <a
                              href="#"
                              className="d-flex align-items-center justify-content-center"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-dots fs-14" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right p-3">
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-trash me-2" />
                                  Permanent Delete
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-edit-circle me-2" />
                                  Restore File
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center file-name-icon">
                          <a
                            href="#"
                            className="avatar avatar-md bg-light"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            <img
                              src="assets/img/icons/file-05.svg"
                              className="img-fluid"
                              alt="img"
                            />
                          </a>
                          <div className="ms-2">
                            <p className="text-title fw-medium  mb-0">
                              <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#preview"
                              >
                                Cheat_codez
                              </a>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>8 MB</td>
                      <td>Xml</td>
                      <td>
                        <p className="text-title mb-0">Oct 12, 2025</p>
                        <span>05:00:14 PM</span>
                      </td>
                      <td>
                        <div className="avatar-list-stacked avatar-group-sm">
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-04.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-28.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-14.jpg"
                              alt="img"
                            />
                          </span>
                          <span className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src="assets/img/profiles/avatar-15.jpg"
                              alt="img"
                            />
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rating-select me-2">
                            <a href="javascript:void(0);">
                              <i className="ti ti-star" />
                            </a>
                          </div>
                          <div className="dropdown">
                            <a
                              href="#"
                              className="d-flex align-items-center justify-content-center"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ti ti-dots fs-14" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right p-3">
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-trash me-2" />
                                  Permanent Delete
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item rounded-1" href="#">
                                  <i className="ti ti-edit-circle me-2" />
                                  Restore File
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
    </>
  );
}

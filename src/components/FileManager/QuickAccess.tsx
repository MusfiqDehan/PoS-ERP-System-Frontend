"use client";
/* eslint-disable @next/next/no-img-element */

export default function QuickAccess() {
  return (
              <div className="border-bottom mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h4 className="mb-2">Quick Access</h4>
                  <div>
                    <a
                      href="javascript:void(0);"
                      className="mb-2 me-3 fw-medium link-default"
                    >
                      Close
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="mb-2 fw-medium link-default"
                    >
                      View All
                    </a>
                  </div>
                </div>
                <div className="row row-cols-xxl-5 row-cols-xl-3 row-cols-sm-3 row-cols-1 justify-content-center">
                  <div className="col d-flex">
                    <div className="card access-wrap flex-fill">
                      <div className="card-body text-center">
                        <img
                          src="assets/img/icons/file.svg"
                          alt="img"
                          className="mb-3"
                        />
                        <h6 className="mb-2 fw-medium">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            Final.doc
                          </a>
                        </h6>
                        <span className="badge badge-dark-transparent">
                          2.4 GB
                        </span>
                      </div>
                      <span className="access-rate rating-select">
                        <i className="ti ti-star-filled filled" />
                      </span>
                    </div>
                  </div>
                  <div className="col d-flex">
                    <div className="card access-wrap flex-fill">
                      <div className="card-body text-center">
                        <img
                          src="assets/img/icons/pdf-icon.svg"
                          alt="img"
                          className="mb-3"
                        />
                        <h6 className="mb-2 fw-medium">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            Marklist.pdf
                          </a>
                        </h6>
                        <span className="badge badge-dark-transparent">
                          2.4 GB
                        </span>
                      </div>
                      <span className="access-rate rating-select">
                        <i className="ti ti-star" />
                      </span>
                    </div>
                  </div>
                  <div className="col d-flex">
                    <div className="card access-wrap flex-fill">
                      <div className="card-body text-center">
                        <img
                          src="assets/img/icons/image.svg"
                          alt="img"
                          className="mb-3"
                        />
                        <h6 className="mb-2 fw-medium">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            Nature.png
                          </a>
                        </h6>
                        <span className="badge badge-dark-transparent">
                          2.4 GB
                        </span>
                      </div>
                      <span className="access-rate rating-select">
                        <i className="ti ti-star-filled filled" />
                      </span>
                    </div>
                  </div>
                  <div className="col d-flex">
                    <div className="card access-wrap flex-fill">
                      <div className="card-body text-center">
                        <img
                          src="assets/img/icons/xls-icon.svg"
                          alt="img"
                          className="mb-3"
                        />
                        <h6 className="mb-2 fw-medium">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            List.xlsx
                          </a>
                        </h6>
                        <span className="badge badge-dark-transparent">
                          2.4 GB
                        </span>
                      </div>
                      <span className="access-rate rating-select">
                        <i className="ti ti-star" />
                      </span>
                    </div>
                  </div>
                  <div className="col d-flex">
                    <div className="card access-wrap flex-fill">
                      <div className="card-body text-center">
                        <img
                          src="assets/img/icons/folder-icon.svg"
                          alt="img"
                          className="mb-3"
                        />
                        <h6 className="mb-2 fw-medium">
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#preview"
                          >
                            Group Photos
                          </a>
                        </h6>
                        <span className="badge badge-dark-transparent">
                          2.4 GB
                        </span>
                      </div>
                      <span className="access-rate rating-select">
                        <i className="ti ti-star" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

export default function InternalStorageCard() {
  return (
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <img src="assets/img/icons/storage.svg" alt="img" />
                      <h5 className="ms-2">Internal Storage</h5>
                    </div>
                    <div className="dropdown">
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
                            className="dropdown-item rounded-1"
                          >
                            <i className="ti ti-folder-open me-2" />
                            Open
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item rounded-1"
                          >
                            <i className="ti ti-trash me-1" />
                            Delete All
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item rounded-1"
                          >
                            <i className="ti ti-status-change me-1" />
                            Reset
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="progress progress-xs flex-grow-1 mb-2">
                    <div
                      className="progress-bar bg-purple rounded"
                      role="progressbar"
                      style={{ width: "20%" }}
                      aria-valuenow={30}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">144 Files</p>
                    <p className="text-title mb-0">54GB</p>
                  </div>
                </div>
              </div>
            </div>
  );
}

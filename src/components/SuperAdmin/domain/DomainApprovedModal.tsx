"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function DomainApprovedModal() {
  return (
        <div className="modal fade" id="domain_approved">
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title d-flex align-items-center">
                  Domain Detail
                  <span className="badge bg-outline-success d-inline-flex align-items-center badge-xs ms-2">
                    <i className="ti ti-point-filled" />
                    Approved
                  </span>
                </h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close p-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form>
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <div className="p-3 mb-3 br-5 bg-transparent-light">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="d-flex align-items-center file-name-icon">
                                <Link
                                  href="#"
                                  className="avatar avatar-md border avatar-rounded"
                                >
                                  <img
                                    src="assets/img/company/company-01.svg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium fs-14">
                                    <Link href="#">BrightWave Innovations</Link>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <span className="fs-12">Plan Name</span>
                        <h6 className="fw-normal">Advanced</h6>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <span className="fs-12">Plan Type</span>
                        <h6 className="fw-normal">Monthly</h6>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <span className="fs-12">Account URL</span>
                        <h6 className="fw-normal">bwi.example.com</h6>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <span className="fs-12">Price</span>
                        <h6 className="fw-normal">200</h6>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <span className="fs-12">Register Date</span>
                        <h6 className="fw-normal">12 Sep 2024</h6>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <span className="fs-12">Expiring On</span>
                        <h6 className="fw-normal">11 Oct 2024</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

import Select from "react-select";
import Link from "next/link";
import {
  currency,
  language,
  planName,
  planType,
  statusChoose,
} from "@/core/common/selectOption/selectOption";

type PasswordVisibilityState = {
  password: boolean;
  confirmPassword: boolean;
};

type PasswordModalProps = {
  passwordVisibility: PasswordVisibilityState;
  togglePasswordVisibility: (field: keyof PasswordVisibilityState) => void;
};


export default function AddCompanyModal({
  passwordVisibility,
  togglePasswordVisibility,
}: PasswordModalProps) {
  return (
        <div className="modal fade" id="add_company">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add New Company</h4>
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
                      <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                        <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                          <i className="ti ti-photo" />
                        </div>
                        <div className="profile-upload">
                          <div className="mb-2">
                            <h6 className="mb-1">Upload Profile Image</h6>
                            <p className="fs-12">Image should be below 4 mb</p>
                          </div>
                          <div className="profile-uploader d-flex align-items-center">
                            <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                              Upload
                              <input type="file" className="form-control image-sign" multiple />
                            </div>
                            <Link href="#" className="btn btn-secondary btn-sm">
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Name <span className="text-danger"> *</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Account URL</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Phone Number <span className="text-danger"> *</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Website</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Password <span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input
                            type={
                              passwordVisibility.password
                                ? "text"
                                : "password"
                            }
                            className="pass-input form-control"
                          />
                          <span
                            className={`ti toggle-passwords ${passwordVisibility.password
                              ? "ti-eye"
                              : "ti-eye-off"
                              }`}
                            onClick={() =>
                              togglePasswordVisibility("password")
                            }
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Confirm Password <span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input
                            type={
                              passwordVisibility.confirmPassword
                                ? "text"
                                : "password"
                            }
                            className="pass-input form-control"
                          />
                          <span
                            className={`ti toggle-passwords ${passwordVisibility.confirmPassword
                              ? "ti-eye"
                              : "ti-eye-off"
                              }`}
                            onClick={() =>
                              togglePasswordVisibility("confirmPassword")
                            }
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Name <span className="text-danger"> *</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={planName}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Type <span className="text-danger"> *</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={planType}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Currency <span className="text-danger"> *</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={currency}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Language <span className="text-danger"> *</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={language}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3 ">
                        <label className="form-label">Status</label>
                        <Select
                          classNamePrefix="react-select"
                          options={statusChoose}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                    Add Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
}

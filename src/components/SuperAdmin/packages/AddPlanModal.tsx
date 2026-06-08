"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Select from "react-select";
import {
  discountType,
  planName,
  planPosition,
  planType,
  plancurrency,
  status,
} from "@/components/SuperAdmin/packages/planSelectOptions";

export default function AddPlanModal() {
  return (
        <div className="modal fade" id="add_plans">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add New Plan</h4>
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
                          <img
                            src="assets/img/profiles/avatar-30.jpg"
                            alt="img"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="profile-upload">
                          <div className="mb-2">
                            <h6 className="mb-1">Upload Profile Image</h6>
                            <p className="fs-12">Image should be below 4 mb</p>
                          </div>
                          <div className="profile-uploader d-flex align-items-center">
                            <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                              Upload
                              <input
                                type="file"
                                className="form-control image-sign"
                                multiple
                              />
                            </div>
                            <Link
                              href="#"
                              className="btn btn-light btn-sm"
                            >
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Name<span className="text-danger"> *</span>
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
                          Plan Type<span className="text-danger"> *</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={planType}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Position<span className="text-danger"> *</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={planPosition}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={plancurrency}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <label className="form-label">
                            Plan Currency<span className="text-danger"> *</span>
                          </label>
                          <span className="text-primary">
                            <i className="fa-solid fa-circle-exclamation me-2" />
                            Set 0 for free
                          </span>
                        </div>
                        <Select
                          classNamePrefix="react-select"
                          options={plancurrency}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Discount Type<span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <Select
                            classNamePrefix="react-select"
                            options={discountType}
                            placeholder="Choose"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Discount<span className="text-danger"> *</span>
                        </label>
                        <div className="pass-group">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Limitations Invoices</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Max Customers</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Product</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="mb-3">
                        <label className="form-label">Supplier</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h6>Plan Modules</h6>
                        <div className="form-check d-flex align-items-center">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Select All
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Employees
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Invoices
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Reports
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Contacts
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Clients
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Estimates
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Goals
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Deals
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Projects
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Payments
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Assets
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Leads
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Tickets
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Taxes
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Activities
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <div className="form-check d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 text-dark fw-medium">
                            <input className="form-check-input" type="checkbox" />
                            Pipelines
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-3">
                          <label className="form-check-label mt-0 me-2 text-dark fw-medium">
                            Access Trial
                          </label>
                          <div className="form-check form-switch me-2">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              role="switch"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-center gx-3">
                      <div className="col-md-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="flex-fill">
                            <label className="form-label">Trial Days</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="d-block align-items-center ms-3">
                          <label className="form-check-label mt-0 me-2 text-dark">
                            Is Recommended
                          </label>
                          <div className="form-check form-switch me-2">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              role="switch"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mb-3 ">
                          <label className="form-label">
                            Status<span className="text-danger"> *</span>
                          </label>
                          <Select
                            classNamePrefix="react-select"
                            options={status}
                            placeholder="Choose"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" defaultValue={""} />
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
                  <Link href="button" data-bs-dismiss="modal" className="btn btn-primary" >
                    Add Plan
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
}

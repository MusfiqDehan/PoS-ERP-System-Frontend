"use client";
/* eslint-disable @next/next/no-img-element */

import { DatePicker } from "antd";
import Select from "react-select";
import Link from "next/link";
import {
  currency,
  language,
  planName,
  planType,
  statusChoose,
} from "@/core/common/selectOption/selectOption";

type UpgradeInfoModalProps = {
  getModalContainer: () => HTMLElement;
};

export default function UpgradeInfoModal({
  getModalContainer,
}: UpgradeInfoModalProps) {
  return (
        <div className="modal fade" id="upgrade_info">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Upgrade Package</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close p-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="p-3 mb-1">
                <div className="rounded bg-light p-3">
                  <h5 className="mb-3">Current Plan Details</h5>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Company Name</p>
                        <p className="text-gray-9">BrightWave Innovations</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Plan Name</p>
                        <p className="text-gray-9">Advanced</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Plan Type</p>
                        <p className="text-gray-9">Monthly</p>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Price</p>
                        <p className="text-gray-9">200</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Register Date</p>
                        <p className="text-gray-9">12 Sep 2024</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <p className="fs-12 mb-0">Expiring On</p>
                        <p className="text-gray-9">11 Oct 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form>
                <div className="modal-body pb-0">
                  <h5 className="mb-4">Change Plan</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Plan Name <span className="text-danger">*</span>
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
                          Plan Type <span className="text-danger">*</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={planType}
                          placeholder="Choose"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Ammount<span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Payment Date <span className="text-danger">*</span>
                        </label>
                        <div className="input-icon-end position-relative">
                          <DatePicker
                            className="form-control datetimepicker"
                            format={{
                              format: "DD-MM-YYYY",
                              type: "mask",
                            }}
                            getPopupContainer={getModalContainer}
                            placeholder="DD-MM-YYYY"
                          />
                          <span className="input-icon-addon">
                            <i className="ti ti-calendar text-gray-7" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Next Payment Date <span className="text-danger">*</span>
                        </label>
                        <div className="input-icon-end position-relative">
                          <DatePicker
                            className="form-control datetimepicker"
                            format={{
                              format: "DD-MM-YYYY",
                              type: "mask",
                            }}
                            getPopupContainer={getModalContainer}
                            placeholder="DD-MM-YYYY"
                          />
                          <span className="input-icon-addon">
                            <i className="ti ti-calendar text-gray-7" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Expiring On <span className="text-danger">*</span>
                        </label>
                        <div className="input-icon-end position-relative">
                          <DatePicker
                            className="form-control datetimepicker"
                            format={{
                              format: "DD-MM-YYYY",
                              type: "mask",
                            }}
                            getPopupContainer={getModalContainer}
                            placeholder="DD-MM-YYYY"
                          />
                          <span className="input-icon-addon">
                            <i className="ti ti-calendar text-gray-7" />
                          </span>
                        </div>
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
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
}

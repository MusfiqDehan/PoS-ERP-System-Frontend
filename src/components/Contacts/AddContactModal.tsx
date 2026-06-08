"use client";
/* eslint-disable @next/next/no-img-element */

import { PlusCircle } from "react-feather";
import Link from "next/link";
import Select from "react-select";
import { contactType } from "@/core/common/selectOption/selectOption";

export default function AddContactModal() {
  return (
            <div className="modal fade" id="add-contact">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="page-title">
                                <h4>Add Contact</h4>
                            </div>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form >
                            <div className="modal-body">
                                <div className="new-employee-field">
                                    <div className="profile-pic-upload">
                                        <div className="profile-pic">
                                            <span>
                                                <PlusCircle size={14} className="plus-down-add" />
                                                Add Image
                                            </span>
                                        </div>
                                        <div className="mb-3">
                                            <div className="image-upload mb-0">
                                                <input type="file" />
                                                <div className="image-uploads">
                                                    <h4>Upload Image</h4>
                                                </div>
                                            </div>
                                            <p className="mt-2">JPEG, PNG up to 2 MB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <label className="form-label">
                                            First Name<span className="text-danger ms-1">*</span>
                                        </label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label className="form-label">
                                            Last Name<span className="text-danger ms-1">*</span>
                                        </label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label">
                                            Email<span className="text-danger ms-1">*</span>
                                        </label>
                                        <input type="email" className="form-control" />
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label">
                                            Phone<span className="text-danger ms-1">*</span>
                                        </label>
                                        <input type="tel" className="form-control" />
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Contact Type <span className="text-danger">*</span>
                                            </label>
                                            <Select
                                                classNamePrefix="react-select"
                                                options={contactType}
                                                placeholder="Choose"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                                            <span className="status-label">Status</span>
                                            <input
                                                type="checkbox"
                                                id="user2"
                                                className="check"
                                                defaultChecked
                                            />
                                            <label htmlFor="user2" className="checktoggle">
                                                {" "}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                                >
                                    Add Contact
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
  );
}

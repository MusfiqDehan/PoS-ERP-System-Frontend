"use client";
/* eslint-disable @next/next/no-img-element */

import TextField from "@/core/common/form/TextField";
import Link from "next/link";
import { X } from "react-feather";

export default function EditBrandModal() {
  return (
    <div className="modal fade" id="edit-brand">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Edit Brand</h4>
                </div>
                <button
                  type="button"
                  className="close bg-danger text-white fs-16"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body custom-modal-body new-employee-field">
                <form>
                  <div className="profile-pic-upload mb-3">
                    <div className="profile-pic brand-pic">
                      <span>
                        <img
                          src="assets/img/brand/brand-icon-02.png"
                          alt="Sortonium"
                        />
                      </span>
                      <Link href="#" className="remove-photo">
                        <X className="x-square-add" />
                      </Link>
                    </div>
                    <div>
                      <div className="image-upload mb-0">
                        <input type="file" />
                        <div className="image-uploads">
                          <h4>Change Image</h4>
                        </div>
                      </div>
                      <p className="mt-2">JPEG, PNG up to 2 MB</p>
                    </div>
                  </div>
                  <TextField label="Brand" required className="mb-3" />
                  <div className="mb-0">
                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                      <span className="status-label">Status</span>
                      <input
                        type="checkbox"
                        id="user4"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="user4" className="checktoggle" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <Link
                  href="#"
                  data-bs-dismiss="modal"
                  className="btn btn-primary fs-13 fw-medium p-2 px-3"
                >
                  Save Changes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

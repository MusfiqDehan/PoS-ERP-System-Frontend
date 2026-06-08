"use client";

import TextField from "@/core/common/form/TextField";
import Link from "next/link";

export default function AddVariantAttributeModal() {
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Add Variant</h4>
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
              <div className="modal-body custom-modal-bodys">
                <form>
                  <TextField label="Variant" required className="mb-3" />
                  <div className="mb-3">
                    <label className="form-label">
                      Values<span className="text-danger ms-1">*</span>
                    </label>
                    <span className="tag-text mt-2 d-flex">
                      Enter value separated by comma
                    </span>
                  </div>
                  <div className="mb-0 mt-4">
                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                      <span className="status-label">Status</span>
                      <input
                        type="checkbox"
                        id="user2"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="user2" className="checktoggle" />
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
                  className="btn btn-primary fs-13 fw-medium p-2 px-3"
                  data-bs-dismiss="modal"
                >
                  Add Variant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import TextField from "@/core/common/form/TextField";
import Link from "next/link";

export default function AddCategoryModal() {
  return (
    <div className="modal fade" id="add-category">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Add Category</h4>
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
              <div className="modal-body">
                <form>
                  <TextField
                    label="Category"
                    required
                    className="mb-3"
                  />
                  <TextField
                    label="Category Slug"
                    required
                    className="mb-3"
                  />
                  <div className="mb-0">
                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                      <span className="status-label">
                        Status<span className="text-danger ms-1">*</span>
                      </span>
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
                  data-bs-dismiss="modal"
                  className="btn btn-primary fs-13 fw-medium p-2 px-3"
                >
                  Add Category
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

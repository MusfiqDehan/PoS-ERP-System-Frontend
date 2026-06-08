"use client";

import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import { Category } from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import { useState } from "react";
import DefaultEditor from "react-simple-wysiwyg";

export default function AddSubCategoryModal() {
  const [description, setDescription] = useState<string | undefined>();

  return (
    <div className="modal fade" id="add-category">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Add Sub Category</h4>
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
                  <div className="mb-3">
                    <div className="add-image-upload">
                      <div className="add-image">
                        <span className="fw-normal">
                          <i
                            data-feather="plus-circle"
                            className="plus-down-add"
                          />{" "}
                          Add Image
                        </span>
                      </div>
                      <div className="new-employee-field">
                        <div className="mb-0">
                          <div className="image-upload mb-2">
                            <input type="file" />
                            <div className="image-uploads">
                              <h4 className="fs-13 fw-medium">Upload Image</h4>
                            </div>
                          </div>
                          <span>JPEG, PNG up to 2 MB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <SelectField
                    label="Category"
                    required
                    className="mb-3"
                    options={Category}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                  <TextField
                    label="Sub Category"
                    required
                    className="mb-3"
                  />
                  <TextField
                    label="Category Code"
                    required
                    className="mb-3"
                  />
                  <div className="mb-3">
                    <label className="form-label">
                      Description<span className="text-danger ms-1">*</span>
                    </label>
                    <DefaultEditor
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-0">
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
                >
                  Create Subcategory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

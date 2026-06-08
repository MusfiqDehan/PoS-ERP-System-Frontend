"use client";

import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import { Period } from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import { useState } from "react";
import DefaultEditor from "react-simple-wysiwyg";

export default function AddWarrantyModal() {
  const [description, setDescription] = useState<string | undefined>();

  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Add Warrranty</h4>
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
                  <TextField label="Warranty" required className="mb-3" />
                  <div className="row">
                    <FormCol lg={6}>
                      <TextField label="Duration" required className="mb-3" />
                    </FormCol>
                    <FormCol lg={6}>
                      <SelectField
                        label="Period"
                        required
                        className="mb-3"
                        options={Period}
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </FormCol>
                    <FormCol lg={12}>
                      <div className="mb-3">
                        <label className="form-label">
                          Description
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <DefaultEditor
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </FormCol>
                  </div>
                  <div className="mb-0">
                    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                      <span className="status-label">Status</span>
                      <input type="checkbox" id="user2" className="check" />
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
                  Add Warranty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

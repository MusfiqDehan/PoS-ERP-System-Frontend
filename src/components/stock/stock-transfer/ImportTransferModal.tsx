"use client";
/* eslint-disable @next/next/no-img-element */

import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import { From, Status, To } from "@/core/common/selectOption/selectOption";
import Link from "next/link";

export default function ImportTransferModal() {
  return (
    <div className="modal fade" id="view-notes">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Import Transfer</h4>
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
          <form>
            <div className="modal-body">
              <div className="row">
                <FormCol lg={4} sm={6}>
                  <SelectField
                    label="From"
                    required
                    className="mb-3"
                    options={From}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={4} sm={6}>
                  <SelectField
                    label="To"
                    required
                    className="mb-3"
                    options={To}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={4} sm={6}>
                  <SelectField
                    label="Satus"
                    required
                    className="mb-3"
                    options={Status}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12} sm={6}>
                  <div className="row">
                    <div>
                      <div className="modal-footer-btn download-file">
                        <Link href="javascript:void(0)" className="btn btn-submit">
                          Download Sample File
                        </Link>
                      </div>
                    </div>
                  </div>
                </FormCol>
                <FormCol lg={12}>
                  <div className="mb-3 image-upload-down">
                    <label className="form-label"> Upload CSV File</label>
                    <div className="image-upload download">
                      <input type="file" />
                      <div className="image-uploads">
                        <img src="assets/img/download-img.png" alt="img" />
                        <h4>
                          Drag and drop a <span>file to upload</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </FormCol>
                <FormCol lg={12} sm={6}>
                  <div className="mb-3">
                    <label className="form-label">
                      Shipping<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </FormCol>
              </div>
              <div className="col-lg-12">
                <div className="mb-3 summer-description-box transfer">
                  <label className="form-label">Description</label>
                  <div id="summernote3"></div>
                  <p>Maximum 60 Characters</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <Link
                href="#"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Submit
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

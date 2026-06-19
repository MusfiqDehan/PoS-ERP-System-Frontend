"use client";

import Select from "react-select";
import {
  incomeAccountOptions,
  incomeCategoryOptions,
  incomeStoreOptions,
} from "./types";

export default function AddIncomeModal() {
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Add Income</h4>
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
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Date<span className="text-danger ms-1">*</span>
                        </label>
                        <div className="input-groupicon calender-input">
                          <i data-feather="calendar" className="info-img" />
                          <input
                            type="text"
                            className="datetimepicker form-control p-2"
                            placeholder="24 Dec 2024"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                      <label className="form-label">
                        Category<span className="text-danger ms-1">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={incomeCategoryOptions}
                        placeholder="Choose"
                      />
                    </div>
                    <div className="col-lg-12 mb-3">
                      <label className="form-label">
                        Store<span className="text-danger ms-1">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={incomeStoreOptions}
                        placeholder="Choose"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label className="form-label">
                        Amount<span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="$200"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label className="form-label">
                        Account<span className="text-danger ms-1">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={incomeAccountOptions}
                        placeholder="Choose"
                      />
                    </div>
                    <div className="col-lg-12">
                      <div className="summer-description-box">
                        <label className="form-label">Description</label>
                        <div id="summernote">Electricity Bill</div>
                        <p className="mt-1">Maximum 60 Words</p>
                      </div>
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
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-primary fs-13 fw-medium p-2 px-3"
                >
                  Add Income
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

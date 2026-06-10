"use client";

import TextEditor from "@/core/common/texteditor/texteditor";
import { DatePicker } from "antd";
import Select from "react-select";
import { Calendar } from "react-feather";
import { expenseCategoryOptions, expenseStatusOptions } from "./types";

export default function EditExpenseModal() {
  return (
    <div className="modal fade" id="edit-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Edit Expense</h4>
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
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Expense<span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="Electricity Payment"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="mb-3 summer-description-box">
                      <label className="form-label">Description</label>
                      <TextEditor />
                      <p className="mt-1">Maximum 60 Words</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Category<span className="text-danger ms-1">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={expenseCategoryOptions}
                        placeholder="Choose"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label">
                      Date<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="mb-3 date-group mt-0">
                      <div className="input-groupicon calender-input">
                        <Calendar className="info-img " />
                        <DatePicker
                          className="datetimepicker form-control p-2"
                          placeholder="24 Dec 2024"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Amount<span className="text-danger ms-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue="$200"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Status<span className="text-danger ms-1">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={expenseStatusOptions}
                        placeholder="Choose"
                      />
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
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-primary fs-13 fw-medium p-2 px-3"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

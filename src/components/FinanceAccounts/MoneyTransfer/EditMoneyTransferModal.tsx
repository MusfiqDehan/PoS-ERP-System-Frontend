"use client";

import { AccountType } from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import Select from "react-select";

export default function EditMoneyTransferModal() {
  return (
    <div className="modal fade" id="edit-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header">
                <div className="page-title">
                  <h4>Edit Account</h4>
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
                    <div className="col-lg-12 mb-3">
                      <label className="form-label">
                        Account Type
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={AccountType}
                        placeholder="Choose"
                      />
                    </div>
                    <div className="col-lg-12 mb-3">
                      <label className="form-label">
                        Account Type
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={AccountType}
                        placeholder="Choose"
                      />
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-2 amount position-relative">
                        <label className="form-label">
                          Amount
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={1800}
                        />
                        <i className="ti ti-currency-dollar text-dark" />
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
                <Link
                  href="#"
                  className="btn btn-primary fs-13 fw-medium p-2 px-3"
                  data-bs-dismiss="modal"
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

"use client";

import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import {
  WarehouseFrom,
  WarehouseTo,
} from "@/core/common/selectOption/selectOption";
import Link from "next/link";

export default function AddTransferModal() {
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Add Transfer</h4>
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
                <FormCol lg={6}>
                  <SelectField
                    label="Warehouse From"
                    required
                    className="mb-3"
                    options={WarehouseFrom}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={6}>
                  <SelectField
                    label="Warehouse To"
                    required
                    className="mb-3"
                    options={WarehouseTo}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12}>
                  <div className="mb-3">
                    <label className="form-label">
                      Reference Number
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </FormCol>
                <FormCol lg={12}>
                  <div className="mb-3 search-form mb-3">
                    <label className="form-label">
                      Product <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select Product"
                    />
                    <i data-feather="search" className="feather-search" />
                  </div>
                </FormCol>
                <FormCol lg={12}>
                  <div className="search-form mb-0">
                    <label className="form-label">
                      Notes <span className="text-danger ms-1">*</span>
                    </label>
                    <textarea className="form-control" defaultValue="" />
                  </div>
                </FormCol>
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
                Create
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import SelectField from "@/core/common/form/SelectField";
import {
  ResponsiblePerson,
  Store,
  WareHouse,
} from "@/core/common/selectOption/selectOption";
import FormCol from "@/core/common/form/FormCol";
import Link from "next/link";

export default function AddStockModal() {
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Add Stock</h4>
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
                <FormCol lg={12}>
                  <SelectField
                    label="Warehouse"
                    required
                    className="mb-3"
                    options={WareHouse}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12}>
                  <SelectField
                    label="Store"
                    required
                    className="mb-3"
                    options={Store}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12}>
                  <SelectField
                    label="Responsible Person"
                    required
                    className="mb-3"
                    options={ResponsiblePerson}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={12}>
                  <div className="search-form mb-0">
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
                Add Stock
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

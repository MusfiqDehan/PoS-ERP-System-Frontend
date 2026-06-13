"use client";

import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import {
  ResponsiblePerson,
  Store,
  WareHouse,
} from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import { Search } from "react-feather";

export default function AddAdjustmentModal() {
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Add Adjustment</h4>
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
              <div className="search-form mb-3">
                <label className="form-label">
                  Product<span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Product"
                />
                <Search className="feather-search" />
              </div>
              <div className="row">
                <FormCol lg={6}>
                  <SelectField
                    label="Warehouse"
                    required
                    className="mb-3"
                    options={WareHouse}
                    placeholder="Choose"
                    classNamePrefix="react-select"
                  />
                </FormCol>
                <FormCol lg={6}>
                  <div className="mb-3">
                    <label className="form-label">
                      Reference Number
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
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
              </div>
              <div className="col-lg-12">
                <div className="summer-description-box">
                  <label className="form-label">
                    Notes<span className="text-danger ms-1">*</span>
                  </label>
                  <textarea className="form-control" defaultValue="" />
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
                Create Adjustment
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import Select from "react-select";
import { sellingTypeOptions } from "./selectOptions";

export default function SkuSellingTypeFields() {
  return (
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <div className="mb-3 list position-relative">
                            <label className="form-label">
                              SKU<span className="text-danger ms-1">*</span>
                            </label>
                            <input type="text" className="form-control list" />
                            <button
                              type="button"
                              className="btn btn-primaryadd"
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Selling Type
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <Select
                              className="react-select"
                              options={sellingTypeOptions}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                      </div>
  );
}

"use client";

import Select from "react-select";
import { warrantyOptions } from "./selectOptions";

export default function WarrantyManufacturerFields() {
  return (
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Warranty
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <Select
                                className="react-select"
                                options={warrantyOptions}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 col-12">
                            <div className="mb-3 add-product">
                              <label className="form-label">
                                Manufacturer
                                <span className="text-danger ms-1">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
  );
}

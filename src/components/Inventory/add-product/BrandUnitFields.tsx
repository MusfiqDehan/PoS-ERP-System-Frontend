"use client";

import Select from "react-select";
import { brandOptions, unitOptions } from "./selectOptions";

export default function BrandUnitFields() {
  return (
                      <div className="add-product-new">
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <div className="add-newplus">
                                <label className="form-label">
                                  Brand
                                  <span className="text-danger ms-1">*</span>
                                </label>
                              </div>
                              <Select
                                className="react-select"
                                options={brandOptions}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <div className="add-newplus">
                                <label className="form-label">
                                  Unit
                                  <span className="text-danger ms-1">*</span>
                                </label>
                              </div>
                              <Select
                                className="react-select"
                                options={unitOptions}
                                placeholder="Choose"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
  );
}

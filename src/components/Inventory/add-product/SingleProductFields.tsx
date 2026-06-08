"use client";

import Select from "react-select";
import { discountTypeOptions, taxTypeOptions } from "./selectOptions";

export default function SingleProductFields() {
  return (
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="single-product">
                            <div className="row">
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Quantity
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Price
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Tax Type
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <Select
                                    className="react-select"
                                    options={taxTypeOptions}
                                    placeholder="Select Option"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Discount Type
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <Select
                                    className="react-select"
                                    options={discountTypeOptions}
                                    placeholder="Choose"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Discount Value
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                              <div className="col-lg-4 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Quantity Alert
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
  );
}

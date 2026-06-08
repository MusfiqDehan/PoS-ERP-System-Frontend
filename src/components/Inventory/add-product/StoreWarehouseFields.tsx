"use client";

import Select from "react-select";
import { storeOptions, warehouseOptions } from "./selectOptions";

export default function StoreWarehouseFields() {
  return (
                      <div className="row">
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Store<span className="text-danger ms-1">*</span>
                            </label>
                            <Select
                              className="react-select"
                              options={storeOptions}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Warehouse
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <Select
                              className="react-select"
                              options={warehouseOptions}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                      </div>
  );
}

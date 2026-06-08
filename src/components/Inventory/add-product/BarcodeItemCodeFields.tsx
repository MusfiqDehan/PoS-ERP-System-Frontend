"use client";

import Select from "react-select";
import { barcodeSymbolOptions } from "./selectOptions";

export default function BarcodeItemCodeFields() {
  return (
                      <div className="row">
                        <div className="col-lg-6 col-sm-6 col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Barcode Symbology
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <Select
                              className="react-select"
                              options={barcodeSymbolOptions}
                              placeholder="Choose"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-12">
                          <div className="mb-3 list position-relative">
                            <label className="form-label">
                              Item Code
                              <span className="text-danger ms-1">*</span>
                            </label>
                            <input type="text" className="form-control list" />
                            <button
                              type="submit"
                              className="btn btn-primaryadd"
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
  );
}

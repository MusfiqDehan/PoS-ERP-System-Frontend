"use client";
/* eslint-disable @next/next/no-img-element */

import { Calendar } from "react-feather";
import Link from "next/link";

export default function AddTransferModal() {
  return (
      <div className="modal fade" id="add-units">
        <div className="modal-dialog purchase modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
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
                <div className="modal-body custom-modal-body">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <div className="input-blocks">
                        <label>Date</label>
                        <div className="input-groupicon calender-input">
                          <Calendar className="info-img feather" />
                          <input
                            type="text"
                            className="datetimepicker form-control"
                            placeholder="Select Date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <div className="input-blocks">
                        <label>From</label>
                        <select className="react-select">
                          <option>Choose</option>
                          <option>Store 1</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <div className="input-blocks">
                        <label>To</label>
                        <select className="react-select">
                          <option>Choose</option>
                          <option>Store 2</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-blocks">
                        <label>Product Name</label>
                        <input
                          type="text"
                          placeholder="Please type product code and select"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="modal-body-table">
                        <div className="table-responsive">
                          <table className="table  datanew">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Purchase Price($)</th>
                                <th>Discount($)</th>
                                <th>Tax(%)</th>
                                <th>Tax Amount($)</th>
                                <th>Unit Cost($)</th>
                                <th>Total Cost(%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="p-5" />
                                <td className="p-5" />
                                <td className="p-5" />
                                <td className="p-5" />
                                <td className="p-5" />
                                <td className="p-5" />
                                <td className="p-5" />
                                <td className="p-5" />
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="input-blocks">
                          <label>Order Tax</label>
                          <input type="text" defaultValue={0} />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="input-blocks">
                          <label>Discount</label>
                          <input type="text" defaultValue={0} />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="input-blocks">
                          <label>Shipping</label>
                          <input type="text" defaultValue={0} />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="input-blocks">
                          <label>Status</label>
                          <select className="react-select">
                            <option>Choose</option>
                            <option>Sent</option>
                            <option>Pending</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks summer-description-box">
                      <label>Notes</label>
                      <div id="summernote" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="modal-footer-btn">
                      <Link
                        href="#"
                        className="btn btn-cancel me-2"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </Link>
                      <Link href="#" className="btn btn-submit">
                        Submit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

import { Calendar } from "react-feather";
import Link from "next/link";

export default function EditTransferModal() {
  return (
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog purchase modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Edit Transfer</h4>
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
                  <div>
                    <div>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-blocks">
                            <label>Date</label>
                            <div className="input-groupicon calender-input">
                              <i
                                data-feather="calendar"
                                className="info-img"
                              />
                              <input
                                type="text"
                                className="datetimepicker"
                                placeholder="19 Jan 2023"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-blocks">
                            <label>From</label>
                            <select className="react-select">
                              <option>Store 1</option>
                              <option>Choose</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="input-blocks">
                            <label>To</label>
                            <select className="react-select">
                              <option>Store 2</option>
                              <option>Choose</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12 col-sm-6 col-12">
                          <div className="input-blocks">
                            <label>Product</label>
                            <div className="input-groupicon">
                              <input
                                type="text"
                                placeholder="Scan/Search Product by code and select..."
                              />
                              <div className="addonset">
                                <img
                                  src="assets/img/icons/scanners.svg"
                                  alt="img"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="modal-body-table total-orders">
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Product Name</th>
                                    <th>QTY</th>
                                    <th>Purchase Price($) </th>
                                    <th>Discount($) </th>
                                    <th>Tax %</th>
                                    <th>Tax Amount($)</th>
                                    <th className="text-end">Unit Cost($)</th>
                                    <th className="text-end">
                                      Total Cost ($){" "}
                                    </th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="productimgname">
                                        <Link
                                          href="#"
                                          className="product-img stock-img"
                                        >
                                          <img
                                            src="assets/img/products/stock-img-02.png"
                                            alt="product"
                                          />
                                        </Link>
                                        <Link href="#">Nike Jordan</Link>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="product-quantity">
                                        <span className="quantity-btn">
                                          +
                                          <i
                                            data-feather="plus-circle"
                                            className="plus-circle"
                                          />
                                        </span>
                                        <input
                                          type="text"
                                          className="quntity-input"
                                          defaultValue={10}
                                        />
                                        <span className="quantity-btn">
                                          <i
                                            data-feather="minus-circle"
                                            className="feather-search"
                                          />
                                        </span>
                                      </div>
                                    </td>
                                    <td>2000</td>
                                    <td>500.00</td>
                                    <td>0.00</td>
                                    <td>0.00</td>
                                    <td className="text-end">0.00</td>
                                    <td className="text-end">1500</td>
                                    <td>
                                      <Link href="#" className="delete-set">
                                        <img
                                          src="assets/img/icons/delete.svg"
                                          alt="svg"
                                        />
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 float-md-right">
                          <div className="total-order">
                            <ul>
                              <li>
                                <h4>Order Tax</h4>
                                <h5>$ 0.00</h5>
                              </li>
                              <li>
                                <h4>Discount</h4>
                                <h5>$ 0.00</h5>
                              </li>
                              <li>
                                <h4>Shipping</h4>
                                <h5>$ 0.00</h5>
                              </li>
                              <li className="total">
                                <h4>Grand Total</h4>
                                <h5>$1500.00</h5>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <label>Order Tax</label>
                            <input type="text" defaultValue={0} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <label>Discount</label>
                            <input type="text" defaultValue={0} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <label>Shipping</label>
                            <input type="text" defaultValue={0} />
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">
                          <div className="input-blocks">
                            <label>Status</label>
                            <select className="react-select">
                              <option>Sent</option>
                              <option>Pending</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-blocks summer-description-box">
                      <label>Description</label>
                      <div id="summernote2">
                        <p>
                          These shoes are made with the highest quality
                          materials.{" "}
                        </p>
                      </div>
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
                        Save Changes
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

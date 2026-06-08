"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function RecentTransactions() {
  const route = all_routes;
  return (
          <div className="col-xl-6 col-sm-12 col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-orange fs-16 me-2">
                    <i className="ti ti-flag" />
                  </span>
                  <h5 className="card-title mb-0">Recent Transactions</h5>
                </div>
                <Link
                  href={route.onlineorder}
                  className="fs-13 fw-medium text-decoration-underline"
                >
                  View All
                </Link>
              </div>
              <div className="card-body p-0">
                <ul className="nav nav-tabs nav-justified transaction-tab">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      href="#sale"
                      data-bs-toggle="tab"
                    >
                      Sale
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="#purchase-transaction"
                      data-bs-toggle="tab"
                    >
                      Purchase
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="#quotation"
                      data-bs-toggle="tab"
                    >
                      Quotation
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="#expenses"
                      data-bs-toggle="tab"
                    >
                      Expenses
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="#invoices"
                      data-bs-toggle="tab"
                    >
                      Invoices
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane show active" id="sale">
                    <div className="table-responsive">
                      <table className="table table-borderless custom-table">
                        <thead className="thead-light">
                          <tr>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>24 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer16.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Andrea Willer</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="fs-16 fw-bold text-gray-9">
                              $4,560
                            </td>
                          </tr>
                          <tr>
                            <td>23 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer17.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Timothy Sandsr</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="fs-16 fw-bold text-gray-9">
                              $3,569
                            </td>
                          </tr>
                          <tr>
                            <td>22 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer18.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Bonnie Rodrigues</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-pink badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Draft
                              </span>
                            </td>
                            <td className="fs-16 fw-bold text-gray-9">
                              $4,560
                            </td>
                          </tr>
                          <tr>
                            <td>21 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer15.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Randy McCree</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="fs-16 fw-bold text-gray-9">
                              $2,155
                            </td>
                          </tr>
                          <tr>
                            <td>21 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer13.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Dennis Anderson</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="fs-16 fw-bold text-gray-9">
                              $5,123
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="purchase-transaction">
                    <div className="table-responsive">
                      <table className="table table-borderless custom-table">
                        <thead className="thead-light">
                          <tr>
                            <th>Date</th>
                            <th>Supplier</th>
                            <th>Status</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>24 May 2025</td>
                            <td>
                              <Link href="#" className="fw-semibold">
                                Electro Mart
                              </Link>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="text-gray-9">$1000</td>
                          </tr>
                          <tr>
                            <td>23 May 2025</td>
                            <td>
                              <Link href="#" className="fw-semibold">
                                Quantum Gadgets
                              </Link>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="text-gray-9">$1500</td>
                          </tr>
                          <tr>
                            <td>22 May 2025</td>
                            <td>
                              <Link href="#" className="fw-semibold">
                                Prime Bazaar
                              </Link>
                            </td>
                            <td>
                              <span className="badge badge-cyan badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Pending
                              </span>
                            </td>
                            <td className="text-gray-9">$2000</td>
                          </tr>
                          <tr>
                            <td>21 May 2025</td>
                            <td>
                              <Link href="#" className="fw-semibold">
                                Alpha Mobiles
                              </Link>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="text-gray-9">$1200</td>
                          </tr>
                          <tr>
                            <td>21 May 2025</td>
                            <td>
                              <Link href="#" className="fw-semibold">
                                Aesthetic Bags
                              </Link>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="text-gray-9">$1300</td>
                          </tr>
                          <tr>
                            <td>28 May 2025</td>
                            <td>
                              <Link href="#" className="fw-semibold">
                                Sigma Chairs
                              </Link>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="text-gray-9">$1600</td>
                          </tr>
                          <tr>
                            <td>26 May 2025</td>
                            <td>
                              <Link href="#" className="fw-semibold">
                                A-Z Store s
                              </Link>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Completed
                              </span>
                            </td>
                            <td className="text-gray-9">$1100</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="tab-pane" id="quotation">
                    <div className="table-responsive">
                      <table className="table table-borderless custom-table">
                        <thead className="thead-light">
                          <tr>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>24 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer16.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Andrea Willer</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Sent
                              </span>
                            </td>
                            <td className="text-gray-9">$4,560</td>
                          </tr>
                          <tr>
                            <td>23 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer17.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Timothy Sandsr</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-warning badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Ordered
                              </span>
                            </td>
                            <td className="text-gray-9">$3,569</td>
                          </tr>
                          <tr>
                            <td>22 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer18.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Bonnie Rodrigues</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-cyan badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Pending
                              </span>
                            </td>
                            <td className="text-gray-9">$4,560</td>
                          </tr>
                          <tr>
                            <td>21 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer15.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Randy McCree</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-warning badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Ordered
                              </span>
                            </td>
                            <td className="text-gray-9">$2,155</td>
                          </tr>
                          <tr>
                            <td>21 May 2025</td>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer13.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Dennis Anderson</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #114589
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Sent
                              </span>
                            </td>
                            <td className="text-gray-9">$5,123</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="expenses">
                    <div className="table-responsive">
                      <table className="table table-borderless custom-table">
                        <thead className="thead-light">
                          <tr>
                            <th>Date</th>
                            <th>Expenses</th>
                            <th>Status</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>24 May 2025</td>
                            <td>
                              <h6 className="fw-medium">
                                <Link href="#">Electricity Payment</Link>
                              </h6>
                              <span className="fs-13 text-orange">#EX849</span>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Approved
                              </span>
                            </td>
                            <td className="text-gray-9">$200</td>
                          </tr>
                          <tr>
                            <td>23 May 2025</td>
                            <td>
                              <h6 className="fw-medium">
                                <Link href="#">Electricity Payment</Link>
                              </h6>
                              <span className="fs-13 text-orange">#EX849</span>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Approved
                              </span>
                            </td>
                            <td className="text-gray-9">$200</td>
                          </tr>
                          <tr>
                            <td>22 May 2025</td>
                            <td>
                              <h6 className="fw-medium">
                                <Link href="#">Stationery Purchase</Link>
                              </h6>
                              <span className="fs-13 text-orange">#EX848</span>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Approved
                              </span>
                            </td>
                            <td className="text-gray-9">$50</td>
                          </tr>
                          <tr>
                            <td>21 May 2025</td>
                            <td>
                              <h6 className="fw-medium">
                                <Link href="#">AC Repair Service</Link>
                              </h6>
                              <span className="fs-13 text-orange">#EX847</span>
                            </td>
                            <td>
                              <span className="badge badge-cyan badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Pending
                              </span>
                            </td>
                            <td className="text-gray-9">$800</td>
                          </tr>
                          <tr>
                            <td>21 May 2025</td>
                            <td>
                              <h6 className="fw-medium">
                                <Link href="#">Client Meeting</Link>
                              </h6>
                              <span className="fs-13 text-orange">#EX846</span>
                            </td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Approved
                              </span>
                            </td>
                            <td className="text-gray-9">$100</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="tab-pane" id="invoices">
                    <div className="table-responsive">
                      <table className="table table-borderless custom-table">
                        <thead className="thead-light">
                          <tr>
                            <th>Customer</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer16.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Andrea Willer</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #INV005
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>24 May 2025</td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Paid
                              </span>
                            </td>
                            <td className="text-gray-9">$1300</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer17.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Timothy Sandsr</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #INV004
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>23 May 2025</td>
                            <td>
                              <span className="badge badge-warning badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Overdue
                              </span>
                            </td>
                            <td className="text-gray-9">$1250</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer18.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Bonnie Rodrigues</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #INV003
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>22 May 2025</td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Paid
                              </span>
                            </td>
                            <td className="text-gray-9">$1700</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer15.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Randy McCree</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #INV002
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>21 May 2025</td>
                            <td>
                              <span className="badge badge-danger badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Unpaid
                              </span>
                            </td>
                            <td className="text-gray-9">$1500</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center file-name-icon">
                                <Link href="#" className="avatar avatar-md">
                                  <img
                                    src="assets/img/customer/customer13.jpg"
                                    className="img-fluid"
                                    alt="img"
                                  />
                                </Link>
                                <div className="ms-2">
                                  <h6 className="fw-medium">
                                    <Link href="#">Dennis Anderson</Link>
                                  </h6>
                                  <span className="fs-13 text-orange">
                                    #INV001
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>21 May 2025</td>
                            <td>
                              <span className="badge badge-success badge-xs d-inline-flex align-items-center">
                                <i className="ti ti-circle-filled fs-5 me-1" />
                                Paid
                              </span>
                            </td>
                            <td className="text-gray-9">$1000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

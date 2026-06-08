"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function BestSeller() {
  const route = all_routes;
  return (
<div className="col-sm-12 col-md-12 col-xl-4 d-flex">
            <div className="card flex-fill w-100 mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Best Seller</h4>
                <Link href="#" className="btn btn-outline-light btn-sm">
                  View All
                </Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-borderless best-seller">
                    <tbody>
                      <tr>
                        <td className="pt-0 ps-0">
                          <div className="d-flex align-items-center">
                            <Link
                              href={route.productlist}
                              className="avatar avatar-lg me-2"
                            >
                              <img
                                src="assets/img/products/stock-img-01.png"
                                alt="img"
                              />
                            </Link>
                            <div>
                              <h6 className="fw-medium">
                                <Link
                                  href={route.productlist}
                                  className="fw-bold"
                                >
                                  Lenovo 3rd Generation
                                </Link>
                              </h6>
                              <p>$4420</p>
                            </div>
                          </div>
                        </td>
                        <td className="pt-0">
                          <p className="text-gray-9 mb-1">Sales</p>
                          <p className="text-gray-9 fw-medium">6547</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-0">
                          <div className="d-flex align-items-center">
                            <Link
                              href={route.productlist}
                              className="avatar avatar-lg me-2"
                            >
                              <img
                                src="assets/img/products/stock-img-02.png"
                                alt="img"
                              />
                            </Link>
                            <div>
                              <h6 className="fw-medium">
                                <Link
                                  href={route.productlist}
                                  className="fw-bold"
                                >
                                  Bold V3.2
                                </Link>
                              </h6>
                              <p>$1474</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-gray-9 mb-1">Sales</p>
                          <p className="text-gray-9 fw-medium">3474</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-0">
                          <div className="d-flex align-items-center">
                            <Link
                              href={route.productlist}
                              className="avatar avatar-lg me-2"
                            >
                              <img
                                src="assets/img/products/stock-img-06.png"
                                alt="img"
                              />
                            </Link>
                            <div>
                              <h6 className="fw-medium">
                                <Link
                                  href={route.productlist}
                                  className="fw-bold"
                                >
                                  Nike Jordan
                                </Link>
                              </h6>
                              <p>$8784</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-gray-9 mb-1">Sales</p>
                          <p className="text-gray-9 fw-medium">1478</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-0">
                          <div className="d-flex align-items-center">
                            <Link
                              href={route.productlist}
                              className="avatar avatar-lg me-2"
                            >
                              <img
                                src="assets/img/products/stock-img-03.png"
                                alt="img"
                              />
                            </Link>
                            <div>
                              <h6 className="fw-medium">
                                <Link
                                  href={route.productlist}
                                  className="fw-bold"
                                >
                                  Apple Series 5 Watch
                                </Link>
                              </h6>
                              <p>$3240</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-gray-9 mb-1">Sales</p>
                          <p className="text-gray-9 fw-medium">987</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-0">
                          <div className="d-flex align-items-center">
                            <Link
                              href={route.productlist}
                              className="avatar avatar-lg me-2"
                            >
                              <img
                                src="assets/img/products/stock-img-04.png"
                                alt="img"
                              />
                            </Link>
                            <div>
                              <h6 className="fw-medium">
                                <Link
                                  href={route.productlist}
                                  className="fw-bold"
                                >
                                  Amazon Echo Dot
                                </Link>
                              </h6>
                              <p>$597</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-gray-9 mb-1">Sales</p>
                          <p className="text-gray-9 fw-medium">784</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function TopCustomers() {
  const route = all_routes;
  return (
          <div className="col-xxl-4 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-orange fs-16 me-2">
                    <i className="ti ti-users" />
                  </span>
                  <h5 className="card-title mb-0">Top Customers</h5>
                </div>
                <Link
                  href={route.customer}
                  className="fs-13 fw-medium text-decoration-underline"
                >
                  View All
                </Link>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer11.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Carlos Curran</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          USA
                        </p>
                        <p>24 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$8,9645</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer12.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Stan Gaunter</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          UAE
                        </p>
                        <p>22 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$16,985</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer13.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Richard Wilson</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          Germany
                        </p>
                        <p>14 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$5,366</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3 flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer14.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Mary Bronson</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          Belgium
                        </p>
                        <p>08 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$4,569</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-lg flex-shrink-0">
                      <img src="assets/img/customer/customer15.jpg" alt="img" />
                    </Link>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-bold mb-1">
                        <Link href="#">Annie Tremblay</Link>
                      </h6>
                      <div className="d-flex align-items-center item-list">
                        <p className="d-inline-flex align-items-center">
                          <i className="ti ti-map-pin me-1" />
                          Greenland
                        </p>
                        <p>14 Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5>$3,5698</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

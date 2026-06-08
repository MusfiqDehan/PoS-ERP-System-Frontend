"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import TopCategoryChart from "@/components/charts/topcategory";

export default function TopCategories() {
  return (
          <div className="col-xxl-4 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-inline-flex align-items-center">
                  <span className="title-icon bg-soft-orange fs-16 me-2">
                    <i className="ti ti-users" />
                  </span>
                  <h5 className="card-title mb-0">Top Categories</h5>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-sm btn-white d-flex align-items-center"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="ti ti-calendar me-1" />
                    Weekly
                  </Link>
                  <ul className="dropdown-menu p-3">
                    <li>
                      <Link href="#" className="dropdown-item">
                        Today
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Weekly
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item">
                        Monthly
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-4 mb-4">
                  <div>
                    <TopCategoryChart />
                  </div>
                  <div>
                    <div className="category-item category-primary">
                      <p className="fs-13 mb-1">Electronics</p>
                      <h2 className="d-flex align-items-center">
                        698
                        <span className="fs-13 fw-normal text-default ms-1">
                          Sales
                        </span>
                      </h2>
                    </div>
                    <div className="category-item category-orange">
                      <p className="fs-13 mb-1">Sports</p>
                      <h2 className="d-flex align-items-center">
                        545
                        <span className="fs-13 fw-normal text-default ms-1">
                          Sales
                        </span>
                      </h2>
                    </div>
                    <div className="category-item category-secondary">
                      <p className="fs-13 mb-1">Lifestyles</p>
                      <h2 className="d-flex align-items-center">
                        456
                        <span className="fs-13 fw-normal text-default ms-1">
                          Sales
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                <h6 className="mb-2">Category Statistics</h6>
                <div className="border br-8">
                  <div className="d-flex align-items-center justify-content-between border-bottom p-2">
                    <p className="d-inline-flex align-items-center mb-0">
                      <i className="ti ti-square-rounded-filled text-indigo fs-8 me-2" />
                      Total Number Of Categories
                    </p>
                    <h5>698</h5>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2">
                    <p className="d-inline-flex align-items-center mb-0">
                      <i className="ti ti-square-rounded-filled text-orange fs-8 me-2" />
                      Total Number Of Products
                    </p>
                    <h5>7899</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

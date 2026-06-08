"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import SalesDayChart from "@/components/charts/salesdaychart";

export default function SalesPurchaseChart() {
  return (
            <div className="col-xxl-8 col-xl-7 col-sm-12 col-12 d-flex">
              <div className="card flex-fill">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-inline-flex align-items-center">
                    <span className="title-icon bg-soft-primary fs-16 me-2">
                      <i className="ti ti-shopping-cart" />
                    </span>
                    <h5 className="card-title mb-0">Sales &amp; Purchase</h5>
                  </div>
                  <ul className="nav btn-group custom-btn-group">
                    <Link className="btn btn-outline-light" href="#">
                      1D
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      1W
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      1M
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      3M
                    </Link>
                    <Link className="btn btn-outline-light" href="#">
                      6M
                    </Link>
                    <Link className="btn btn-outline-light active" href="#">
                      1Y
                    </Link>
                  </ul>
                </div>
                <div className="card-body pb-0">
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="border p-2 br-8">
                        <p className="d-inline-flex align-items-center mb-1">
                          <i className="ti ti-circle-filled fs-8 text-primary-300 me-1" />
                          Total Purchase
                        </p>
                        <h4>3K</h4>
                      </div>
                      <div className="border p-2 br-8">
                        <p className="d-inline-flex align-items-center mb-1">
                          <i className="ti ti-circle-filled fs-8 text-primary me-1" />
                          Total Sales
                        </p>
                        <h4>1K</h4>
                      </div>
                    </div>
                    <div id="sales-daychart">
                     <SalesDayChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}

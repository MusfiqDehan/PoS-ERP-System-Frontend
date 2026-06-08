"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function RevenueWidgets() {
  const route = all_routes;
  return (
        <div className="row">
          {/* Profit */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card revenue-widget flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h4 className="mb-1 custome-heading">$8,458,798</h4>
                    <p>Profit</p>
                  </div>
                  <span className="revenue-icon bg-cyan-transparent text-cyan">
                    <i className="fa-solid fa-layer-group fs-16" />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <span className="fs-13 fw-bold text-success">+35%</span> vs
                    Last Month
                  </p>
                  <Link
                    href={all_routes.profitloss}
                    className="text-decoration-underline fs-13 fw-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Profit */}
          {/* Invoice */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card revenue-widget flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h4 className="mb-1 custome-heading">$48,988,78</h4>
                    <p>Invoice Due</p>
                  </div>
                  <span className="revenue-icon bg-teal-transparent text-teal">
                    <i className="ti ti-chart-pie fs-16" />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <span className="fs-13 fw-bold text-success">+35%</span> vs
                    Last Month
                  </p>
                  <Link
                    href={route.invoicereport}
                    className="text-decoration-underline fs-13 fw-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Invoice */}
          {/* Expenses */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card revenue-widget flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h4 className="mb-1 custome-heading">$8,980,097</h4>
                    <p>Total Expenses</p>
                  </div>
                  <span className="revenue-icon bg-orange-transparent text-orange">
                    <i className="ti ti-lifebuoy fs-16" />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <span className="fs-13 fw-bold text-success">+41%</span> vs
                    Last Month
                  </p>
                  <Link
                    href={route.expenselist}
                    className="text-decoration-underline fs-13 fw-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Expenses */}
          {/* Returns */}
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card revenue-widget flex-fill">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                  <div>
                    <h4 className="mb-1 custome-heading">$78,458,798</h4>
                    <p>Total Payment Returns</p>
                  </div>
                  <span className="revenue-icon bg-indigo-transparent text-indigo">
                    <i className="ti ti-hash fs-16" />
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0">
                    <span className="fs-13 fw-bold text-danger">-20%</span> vs
                    Last Month
                  </p>
                  <Link
                    href={route.salesreport}
                    className="text-decoration-underline fs-13 fw-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /Returns */}
        </div>
  );
}

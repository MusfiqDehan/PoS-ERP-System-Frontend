"use client";
/* eslint-disable @next/next/no-img-element */

import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import Link from "next/link";
import { subscription_details } from "@/core/json/subscriptiondetails";
import Table from "@/core/common/pagination/datatable";

  const data = subscription_details;
  const columns = [
    {
      title: "Company Name",
      dataIndex: "CompanyName",
      render: (text: any, record: any) => (
        <div className="d-flex align-items-center file-name-icon">
          <Link href="#" className="avatar avatar-md border rounded-circle">
            <img
              src={`assets/img/company/${record.Image}`}
              className="img-fluid"
              alt="img"
            />
          </Link>
          <div className="ms-2">
            <h6 className="fw-medium">
              <Link href="#">{record.CompanyName}</Link>
            </h6>
          </div>
        </div>
      ),
      sorter: (a: any, b: any) => a.CompanyName.length - b.CompanyName.length,
    },
    {
      title: "Plan",
      dataIndex: "Plan",
      sorter: (a: any, b: any) => a.Plan.length - b.Plan.length,
    },
    {
      title: "Billing Cycle",
      dataIndex: "BillCycle",
      render: (text: any, record: any) => <span>{record.BillCycle} Days</span>,
      sorter: (a: any, b: any) => a.BillCycle.length - b.BillCycle.length,
    },
    {
      title: "Payment Method",
      dataIndex: "PaymentMethod",
      sorter: (a: any, b: any) =>
        a.PaymentMethod.length - b.PaymentMethod.length,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a: any, b: any) => a.Amount.length - b.Amount.length,
    },
    {
      title: "Created Date",
      dataIndex: "CreatedDate",
      sorter: (a: any, b: any) => a.CreatedDate.length - b.CreatedDate.length,
    },
    {
      title: "Expired On",
      dataIndex: "ExpiringDate",
      sorter: (a: any, b: any) => a.ExpiringDate.length - b.ExpiringDate.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text: any) => (
        <span
          className={`badge ${
            text === "Paid" ? "badge-success" : "badge-danger"
          } d-inline-flex align-items-center badge-xs`}
        >
          <i className="ti ti-point-filled me-1" />
          {text}
        </span>
      ),
      sorter: (a: any, b: any) => a.Status.length - b.Status.length,
    },
    {
      title: "",
      dataIndex: "actions",
      render: () => (
        <div className="action-icon d-inline-flex">
          <Link
            href="#"
            className="me-2 p-2 d-flex align-items-center border rounded"
            data-bs-toggle="modal"
            data-bs-target="#view_invoice"
          >
            <i className="ti ti-file-invoice" />
          </Link>
          <Link
            href="#"
            className="me-2 d-flex align-items-center border rounded p-2"
          >
            <i className="ti ti-download" />
          </Link>
          <Link
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#delete_modal"
            className="d-flex align-items-center p-2 border rounded"
          >
            <i className="ti ti-trash" />
          </Link>
        </div>
      ),
    },
  ];

export default function SubscriptionsTable() {
  return (
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Subscription List</h5>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="me-3">
                  <div className="input-icon-end position-relative">
                    <PredefinedDateRanges />
                    <span className="input-icon-addon">
                      <i className="ti ti-chevron-down" />
                    </span>
                  </div>
                </div>
                <div className="dropdown me-3">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Select Plan
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Advanced (Monthly)
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Basic (Yearly)
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Enterprise (Monthly)
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown me-3">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Select Status
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Paid
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Unpaid
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Sort By : Last 7 Days
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Recently Added
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Ascending
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Desending
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Last Month
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1">
                        Last 7 Days
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <Table dataSource={data} columns={columns} />
              </div>
            </div>
          </div>
  );
}

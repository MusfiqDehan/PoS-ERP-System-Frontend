"use client";
/* eslint-disable @next/next/no-img-element */

import PredefinedDateRanges from "@/core/common/daterangepicker/datePicker";
import Link from "next/link";
import { companies_details } from "@/core/json/companiesdetails";
import Table from "@/core/common/pagination/datatable";

    const data = companies_details;
    const columns = [
      {
        title: "Company Name",
        dataIndex: "CompanyName",
        render: (text:any, record:any) => (
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
                <Link href="#">{text}</Link>
              </h6>
            </div>
          </div>
  
        ),
        sorter: (a:any, b:any )=> a.CompanyName.length - b.CompanyName.length,
      },
      {
        title: "Email",
        dataIndex: "Email",
        sorter: (a:any, b:any) => a.Email.length - b.Email.length,
      },
      {
        title: "Account URL",
        dataIndex: "AccountURL",
        sorter: (a:any, b:any) => a.AccountURL.length - b.AccountURL.length,
      },
      {
        title: "Plan",
        dataIndex: "Plan",
        render: (text:any) => (
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 me-2">{text}</p>
            <Link
              href="#"
              data-bs-toggle="modal"
              className="badge badge-purple badge-xs"
              data-bs-target="#upgrade_info"
            >
              Upgrade
            </Link>
          </div>
  
        ),
        sorter: (a:any, b:any) => a.Plan.length - b.Plan.length,
      },
      {
        title: "Created Date",
        dataIndex: "CreatedDate",
        sorter: (a:any, b:any) => a.CreatedDate.length - b.CreatedDate.length,
      },
      {
        title: "Status",
        dataIndex: "Status",
        render: (text:any) => (
          <span className={`badge ${text === 'Active' ? 'badge-success' : 'badge-danger'} d-inline-flex align-items-center badge-xs`}>
            <i className="ti ti-point-filled me-1" />
            {text}
          </span>
  
        ),
        sorter: (a:any, b:any) => a.Status.length - b.Status.length,
      },
      {
        title: "",
        dataIndex: "actions",
        render: () => (
          <div className="action-icon d-inline-flex align-items-center">
            <Link
              href="#"
              className="p-2 d-flex align-items-center border rounded me-2"
              data-bs-toggle="modal"
              data-bs-target="#company_detail"
            >
              <i className="ti ti-eye" />
            </Link>
            <Link
              href="#"
              className="p-2 d-flex align-items-center border rounded me-2"
              data-bs-toggle="modal"
              data-bs-target="#edit_company"
            >
              <i className="ti ti-edit" />
            </Link>
            <Link
              href="#"
              className="p-2 d-flex align-items-center border rounded"
              data-bs-toggle="modal"
              data-bs-target="#delete_modal"
            >
              <i className="ti ti-trash" />
            </Link>
          </div>
  
        ),
      },
    ];

export default function CompaniesTable() {
  return (
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <h5>Companies List</h5>
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
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Advanced
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Basic
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Enterprise
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
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Active
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Inactive
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
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Recently Added
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Ascending
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Desending
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Last Month
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Last 7 Days
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <Table columns={columns} dataSource={data} />
                </div>
  
              </div>
            </div>
  );
}

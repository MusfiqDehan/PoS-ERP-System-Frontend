"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { domain_details } from "@/core/json/domainDetails";
import Table from "@/core/common/pagination/datatable";

    const data = domain_details;
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
      sorter: (a:any, b:any) => a.CompanyName.length - b.CompanyName.length,
    },
    {
      title: "Domain URL",
      dataIndex: "AccountURL",
      sorter: (a:any, b:any) => a.AccountURL.length - b.AccountURL.length,
    },
    {
      title: "Plan",
      dataIndex: "Plan",
      sorter: (a:any, b:any) => a.Plan.length - b.Plan.length,
    },
    {
      title: "Created Date",
      dataIndex: "CreatedDate",
      sorter: (a:any, b:any) => a.CreatedDate.length - b.CreatedDate.length,
    },
    {
      title: "Status",
      dataIndex: "DomainStatus",
      render: (text:any) => (
        <Link
          href="#"
          className={`badge ${text === 'Approved' ? 'badge-soft-success' : text === 'Pending' ? 'badge-soft-info' : 'badge-soft-danger'} d-inline-flex align-items-center badge-xs shadow-none`}
        >
          <i className={`ti ${text === 'Approved' ? 'ti-checks' : text === 'Pending' ? 'ti-clock' : 'ti-x'}  me-1`} />
          {text}
        </Link>
      ),
      sorter: (a:any, b:any) => a.DomainStatus.length - b.DomainStatus.length,
    },
    {
      title: "",
      dataIndex: "DomainStatus",
      render: () => (
        <div className="action-icon d-inline-flex align-items-center">
          <Link
            href="#"
            className="p-2 d-flex align-items-center border rounded me-2"
            data-bs-toggle="modal"
            data-bs-target="#domain_approved"
          >
            <i className="ti ti-eye" />
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
      sorter: (a:any, b:any) => a.DomainStatus.length - b.DomainStatus.length,
    },
  ];

export default function DomainTable() {
  return (
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <h5>Domain List</h5>
                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                  <div className="dropdown me-3">
                    <Link
                      href="#"
                      className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      Select Plan Type
                    </Link>
                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Monthly
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Yearly
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
                          Approved
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Pending
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item rounded-1"
                        >
                          Rejected
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
                <div className='table-responsive'>
                  <Table dataSource={data} columns={columns} Selection={true} />
                </div>
  
              </div>
            </div>
  );
}

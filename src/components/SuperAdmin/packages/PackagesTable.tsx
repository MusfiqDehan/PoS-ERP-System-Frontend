"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { package_list } from "@/core/json/packagelist";
import Table from "@/core/common/pagination/datatable";

    const data = package_list;
    const columns = [
      {
        title: "Plan Name",
        dataIndex: "Plan_Name",
        render: (text:any) => (
          <h6 className="fw-medium">
            <Link href="#">{text}</Link>
          </h6>
        ),
        sorter: (a:any, b:any) => a.CompanyName.length - b.CompanyName.length,
      },
      {
        title: "Plan Type",
        dataIndex: "Plan_Type",
        sorter: (a:any, b:any) => a.Plan_Type.length - b.Plan_Type.length,
      },
      {
        title: "Total Subscribers",
        dataIndex: "Total_Subscribers",
        sorter: (a:any, b:any) => a.Total_Subscribers.length - b.Total_Subscribers.length,
      },
      {
        title: "Price",
        dataIndex: "Price",
        sorter: (a:any, b:any) => a.Price.length - b.Price.length,
      },
      {
        title: "Created Date",
        dataIndex: "Created_Date",
        sorter: (a:any, b:any) => a.Created_Date.length - b.Created_Date.length,
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
              data-bs-target="#edit_plans"
            >
              <i className="ti ti-edit" />
            </Link>
            <Link
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_modal"
              className="p-2 d-flex align-items-center border rounded"
            >
              <i className="ti ti-trash" />
            </Link>
          </div>
        ),
      },
    ];

export default function PackagesTable() {
  return (
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <h5>Plan List</h5>
                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                 
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
                <div className='table-responsive'>
                  <Table dataSource={data} columns={columns}  />
                </div>
              </div>
            </div>
  );
}

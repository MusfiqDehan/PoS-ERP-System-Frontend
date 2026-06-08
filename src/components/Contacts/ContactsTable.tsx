"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { contact_data } from "@/core/json/contactsData";
import Table from "@/core/common/pagination/datatable";

    const data = contact_data;

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            render: (text:any, record:any) => (
                <div className="d-flex align-items-center">
                    <Link href="#" className="avatar avatar-md me-2">
                        <img src={record.image} alt="product" />
                    </Link>
                    <Link href="#">{text}</Link>
                </div>

            ),
            sorter: (a:any, b:any) => a.Name.length - b.Name.length,
        },
        {
            title: "Email",
            dataIndex: "Email",
            sorter: (a:any, b:any) => a.Email.length - b.Email.length,
        },

        {
            title: "Phone",
            dataIndex: "Phone",
            sorter: (a:any, b:any) => a.Phone.length - b.Phone.length,
        },
        {
            title: "Role",
            dataIndex: "Role",
            sorter: (a:any, b:any) => a.Role.length - b.Role.length,
        },
        {
            title: "Status",
            dataIndex: "Status",
            render: (text:any) => (
                <>
                    <span className="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-success fs-10">
                        <i className="ti ti-point-filled me-1 fs-11" />
                        {text}
                    </span>

                </>
            ),
            sorter: (a:any, b:any) => a.Status.length - b.Status.length,
        },

        {
            title: "Action",
            dataIndex: "action",
            render: () => (
                <div className="edit-delete-action d-flex align-items-center">
                    <Link
                        className="me-2 p-2 d-flex align-items-center border rounded"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-contact"
                    >
                        <i data-feather="edit" className="feather-edit" />
                    </Link>
                    <Link
                        data-bs-toggle="modal"
                        data-bs-target="#delete-modal"
                        className="p-2 d-flex align-items-center border rounded"
                        href="#"
                    >
                        <i data-feather="trash-2" className="feather-trash-2" />
                    </Link>
                </div>

            ),
            sorter: (a:any, b:any) => a.createdby.length - b.createdby.length,
        },
    ];

export default function ContactsTable() {
  return (
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <div className="search-set">
                        </div>
                        <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                            <div className="dropdown me-2">
                                <Link
                                    href="#"
                                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                                    data-bs-toggle="dropdown"
                                >
                                    Status
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
                                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
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

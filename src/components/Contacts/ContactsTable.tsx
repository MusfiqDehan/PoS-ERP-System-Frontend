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
    render: (text: any, record: any) => (
      <div className="flex items-center gap-2">
        <Link
          href="#"
          className="w-10 h-10 rounded-full border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0"
        >
          <img src={record.image} alt="contact" className="w-full h-full object-cover" />
        </Link>
        <Link href="#" className="text-[15px] font-medium text-[#212B36] hover:text-[#0ac79e]">
          {text}
        </Link>
      </div>
    ),
    sorter: (a: any, b: any) => a.Name.length - b.Name.length,
  },
  {
    title: "Email",
    dataIndex: "Email",
    sorter: (a: any, b: any) => a.Email.length - b.Email.length,
  },
  {
    title: "Phone",
    dataIndex: "Phone",
    sorter: (a: any, b: any) => a.Phone.length - b.Phone.length,
  },
  {
    title: "Role",
    dataIndex: "Role",
    sorter: (a: any, b: any) => a.Role.length - b.Role.length,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (text: any) => (
      <span
        className={`inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium ${
          text === "Inactive"
            ? "bg-[#fff0f0] text-[#c80000]"
            : "bg-[#E7FBF7] text-[#0ac79e]"
        }`}
      >
        <i className="ti ti-point-filled" />
        {text}
      </span>
    ),
    sorter: (a: any, b: any) => a.Status.length - b.Status.length,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <div className="inline-flex items-center gap-2">
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit-contact"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
        >
          <i className="ti ti-edit" />
        </Link>
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#delete-modal"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
        >
          <i className="ti ti-trash" />
        </Link>
      </div>
    ),
  },
];

const filterDropdowns = [
  { label: "Status", items: ["Active", "Inactive"] },
  {
    label: "Sort By : Last 7 Days",
    items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"],
  },
];

export default function ContactsTable() {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-end flex-wrap gap-2 p-4 border-b border-[#f1f1f1]">
        {filterDropdowns.map((dd) => (
          <div key={dd.label} className="dropdown">
            <button
              type="button"
              data-bs-toggle="dropdown"
              className="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded text-[14px] text-[#646B72] bg-white hover:border-[#0ac79e]"
            >
              {dd.label}
              <i className="ti ti-chevron-down text-[14px]" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end p-2">
              {dd.items.map((item) => (
                <li key={item}>
                  <Link href="#" className="dropdown-item rounded-1">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

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
    render: (text: any) => (
      <h6 className="m-0 text-[15px] font-medium">
        <Link href="#" className="text-[#212B36] hover:text-[#0ac79e]">
          {text}
        </Link>
      </h6>
    ),
    sorter: (a: any, b: any) => a.Plan_Name.length - b.Plan_Name.length,
  },
  {
    title: "Plan Type",
    dataIndex: "Plan_Type",
    sorter: (a: any, b: any) => a.Plan_Type.length - b.Plan_Type.length,
  },
  {
    title: "Total Subscribers",
    dataIndex: "Total_Subscribers",
    sorter: (a: any, b: any) =>
      a.Total_Subscribers.length - b.Total_Subscribers.length,
  },
  {
    title: "Price",
    dataIndex: "Price",
    render: (text: any) => <span className="font-semibold text-[#212B36]">{text}</span>,
    sorter: (a: any, b: any) => a.Price.length - b.Price.length,
  },
  {
    title: "Created Date",
    dataIndex: "Created_Date",
    sorter: (a: any, b: any) => a.Created_Date.length - b.Created_Date.length,
  },
  {
    title: "Status",
    dataIndex: "Status",
    render: (text: any) => (
      <span
        className={`inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium ${
          text === "Active"
            ? "bg-[#E7FBF7] text-[#0ac79e]"
            : "bg-[#fff0f0] text-[#c80000]"
        }`}
      >
        <i className="ti ti-point-filled" />
        {text}
      </span>
    ),
    sorter: (a: any, b: any) => a.Status.length - b.Status.length,
  },
  {
    title: "",
    dataIndex: "actions",
    render: () => (
      <div className="inline-flex items-center gap-2">
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#edit_plans"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
        >
          <i className="ti ti-edit" />
        </Link>
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#delete_modal"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
        >
          <i className="ti ti-trash" />
        </Link>
      </div>
    ),
  },
];

const filterDropdowns = [
  { label: "Select Status", items: ["Active", "Inactive"] },
  {
    label: "Sort By : Last 7 Days",
    items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"],
  },
];

export default function PackagesTable() {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">Plan List</h5>
        <div className="flex items-center flex-wrap gap-2">
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
      </div>
      <div className="overflow-x-auto">
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
}

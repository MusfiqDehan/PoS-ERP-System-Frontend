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
      <div className="flex items-center gap-2">
        <Link
          href="#"
          className="w-10 h-10 rounded-full border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0"
        >
          <img
            src={`assets/img/company/${record.Image}`}
            className="w-full h-full object-cover"
            alt="img"
          />
        </Link>
        <h6 className="m-0 text-[15px] font-medium">
          <Link href="#" className="text-[#212B36] hover:text-[#0ac79e]">
            {record.CompanyName}
          </Link>
        </h6>
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
    sorter: (a: any, b: any) => a.PaymentMethod.length - b.PaymentMethod.length,
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    render: (text: any) => <span className="font-semibold text-[#212B36]">{text}</span>,
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
        className={`inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium ${
          text === "Paid"
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
          data-bs-target="#view_invoice"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
        >
          <i className="ti ti-file-invoice" />
        </Link>
        <Link
          href="#"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
        >
          <i className="ti ti-download" />
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
  { label: "Select Plan", items: ["Advanced (Monthly)", "Basic (Yearly)", "Enterprise (Monthly)"] },
  { label: "Select Status", items: ["Paid", "Unpaid"] },
  {
    label: "Sort By : Last 7 Days",
    items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"],
  },
];

export default function SubscriptionsTable() {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">
          Subscription List
        </h5>
        <div className="flex items-center flex-wrap gap-2">
          <div className="relative">
            <PredefinedDateRanges />
          </div>
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
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

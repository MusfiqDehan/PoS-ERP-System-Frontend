"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { domain_details } from "@/core/json/domainDetails";
import Table from "@/core/common/pagination/datatable";

const data = domain_details;

const statusMap: Record<string, { bg: string; color: string; icon: string }> = {
  Approved: { bg: "#E7FBF7", color: "#0ac79e", icon: "ti ti-checks" },
  Pending: { bg: "#EAF1FE", color: "#155EEF", icon: "ti ti-clock" },
  Rejected: { bg: "#fff0f0", color: "#c80000", icon: "ti ti-x" },
};

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
            {text}
          </Link>
        </h6>
      </div>
    ),
    sorter: (a: any, b: any) => a.CompanyName.length - b.CompanyName.length,
  },
  {
    title: "Domain URL",
    dataIndex: "AccountURL",
    sorter: (a: any, b: any) => a.AccountURL.length - b.AccountURL.length,
  },
  {
    title: "Plan",
    dataIndex: "Plan",
    sorter: (a: any, b: any) => a.Plan.length - b.Plan.length,
  },
  {
    title: "Created Date",
    dataIndex: "CreatedDate",
    sorter: (a: any, b: any) => a.CreatedDate.length - b.CreatedDate.length,
  },
  {
    title: "Status",
    dataIndex: "DomainStatus",
    render: (text: any) => {
      const s = statusMap[text] || statusMap.Rejected;
      return (
        <span
          className="inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium"
          style={{ background: s.bg, color: s.color }}
        >
          <i className={s.icon} />
          {text}
        </span>
      );
    },
    sorter: (a: any, b: any) => a.DomainStatus.length - b.DomainStatus.length,
  },
  {
    title: "",
    dataIndex: "action",
    render: () => (
      <div className="inline-flex items-center gap-2">
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#domain_approved"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
        >
          <i className="ti ti-eye" />
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
  { label: "Select Plan Type", items: ["Monthly", "Yearly"] },
  { label: "Select Status", items: ["Approved", "Pending", "Rejected"] },
  {
    label: "Sort By : Last 7 Days",
    items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"],
  },
];

export default function DomainTable() {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px]">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 border-b border-[#f1f1f1]">
        <h5 className="m-0 text-[16px] font-semibold text-[#212B36]">Domain List</h5>
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
        <Table dataSource={data} columns={columns} Selection={true} />
      </div>
    </div>
  );
}

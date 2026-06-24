"use client";

import { DatePicker } from "antd";
import Link from "next/link";
import { getModalContainer } from "./kanbanUtils";

const tabs = [
  { label: "All", target: "#pills-home", active: true },
  { label: "High", target: "#pills-contact" },
  { label: "Medium", target: "#pills-medium" },
  { label: "Low", target: "#pills-low" },
];

export default function ProjectsFilters() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        <h6 className="m-0 text-[14px] font-semibold text-[#212B36]">Priority</h6>
        <ul
          className="nav nav-pills inline-flex items-center gap-1 p-1 rounded-md bg-[#f6f7f9] border border-[#f1f1f1]"
          id="pills-tab"
          role="tablist"
        >
          {tabs.map((t) => (
            <li className="nav-item" role="presentation" key={t.target}>
              <button
                className={`nav-link px-3 py-1.5 rounded text-[13px] font-medium ${t.active ? "active" : "text-[#646B72]"}`}
                data-bs-toggle="pill"
                data-bs-target={t.target}
                type="button"
                role="tab"
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center flex-wrap gap-2 lg:justify-end">
        <DatePicker format="DD-MM-YYYY" getPopupContainer={getModalContainer} placeholder="Create Date" />
        <DatePicker format="DD-MM-YYYY" getPopupContainer={getModalContainer} placeholder="Due Date" />
        <div className="dropdown">
          <button
            type="button"
            data-bs-toggle="dropdown"
            className="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded text-[14px] text-[#646B72] bg-white hover:border-[#0ac79e]"
          >
            Select Status <i className="ti ti-chevron-down text-[14px]" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end p-2">
            {["Inprogress", "On-hold", "Completed"].map((i) => (
              <li key={i}><Link href="#" className="dropdown-item rounded-1">{i}</Link></li>
            ))}
          </ul>
        </div>
        <div className="dropdown">
          <button
            type="button"
            data-bs-toggle="dropdown"
            className="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded text-[14px] text-[#646B72] bg-white hover:border-[#0ac79e]"
          >
            Sort By : Created Date <i className="ti ti-chevron-down text-[14px]" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end p-2">
            {["Created Date", "Last 7 Days", "Due Date"].map((i) => (
              <li key={i}><Link href="#" className="dropdown-item rounded-1">{i}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

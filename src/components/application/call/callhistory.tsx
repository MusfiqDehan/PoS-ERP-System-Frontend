"use client";
/* eslint-disable @next/next/no-img-element */

import { callhistorydata } from "@/core/json/callhistorydata";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";
import ExportButtons from "@/core/common/exportButtons";

const callTypeMap: Record<string, { icon: string; color: string }> = {
  "Incoming Call": { icon: "ti ti-phone-incoming", color: "#0ac79e" },
  "Outgoing Call": { icon: "ti ti-phone-outgoing", color: "#3577f1" },
};

const columns = [
  {
    title: "UserName",
    dataIndex: "username",
    render: (text: any, record: any) => (
      <div className="flex items-center gap-2">
        <Link href="#" className="w-10 h-10 rounded-full border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0">
          <img alt="user" src={record.image_url} className="w-full h-full object-cover" />
        </Link>
        <Link href="#" className="text-[15px] font-medium text-[#212B36] hover:text-[#0ac79e]">{text}</Link>
      </div>
    ),
    sorter: (a: any, b: any) => a.username.length - b.username.length,
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    sorter: (a: any, b: any) => a.phone_number.length - b.phone_number.length,
  },
  {
    title: "Call Type",
    dataIndex: "call_type",
    render: (text: any) => {
      const m = callTypeMap[text] || { icon: "ti ti-phone-x", color: "#dc3545" };
      return (
        <span className="inline-flex items-center gap-2 text-[#646B72]">
          <i className={m.icon} style={{ color: m.color }} />
          {text}
        </span>
      );
    },
    sorter: (a: any, b: any) => a.call_type.length - b.call_type.length,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    sorter: (a: any, b: any) => a.duration.length - b.duration.length,
  },
  {
    title: "Date & Time",
    dataIndex: "date_time",
    sorter: (a: any, b: any) => a.date_time.length - b.date_time.length,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: () => (
      <div className="inline-flex items-center gap-2">
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#user-profile-new"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
        >
          <i className="ti ti-eye" />
        </Link>
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#delete"
          className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
        >
          <i className="ti ti-trash" />
        </Link>
      </div>
    ),
  },
];

const filterDropdowns = [
  { label: "Call type", items: ["Incoming", "Outgoing", "Missed Call"] },
  { label: "Sort By : Last 7 Days", items: ["Recently Added", "Ascending", "Descending", "Last Month", "Last 7 Days"] },
];

export default function CallHistoryComponent() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
            <div>
              <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Call History</h4>
              <p className="m-0 text-[14px] font-medium text-[#646B72]">Manage your call history</p>
            </div>
            <ExportButtons />
          </div>

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
                        <Link href="#" className="dropdown-item rounded-1">{item}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <Table columns={columns} dataSource={callhistorydata} />
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>

      {/* Profile detail popup */}
      <div className="modal fade" id="user-profile-new">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content relative">
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="absolute top-4 right-4 w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
            <div className="p-6 text-center">
              <img
                className="w-[88px] h-[88px] rounded-full object-cover mx-auto mb-3 border-4 border-white shadow"
                src="assets/img/users/user-08.jpg"
                alt="user"
              />
              <div className="flex items-center justify-center gap-2 mb-4">
                <Link href={all_routes.videocall} className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[#f1f5f6] text-[#212B36] hover:bg-[#e7e7e7]" title="Video Call">
                  <i className="ti ti-video text-[18px]" />
                </Link>
                <Link href={all_routes.chat} className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[#0ac79e] text-white hover:bg-[#089b7c]" title="Chat">
                  <i className="ti ti-message text-[18px]" />
                </Link>
                <Link href={all_routes.audiocall} className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[#f1f5f6] text-[#212B36] hover:bg-[#e7e7e7]" title="Voice Call">
                  <i className="ti ti-phone-call text-[18px]" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-left">
                {[
                  { label: "Name", value: "Thomas" },
                  { label: "Phone", value: "+1 25182 94528" },
                  { label: "Email", value: "thomas@example.com" },
                  { label: "Total Calls", value: "20" },
                  { label: "Average Call Timing", value: "0.30" },
                  { label: "Average Waiting Time", value: "00.5" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-2 border-b border-[#f1f1f1] pb-2">
                    <span className="text-[13px] text-[#646B72]">{row.label}</span>
                    <span className="text-[13px] font-medium text-[#212B36]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete */}
      <div className="modal fade" id="delete">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <span className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-[#fff0f0] text-[#dc3545]">
                  <i className="ti ti-trash text-[32px]" />
                </span>
              </div>
              <h3 className="mb-1 text-[20px] font-bold text-[#212B36]">Delete History</h3>
              <p className="mb-4 text-[14px] text-[#646B72]">
                Are you sure you want to delete contact from call history?
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button type="button" data-bs-dismiss="modal" className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors">
                  No, Cancel
                </button>
                <button type="button" data-bs-dismiss="modal" className="px-4 py-2 rounded-[6px] bg-[#dc3545] text-white text-[14px] font-medium hover:bg-[#bb2d3b] transition-colors">
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

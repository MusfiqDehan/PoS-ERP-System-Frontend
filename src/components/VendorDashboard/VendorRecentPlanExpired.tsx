"use client";

import { useState } from "react";
import Link from "next/link";
import VendorListCard from "./VendorListCard";
import { expiredPlansData, planRequestsData } from "./vendorDashboardData";

const tabs = [
  { key: "expired", label: "Expired" },
  { key: "request", label: "Request" },
];

export default function VendorRecentPlanExpired() {
  const [activeTab, setActiveTab] = useState<string>("expired");

  return (
    <VendorListCard
      title="Recent Plan Expired"
      action={
        <div className="flex gap-0.5 p-1 bg-[#f2f4f7] rounded-[10px]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-[12px] font-semibold rounded-[7px] transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-white text-[#101828] shadow-sm"
                  : "text-[#667085] hover:text-[#101828]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="divide-y divide-[#f2f4f7]">
        {activeTab === "expired"
          ? expiredPlansData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-3 -mx-2 px-2 rounded-lg hover:bg-[#f9fafb] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-10 h-10 rounded-[10px] bg-[#f2f4f7] flex items-center justify-center shrink-0 border border-[#eef0f3]">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-5 h-5 object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <h6 className="m-0 text-[14px] font-semibold text-[#101828] truncate">
                      <Link
                        href="#"
                        className="hover:text-[#0ac79e] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </h6>
                    <p className="m-0 mt-0.5 text-[12px] text-[#667085]">
                      Expired: {item.expiredDate}
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="shrink-0 text-[12px] font-semibold text-[#0ac79e] hover:text-[#089b7c] whitespace-nowrap"
                >
                  Send Reminder
                </Link>
              </div>
            ))
          : planRequestsData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-3 -mx-2 px-2 rounded-lg hover:bg-[#f9fafb] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-10 h-10 rounded-[10px] bg-[#f2f4f7] flex items-center justify-center shrink-0 border border-[#eef0f3]">
                    <img
                      src={item.icon}
                      alt=""
                      className="w-5 h-5 object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <h6 className="m-0 text-[14px] font-semibold text-[#101828] truncate">
                      <Link
                        href="#"
                        className="hover:text-[#0ac79e] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </h6>
                    <p className="m-0 mt-0.5 text-[12px] text-[#0ac79e] truncate">
                      {item.domain}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#067647] bg-[#ecfdf3] hover:bg-[#067647] hover:text-white transition-all"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#b42318] bg-[#fef3f2] hover:bg-[#b42318] hover:text-white transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
      </div>
    </VendorListCard>
  );
}

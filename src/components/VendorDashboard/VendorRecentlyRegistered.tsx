"use client";

import Link from "next/link";
import VendorListCard from "./VendorListCard";
import { recentlyRegisteredData } from "./vendorDashboardData";
import { all_routes } from "@/data/all_routes";

export default function VendorRecentlyRegistered() {
  const routes = all_routes;
  return (
    <VendorListCard
      title="Recently Registered"
      action={
        <Link
          href={routes.superAdminPurchaseTransaction}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#0ac79e] bg-[#0ac79e]/10 hover:bg-[#0ac79e]/15 transition-colors"
        >
          View All
        </Link>
      }
    >
      <div className="divide-y divide-[#f2f4f7]">
        {recentlyRegisteredData.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 py-3 -mx-2 px-2 rounded-lg hover:bg-[#f9fafb] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-10 h-10 rounded-[10px] bg-[#f2f4f7] flex items-center justify-center shrink-0 border border-[#eef0f3]">
                <img src={item.icon} alt="" className="w-5 h-5 object-contain" />
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
                  {item.plan}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-[13px] font-semibold text-[#344054] whitespace-nowrap">
              {item.users}
            </span>
          </div>
        ))}
      </div>
    </VendorListCard>
  );
}

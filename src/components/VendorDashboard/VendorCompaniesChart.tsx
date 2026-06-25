"use client";

import Link from "next/link";
import VendorChartCard from "./VendorChartCard";
import CompanyChart from "./charts/VendorCompanyChart";

const dropdownBtn =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#eef0f3] bg-white text-[#667085] text-[12px] font-medium hover:bg-[#f9fafb] hover:text-[#101828] transition-colors";

export default function VendorCompaniesChart() {
  return (
    <VendorChartCard
      title="Companies"
      action={
        <div className="dropdown">
          <Link href="#" className={dropdownBtn} data-bs-toggle="dropdown">
            <i className="ti ti-calendar text-[13px]" />
            This Week
          </Link>
          <ul className="dropdown-menu dropdown-menu-end p-2 min-w-[140px]">
            {["This Month", "This Week", "Today"].map((item) => (
              <li key={item}>
                <Link href="#" className="dropdown-item rounded-md text-[13px] py-1.5">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <CompanyChart />
      <div className="mt-2 flex items-center gap-2 text-[13px] text-[#667085]">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ecfdf3] text-[#067647] text-[12px] font-semibold">
          +6%
        </span>
        5 Companies from last month
      </div>
    </VendorChartCard>
  );
}

"use client";

import DashboardDateRange from "./DashboardDateRange";

export default function PageHeader() {
  return (
    <div className="flex items-center justify-between gap-[16px] flex-wrap w-full mb-[1.5rem]">
      <div className="flex flex-col gap-[4px] max-w-[204px]">
        <h1 className="m-0 text-[20px] font-bold leading-[normal] text-[#212B36] uppercase">
          Welcome Admin
        </h1>
        <p className="m-0 text-[12px] font-medium leading-[normal] text-[#646B72]">
          You have <span className="text-[#089b7c] font-medium">200+</span>{" "}
          Orders, Today
        </p>
      </div>
      <DashboardDateRange />
    </div>
  );
}

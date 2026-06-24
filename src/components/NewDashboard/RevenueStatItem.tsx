"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import type { RevenueStatData } from "./revenueStatsData";

type RevenueStatItemProps = {
  stat: RevenueStatData;
  isFirst?: boolean;
  isLast?: boolean;
};

export default function RevenueStatItem({
  stat,
  isFirst,
  isLast,
}: RevenueStatItemProps) {
  return (
    <div
      className={`flex-1 min-w-0 flex flex-col gap-[16px] px-[16px] max-[1199.98px]:px-0 ${
        isFirst ? "pl-0" : ""
      } ${isLast ? "pr-0" : ""}`}
    >
      <div
        className="flex items-start justify-between gap-[4px] w-full pb-[12px] border-b border-solid"
        style={{ borderBottomColor: stat.borderColor }}
      >
        <div className="flex flex-col gap-[5px] min-w-0 max-w-[188px]">
          <p className="m-0 text-[20px] font-semibold leading-[normal] text-[#212B36]">
            {stat.value}
          </p>
          <p className="m-0 text-[16px] font-medium leading-[normal] text-[#646B72]">
            {stat.label}
          </p>
        </div>
        <span
          className="w-[36px] h-[36px] rounded-[3px] p-[7.5px] box-border flex items-center justify-center shrink-0 ml-auto"
          style={{ backgroundColor: stat.iconBg }}
        >
          <ImageWithBasePath
            src={stat.iconSrc}
            alt=""
            width={stat.iconWidth}
            height={stat.iconHeight}
            className="block object-contain"
          />
        </span>
      </div>
      <div className="flex items-center justify-between gap-[8px]">
        <p className="m-0 text-[14px] font-medium leading-[normal] text-[#646B72] whitespace-nowrap">
          <span
            className={
              stat.trend === "up" ? "text-[#237f46]" : "text-[#c80000]"
            }
          >
            {stat.change}
          </span>{" "}
          vs Last Month
        </p>
        <Link
          href={stat.viewAllHref}
          className="text-[14px] font-medium leading-[normal] text-[#646B72] underline whitespace-nowrap hover:text-[#212B36]"
        >
          View All
        </Link>
      </div>
    </div>
  );
}

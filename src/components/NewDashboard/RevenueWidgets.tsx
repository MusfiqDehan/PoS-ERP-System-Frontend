"use client";

import RevenueStatItem from "./RevenueStatItem";
import { revenueStatsData } from "./revenueStatsData";

export default function RevenueWidgets() {
  return (
    <div className="mt-[24px] bg-white border border-[#f1f1f1] rounded-[8px] overflow-hidden">
      <div className="flex items-center justify-between py-[18px] px-[16px] gap-0 max-[1199.98px]:flex-wrap max-[1199.98px]:gap-x-0 max-[1199.98px]:gap-y-[24px]">
        {revenueStatsData.map((stat, index) => (
          <div
            key={stat.id}
            className="flex items-center flex-[1_1_0] min-w-0 max-[1199.98px]:flex-[1_1_calc(50%_-_12px)] max-[1199.98px]:px-[12px] max-[575px]:flex-[1_1_100%]"
          >
            {index > 0 ? (
              <span
                className="w-px h-[93px] bg-[#e7e7e7] shrink-0 mr-[16px] max-[1199.98px]:hidden"
                aria-hidden="true"
              />
            ) : null}
            <RevenueStatItem
              stat={stat}
              isFirst={index === 0}
              isLast={index === revenueStatsData.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

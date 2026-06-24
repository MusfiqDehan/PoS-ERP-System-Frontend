"use client";

import TotaltransactionChart from "@/components/charts/superAdmincharts/totaltransaction";
import ActivesubscriptionChart from "@/components/charts/superAdmincharts/activeSubscription";
import ExpiredsubscriptionChart from "@/components/charts/superAdmincharts/expiredSubscription";
import TotalsubscriptionChart from "@/components/charts/superAdmincharts/totalSubscription";

const cards = [
  { label: "Total Transaction", value: "$5,340", chart: <TotaltransactionChart /> },
  { label: "Total Subscribers", value: "600", chart: <TotalsubscriptionChart /> },
  { label: "Active Subscribers", value: "560", chart: <ActivesubscriptionChart /> },
  { label: "Expired Subscribers", value: "40", chart: <ExpiredsubscriptionChart /> },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-4 gap-[24px] mb-[1.5rem]">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-[#f1f1f1] rounded-[8px] p-4"
        >
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#f1f1f1]">
            <div className="min-w-0">
              <span className="block text-[14px] font-normal text-[#646B72] mb-1 truncate">
                {card.label}
              </span>
              <h5 className="text-[20px] font-bold text-[#212B36] m-0">{card.value}</h5>
            </div>
            <div className="shrink-0">{card.chart}</div>
          </div>
          <p className="m-0 text-[12px] font-normal text-[#646B72] flex items-center gap-1 truncate">
            <span className="text-[#0ac79e] inline-flex items-center gap-1">
              <i className="ti ti-arrow-wave-right-up" />
              +19.01%
            </span>
            from last week
          </p>
        </div>
      ))}
    </div>
  );
}

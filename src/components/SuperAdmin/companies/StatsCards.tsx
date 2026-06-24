"use client";

import TotalChart from "@/components/charts/superAdmincharts/totalChart";
import ActiveCompanyChart from "@/components/charts/superAdmincharts/activeCompanyChart";
import InactiveCompanyChart from "@/components/charts/superAdmincharts/inactiveCompanyChart";
import LocationChart from "@/components/charts/superAdmincharts/locationChart";

const cards = [
  { label: "Total Companies", value: "950", icon: "ti ti-building", accent: "#0ac79e", tint: "#E7FBF7", chart: <TotalChart /> },
  { label: "Active Companies", value: "920", icon: "ti ti-circle-check", accent: "#3EB780", tint: "#ECFAF2", chart: <ActiveCompanyChart /> },
  { label: "Inactive Companies", value: "30", icon: "ti ti-ban", accent: "#FF4031", tint: "#FFE8E8", chart: <InactiveCompanyChart /> },
  { label: "Company Location", value: "180", icon: "ti ti-map-pin-check", accent: "#06AED4", tint: "#E9F8FB", chart: <LocationChart /> },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 gap-[24px] mb-[1.5rem]">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0"
              style={{ background: card.tint }}
            >
              <i className={card.icon} style={{ color: card.accent, fontSize: 24 }} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[#646B72] mb-1 truncate">
                {card.label}
              </p>
              <h4 className="text-[24px] font-bold text-[#212B36] m-0 leading-none">
                {card.value}
              </h4>
            </div>
          </div>
          <div className="shrink-0">{card.chart}</div>
        </div>
      ))}
    </div>
  );
}

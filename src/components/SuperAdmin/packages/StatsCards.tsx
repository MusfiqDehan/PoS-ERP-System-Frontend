"use client";

const cards = [
  { label: "Total Plans", value: "08", icon: "ti ti-box", accent: "#0ac79e", tint: "#E7FBF7" },
  { label: "Active Plans", value: "08", icon: "ti ti-activity-heartbeat", accent: "#3EB780", tint: "#ECFAF2" },
  { label: "Inactive Plans", value: "0", icon: "ti ti-player-pause", accent: "#FF4031", tint: "#FFE8E8" },
  { label: "No of Plan Types", value: "02", icon: "ti ti-mask", accent: "#06AED4", tint: "#E9F8FB" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 gap-[24px] mb-[1.5rem]">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 flex items-center justify-between gap-3"
        >
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#646B72] mb-1 truncate">
              {card.label}
            </p>
            <h4 className="text-[24px] font-bold text-[#212B36] m-0">{card.value}</h4>
          </div>
          <span
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0"
            style={{ background: card.tint }}
          >
            <i className={card.icon} style={{ color: card.accent, fontSize: 24 }} />
          </span>
        </div>
      ))}
    </div>
  );
}

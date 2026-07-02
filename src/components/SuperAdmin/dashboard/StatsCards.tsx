"use client";

const cards = [
  { label: "Total Companies", value: "5465", icon: "ti ti-building", accent: "#0ac79e", badge: "+19.01%", badgeUp: true },
  { label: "Active Companies", value: "4598", icon: "ti ti-circle-check", accent: "#3EB780", badge: "-12%", badgeUp: false },
  { label: "Total Subscribers", value: "3698", icon: "ti ti-users", accent: "#7364c2", badge: "+6%", badgeUp: true },
  { label: "Total Earnings", value: "$89,878.58", icon: "ti ti-businessplan", accent: "#FF6F28", badge: "-16%", badgeUp: false },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 min-[768px]:grid-cols-2 min-[992px]:grid-cols-4 gap-[20px] mb-[1.25rem]">
      {cards.map(function(card) {
        return (
          <div
            key={card.label}
            className="group relative bg-white rounded-[12px] p-5 border border-[#eef0f3] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)] hover:shadow-[0_8px_24px_rgba(16,24,40,0.10)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
            {/* accent bar */}
            <span
              className="absolute top-0 left-0 h-full w-[4px]"
              style={{ backgroundColor: card.accent }}
              aria-hidden="true"
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="m-0 text-[16px] font-medium text-[#667085] truncate">
                    {card.label}
                  </p>
                  <span
                    className={"inline-flex items-center px-2 py-[3px] rounded-full text-[12px] font-semibold " +
                      (card.badgeUp ? "text-[#067647] bg-[#ecfdf3]" : "text-[#b42318] bg-[#fef3f2]")}
                  >
                    {card.badge}
                  </span>
                </div>
                <h4 className="m-0 mt-1 text-[32px] font-bold leading-[1.1] text-[#101828] tracking-tight">
                  {card.value}
                </h4>
              </div>

              {/* icon tile */}
              <span
                className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: card.accent }}
              >
                <i className={card.icon + " text-white text-[26px]"} />
              </span>
            </div>

            {/* subtle bottom glow */}
            <span
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40"
              style={{ background: "linear-gradient(to right, " + card.accent + ", transparent)" }}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
}

"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import type { KpiCardData } from "./kpiCardsData";

type KpiCardProps = {
  card: KpiCardData;
};

export default function KpiCard({ card }: KpiCardProps) {
  const trendIcon =
    card.trend === "up" ? "ti ti-arrow-up" : "ti ti-arrow-down";

  return (
    <div
      className="relative min-h-[132px] pt-[16px] pr-[12px] pb-[16px] pl-[16px] bg-white border-t-2 border-l-2 border-r border-b border-solid rounded-[8px] overflow-hidden flex flex-col gap-[12px]"
      style={{ borderColor: card.accentColor }}
    >
      <p
        className={`m-0 text-[16px] font-medium leading-[1.2] ${
          card.titleMuted ? "text-[#646B72]" : "text-[#212B36]"
        }`}
      >
        {card.title}
      </p>
      <h4
        className="m-0 text-[24px] font-semibold leading-[32px]"
        style={{ color: card.accentColor }}
      >
        {card.value}
      </h4>
      <span
        className={`inline-flex items-center gap-[4px] w-fit pt-[4px] pr-[16px] pb-[4px] pl-[8px] rounded-[4px] text-[14px] font-medium leading-[1.2] ${
          card.trend === "up"
            ? "text-[#237f46] bg-[#f1fcf5]"
            : "text-[#c80000] bg-[#fff0f0]"
        }`}
      >
        <i className={`${trendIcon} text-[14px] leading-[1]`} />
        {card.change}
      </span>
      <span
        className={`absolute top-1/2 ${
          card.iconCircleInset ? "right-[-25px]" : "right-[-29px]"
        } w-[80px] h-[80px] rounded-full flex items-center justify-start pl-[16px] box-border -translate-y-1/2 shrink-0`}
        style={{
          backgroundColor: card.iconBg,
          ...(card.iconPadLeft != null
            ? { paddingLeft: card.iconPadLeft }
            : {}),
        }}
      >
        <ImageWithBasePath
          src={card.iconSrc}
          alt=""
          width={card.iconWidth}
          height={card.iconHeight}
          className="block object-contain shrink-0"
        />
      </span>
    </div>
  );
}

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
    <div className="col-xl-3 col-sm-6 col-12 d-flex">
      <div
        className="kpi-card flex-fill"
        style={{ borderColor: card.accentColor }}
      >
        <p
          className={`kpi-card__title${card.titleMuted ? " kpi-card__title--muted" : ""}`}
        >
          {card.title}
        </p>
        <h4 className="kpi-card__value" style={{ color: card.accentColor }}>
          {card.value}
        </h4>
        <span
          className={`kpi-card__badge kpi-card__badge--${card.trend}`}
        >
          <i className={trendIcon} />
          {card.change}
        </span>
        <span
          className={`kpi-card__icon${card.iconCircleInset ? " kpi-card__icon--inset" : ""}`}
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
            className="kpi-card__icon-img"
          />
        </span>
      </div>
    </div>
  );
}

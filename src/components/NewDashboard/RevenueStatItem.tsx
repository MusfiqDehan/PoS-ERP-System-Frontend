"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import type { RevenueStatData } from "./revenueStatsData";

type RevenueStatItemProps = {
  stat: RevenueStatData;
};

export default function RevenueStatItem({ stat }: RevenueStatItemProps) {
  return (
    <div className="revenue-stat">
      <div
        className="revenue-stat__header"
        style={{ borderBottomColor: stat.borderColor }}
      >
        <div className="revenue-stat__text">
          <p className="revenue-stat__value">{stat.value}</p>
          <p className="revenue-stat__label">{stat.label}</p>
        </div>
        <span
          className="revenue-stat__icon"
          style={{ backgroundColor: stat.iconBg }}
        >
          <ImageWithBasePath
            src={stat.iconSrc}
            alt=""
            width={stat.iconWidth}
            height={stat.iconHeight}
            className="revenue-stat__icon-img"
          />
        </span>
      </div>
      <div className="revenue-stat__footer">
        <p className="revenue-stat__change">
          <span
            className={`revenue-stat__change-value revenue-stat__change-value--${stat.trend}`}
          >
            {stat.change}
          </span>{" "}
          vs Last Month
        </p>
        <Link href={stat.viewAllHref} className="revenue-stat__link">
          View All
        </Link>
      </div>
    </div>
  );
}

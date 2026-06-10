"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { topCategoriesAssets } from "./topCategoriesData";

export default function TopCategoriesChart() {
  return (
    <div className="top-categories__chart" aria-hidden="true">
      <ImageWithBasePath
        src={topCategoriesAssets.chart}
        alt=""
        width={156}
        height={156}
        className="top-categories__chart-img"
      />
    </div>
  );
}

"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { useRef } from "react";
import { posProductFilters, posProductsPanelAssets } from "./posProductsData";

type PosCategoryTabsProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export default function PosCategoryTabs({
  activeTab,
  onTabChange,
}: PosCategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollFilters = () => {
    scrollRef.current?.scrollBy({ left: 180, behavior: "smooth" });
  };

  return (
    <div className="pos-products-panel__filters">
      <div ref={scrollRef} className="pos-products-panel__filters-track">
        {posProductFilters.map((filter) => {
          const isActive = activeTab === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              className={`pos-products-panel__filter-pill${
                isActive ? " is-active" : ""
              }`}
              onClick={() => onTabChange(filter.id)}
            >
              <span className="pos-products-panel__filter-label">
                {filter.label}
              </span>
              <span
                className={`pos-products-panel__filter-count${
                  isActive ? " is-active" : ""
                }`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="pos-products-panel__filters-scroll"
        onClick={scrollFilters}
        aria-label="Scroll categories"
      >
        <ImageWithBasePath
          src={posProductsPanelAssets.chevronRight}
          alt=""
          width={16}
          height={16}
          className="pos-products-panel__filters-scroll-icon"
        />
      </button>
    </div>
  );
}

"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { useCallback, useEffect, useRef, useState } from "react";
import { posProductsPanelAssets } from "./posProductsData";
import type { PosProductFilter } from "./posProductsData";

type PosCategoryTabsProps = {
  categories: PosProductFilter[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

const SCROLL_STEP = 180;

export default function PosCategoryTabs({
  categories,
  activeTab,
  onTabChange,
}: PosCategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = scrollRef.current;
    if (!track) return;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 0);
    setCanScrollRight(track.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [categories, updateScrollState]);

  const scrollFilters = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -SCROLL_STEP : SCROLL_STEP,
      behavior: "smooth",
    });
  };

  return (
    <div className="pos-products-panel__filters">
      <button
        type="button"
        className="pos-products-panel__filters-scroll"
        onClick={() => scrollFilters("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll categories left"
      >
        <ImageWithBasePath
          src={posProductsPanelAssets.chevronRight}
          alt=""
          width={16}
          height={16}
          className="pos-products-panel__filters-scroll-icon pos-products-panel__filters-scroll-icon--left"
        />
      </button>

      <div ref={scrollRef} className="pos-products-panel__filters-track">
        {categories.map((filter) => {
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
        onClick={() => scrollFilters("right")}
        disabled={!canScrollRight}
        aria-label="Scroll categories right"
      >
        <ImageWithBasePath
          src={posProductsPanelAssets.chevronRight}
          alt=""
          width={16}
          height={16}
          className="pos-products-panel__filters-scroll-icon pos-products-panel__filters-scroll-icon--right"
        />
      </button>
    </div>
  );
}

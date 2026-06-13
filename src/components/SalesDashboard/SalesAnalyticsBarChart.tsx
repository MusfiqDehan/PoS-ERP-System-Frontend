"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  salesAnalyticsChartMax,
  salesAnalyticsFeaturedMonthIndex,
  salesAnalyticsMonths,
  salesAnalyticsYAxisLabels,
} from "./salesAnalyticsData";

const toBarHeight = (value: number) =>
  `${(value / salesAnalyticsChartMax) * 100}%`;

type TooltipPosition = {
  left: number;
  top: number;
};

export default function SalesAnalyticsBarChart() {
  const featuredMonth = salesAnalyticsMonths[salesAnalyticsFeaturedMonthIndex];
  const barsAreaRef = useRef<HTMLDivElement>(null);
  const barsScrollRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [tooltip, setTooltip] = useState({
    monthIndex: salesAnalyticsFeaturedMonthIndex,
    value: featuredMonth.tooltipValue,
  });
  const [tooltipPos, setTooltipPos] = useState<TooltipPosition | null>(null);

  const updateTooltipPosition = useCallback((monthIndex: number) => {
    const area = barsAreaRef.current;
    const barEl = barRefs.current[monthIndex];
    if (!area || !barEl) {
      return;
    }

    const areaRect = area.getBoundingClientRect();
    const barRect = barEl.getBoundingClientRect();

    setTooltipPos({
      left: barRect.left - areaRect.left + barRect.width / 2,
      top: barRect.top - areaRect.top,
    });
  }, []);

  useLayoutEffect(() => {
    updateTooltipPosition(tooltip.monthIndex);
  }, [tooltip.monthIndex, updateTooltipPosition]);

  useEffect(() => {
    const area = barsAreaRef.current;
    const scrollEl = barsScrollRef.current;
    if (!area) {
      return;
    }

    const handleReposition = () => updateTooltipPosition(tooltip.monthIndex);

    const observer = new ResizeObserver(handleReposition);
    observer.observe(area);

    window.addEventListener("resize", handleReposition);
    scrollEl?.addEventListener("scroll", handleReposition, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleReposition);
      scrollEl?.removeEventListener("scroll", handleReposition);
    };
  }, [tooltip.monthIndex, updateTooltipPosition]);

  const showTooltip = useCallback(
    (monthIndex: number, value: string) => {
      setTooltip({ monthIndex, value });
      updateTooltipPosition(monthIndex);
    },
    [updateTooltipPosition],
  );

  const resetTooltip = useCallback(() => {
    setTooltip({
      monthIndex: salesAnalyticsFeaturedMonthIndex,
      value: featuredMonth.tooltipValue,
    });
    updateTooltipPosition(salesAnalyticsFeaturedMonthIndex);
  }, [featuredMonth.tooltipValue, updateTooltipPosition]);

  return (
    <div className="sales-analytics__plot">
      <ul className="sales-analytics__y-axis" aria-hidden="true">
        {salesAnalyticsYAxisLabels.map((label) => (
          <li key={label} className="sales-analytics__y-label">
            {label}
          </li>
        ))}
      </ul>

      <div className="sales-analytics__chart-main">
        <div ref={barsAreaRef} className="sales-analytics__bars-area">
          <div className="sales-analytics__grid-lines" aria-hidden="true">
            {salesAnalyticsYAxisLabels.map((label) => (
              <span key={label} className="sales-analytics__grid-line" />
            ))}
          </div>

          <div ref={barsScrollRef} className="sales-analytics__bars-scroll">
            <div className="sales-analytics__bars">
              {salesAnalyticsMonths.map((item, monthIndex) => (
                <div
                  key={item.month}
                  className="sales-analytics__bar-group"
                  onMouseEnter={() =>
                    showTooltip(monthIndex, item.tooltipValue)
                  }
                  onMouseLeave={resetTooltip}
                  onFocus={() => showTooltip(monthIndex, item.tooltipValue)}
                  onBlur={resetTooltip}
                >
                  <div className="sales-analytics__bar-stack">
                    <span
                      ref={(element) => {
                        barRefs.current[monthIndex] = element;
                      }}
                      className="sales-analytics__bar"
                      style={{ height: toBarHeight(item.height) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {tooltipPos && (
            <div
              key={tooltip.monthIndex}
              className="sales-analytics__tooltip"
              style={{
                left: `${tooltipPos.left}px`,
                top: `${tooltipPos.top}px`,
              }}
            >
              <p className="sales-analytics__tooltip-text">{tooltip.value}</p>
              <span
                className="sales-analytics__tooltip-arrow"
                aria-hidden="true"
              />
              <span
                className="sales-analytics__tooltip-marker"
                aria-hidden="true"
              >
                <span className="sales-analytics__tooltip-marker-core" />
              </span>
            </div>
          )}
        </div>

        <div className="sales-analytics__x-labels" aria-hidden="true">
          {salesAnalyticsMonths.map((item) => (
            <span key={item.month} className="sales-analytics__x-label">
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

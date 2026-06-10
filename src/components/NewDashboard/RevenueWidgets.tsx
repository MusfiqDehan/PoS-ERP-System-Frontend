"use client";

import RevenueStatItem from "./RevenueStatItem";
import { revenueStatsData } from "./revenueStatsData";

export default function RevenueWidgets() {
  return (
    <div className="revenue-stats-panel">
      <div className="revenue-stats-panel__grid">
        {revenueStatsData.map((stat, index) => (
          <div key={stat.id} className="revenue-stats-panel__cell">
            {index > 0 ? (
              <span
                className="revenue-stats-panel__divider"
                aria-hidden="true"
              />
            ) : null}
            <RevenueStatItem stat={stat} />
          </div>
        ))}
      </div>
    </div>
  );
}

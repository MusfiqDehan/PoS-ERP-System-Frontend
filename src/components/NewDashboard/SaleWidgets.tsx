"use client";

import KpiCard from "./KpiCard";
import { kpiCardsData } from "./kpiCardsData";

export default function SaleWidgets() {
  return (
    <div className="row kpi-cards-row g-3 g-xl-4">
      {kpiCardsData.map((card) => (
        <KpiCard key={card.id} card={card} />
      ))}
    </div>
  );
}

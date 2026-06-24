"use client";

import KpiCard from "./KpiCard";
import { kpiCardsData } from "./kpiCardsData";

export default function SaleWidgets() {
  return (
    <div className="grid grid-cols-1 min-[576px]:grid-cols-2 min-[1200px]:grid-cols-4 gap-x-[24px] gap-y-[16px] min-[1200px]:gap-y-[24px]">
      {kpiCardsData.map((card) => (
        <KpiCard key={card.id} card={card} />
      ))}
    </div>
  );
}

"use client";

import VendorStatCard from "./VendorStatCard";
import { vendorStatsData } from "./vendorDashboardData";

export default function VendorStatCards() {
  return (
    <div className="grid grid-cols-1 min-[576px]:grid-cols-2 min-[1200px]:grid-cols-4 gap-4 mb-5">
      {vendorStatsData.map((stat) => (
        <VendorStatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

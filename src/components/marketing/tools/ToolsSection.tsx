"use client";

import React, { useState } from "react";
import { toolsContent } from "@/data/landing/tools";
import { PointOfSaleCard } from "@/components/marketing/tools/PointOfSaleCard";
import { InventoryCard } from "@/components/marketing/tools/InventoryCard";
import { MultiBranchCard } from "@/components/marketing/tools/MultiBranchCard";
import { AnalyticsCard } from "@/components/marketing/tools/AnalyticsCard";
import { MonitorSmartphone, Package, Building2, LineChart } from "lucide-react";
import { TwoLineSectionHeader } from "@/components/marketing/ui/TwoLineSectionHeader";

/**
 * ToolsSection component displaying the main features of the platform in a bento-grid layout.
 * Split into smaller, modular cards for readability.
 */
export function ToolsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "POS", icon: MonitorSmartphone, component: <PointOfSaleCard key="0" /> },
    { label: "Inventory", icon: Package, component: <InventoryCard key="1" /> },
    { label: "Multi-Branch", icon: Building2, component: <MultiBranchCard key="2" /> },
    { label: "Analytics", icon: LineChart, component: <AnalyticsCard key="3" /> },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-[#FAFCFB] relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-[#089B7C]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-32 h-48 w-48 rounded-full bg-[#5CE7C9]/[0.08] blur-3xl" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <TwoLineSectionHeader
          line1={toolsContent.titlePart1.trim()}
          highlight={toolsContent.highlight}
          description={toolsContent.description}
        />

        <div className="lg:hidden flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === index;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#089B7C] text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-5 gap-[30px]">
          <PointOfSaleCard />
          <InventoryCard />
          <MultiBranchCard />
          <AnalyticsCard />
        </div>

        <div className="block lg:hidden w-full">
          <div className="grid grid-cols-1 gap-6">{tabs[activeTab].component}</div>
        </div>
      </div>
    </section>
  );
}

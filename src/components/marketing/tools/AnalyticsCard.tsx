import React from "react";
import { toolsContent } from "@/data/landing/tools";

export function AnalyticsCard() {
  return (
    <div className="lg:col-span-3 bg-[#F8F8F8] rounded-lg border-[1.3px] border-[#F5F5F5] p-6 md:p-8 flex flex-col overflow-hidden group hover:border-[#089B7C] hover:shadow-lg transition-all duration-300">
      <h3
        className="!text-[26px] md:!text-[28px] !font-medium text-black mb-3 leading-tight"
        style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
      >
        {toolsContent.card4.title}
      </h3>
      <p
        className="text-[#666] text-base leading-[1.5] mb-8 max-w-xl"
        style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}
      >
        {toolsContent.card4.description}
      </p>

      {/* Two-panel layout matching Figma proportions */}
      <div className="mt-auto bg-white border-[1.3px] border-[#F1F1F1] rounded-lg overflow-hidden">
        <div className="flex">
          {/* Best Seller Panel — wider, takes ~54% (matches Figma 364/670) */}
          <div className="w-[54%] shrink-0 border-r border-[#F1F1F1]">
            <img
              src="/assets/products/best-seller-panel.png"
              alt="Best Seller"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Sales & Purchase Chart — remaining ~46% */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <img
              src="/assets/products/sales-chart-panel.png"
              alt="Sales & Purchase Chart"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { heroContent } from "@/data/landing/hero";
import { HeroContent } from "@/components/marketing/hero/HeroContent";
import { HeroVisuals } from "@/components/marketing/hero/HeroVisuals";

export function HeroSection() {
  return (
    <>
      <section className="relative bg-white pt-[144px] pb-0 overflow-hidden">
        <div className="mx-auto px-4 md:px-8" style={{ maxWidth: 1170 }}>
          <div className="flex flex-col items-center">
            <HeroContent />
            <HeroVisuals />
          </div>
        </div>
      </section>

      {/* Trust Bar below Hero */}
      <div className="bg-[#F8F9FA] border-y border-gray-200 py-8 lg:py-6 relative z-40">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
          <div className="font-bold text-[22px] lg:text-[18px] text-[#222222] max-w-sm leading-snug text-center lg:text-left">
            {heroContent.trustTitle}
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:flex md:flex-wrap md:w-auto md:justify-end">
            {heroContent.trustBadges.map((badge, index) => {
              let mobileSpan = "col-span-1";
              if (index === 0 || index === 3 || index === 4) mobileSpan = "col-span-2";

              return (
                <div
                  key={badge}
                  className={`border border-[#089B7C] text-[#222222] text-[14px] md:text-[13px] font-bold px-4 py-3 md:py-2 bg-white rounded-none flex items-center justify-center text-center transition-all duration-300 hover:bg-[#089B7C] hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(8,155,124,0.2)] cursor-pointer ${mobileSpan} md:col-span-1`}
                >
                  {badge}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React from "react";
import { industryContent } from "@/data/landing/industry";
import Image from "next/image";
import { TwoLineSectionHeader } from "@/components/marketing/ui/TwoLineSectionHeader";

export function IndustrySection() {
  return (
    <section id="industries" className="py-[64px] bg-white">
      <div className="mx-auto px-4 md:px-8" style={{ maxWidth: 1170 }}>
        <TwoLineSectionHeader
          line1="One Connected Platform Built For"
          highlight="Every Industry"
          description={industryContent.description}
        />

        {/* Industry Cards Grid - 6 columns, 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[30px]">
          {industryContent.industries.map((ind, index) => {
            const isFlipped = index % 2 === 1;

            return (
              <div key={ind.name} className="flex flex-col items-center gap-[16px] group cursor-pointer">
                {isFlipped ? (
                  /* Flipped card: visual border moves to bottom */
                  <div className="flex items-center justify-center">
                    <div className="-scale-y-100 flex-none w-[170px]">
                      <div className="relative h-[170px] w-full rounded-[8px] border-t-2 border-[#089B7C]">
                        <div className="absolute left-1/2 -translate-x-1/2 top-[4px] w-[170px] h-[164px] rounded-[8px] bg-[#F5F5F5] flex items-center justify-center">
                          <div className="w-[108px] h-[108px] flex items-center justify-center">
                            <div className="-scale-y-100 flex-none">
                              <Image
                                src={ind.image}
                                alt={ind.name}
                                width={108}
                                height={108}
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Normal card */
                  <div className="relative h-[170px] w-[170px] rounded-[8px] border-t-2 border-primary-700">
                    <div className="absolute left-1/2 -translate-x-1/2 top-[4px] w-[170px] h-[164px] rounded-[8px] bg-[#F5F5F5] flex items-center justify-center">
                      <div className="w-[108px] h-[108px] flex items-center justify-center">
                        <Image
                          src={ind.image}
                          alt={ind.name}
                          width={108}
                          height={108}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Label */}
                <span className="text-[16px] font-medium text-[#212121] text-center capitalize leading-none transition-colors duration-300 group-hover:text-[#089B7C]">
                  {ind.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

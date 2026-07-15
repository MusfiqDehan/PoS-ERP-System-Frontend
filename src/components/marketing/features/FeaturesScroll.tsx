"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

import { featuresScrollContent } from "@/data/landing/features";
import { TwoLineSectionHeader } from "@/components/marketing/ui/TwoLineSectionHeader";

export function FeaturesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest * 5);
    if (index >= 5) index = 4;
    if (index < 0) index = 0;
    setActiveIndex(index);
  });

  return (
    <div ref={containerRef} className="relative md:h-[300vh]">
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center bg-[#E6FAF4] md:overflow-hidden py-16 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <TwoLineSectionHeader
            line1={featuresScrollContent.titlePart1}
            highlight={featuresScrollContent.highlight}
            line2After={featuresScrollContent.line2After}
            description={featuresScrollContent.description}
          />

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 md:gap-6 max-w-6xl mx-auto text-left relative pb-8 md:pb-0">
            {featuresScrollContent.features.map((feature, i) => {
              const Icon = feature.icon;
              const isActive = i === activeIndex;
              return (
                <div
                  key={feature.title}
                  className={`w-full md:w-[calc(33.333%-16px)] p-6 md:p-8 rounded-2xl shadow-sm border transition-all duration-300 ${
                    isActive
                      ? "md:bg-[#069D7A] md:border-[#069D7A] md:scale-[1.02] md:shadow-md"
                      : "md:bg-white md:border-transparent md:opacity-60"
                  } max-md:sticky max-md:bg-white max-md:border-gray-200 max-md:shadow-[0_-8px_20px_rgba(0,0,0,0.05)]`}
                  style={{
                    top: `calc(100px + ${i * 16}px)`,
                    zIndex: i + 10,
                  }}
                >
                  <div
                    className={`w-12 h-12 border rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-colors duration-300 ${
                      isActive
                        ? "md:bg-white/20 md:border-white/30"
                        : "md:bg-gray-50 md:border-gray-100"
                    } max-md:bg-gray-50 max-md:border-gray-100`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? "md:text-white" : "md:text-[#069D7A]"
                      } max-md:text-[#069D7A]`}
                    />
                  </div>
                  <h3
                    className={`font-bold text-[18px] md:text-[20px] mb-3 md:mb-4 transition-colors duration-300 ${
                      isActive ? "md:text-white" : "md:text-[#222222]"
                    } max-md:text-[#222222]`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-[14px] md:text-[15px] leading-relaxed transition-colors duration-300 ${
                      isActive ? "md:text-white/90" : "md:text-[#555]"
                    } max-md:text-[#555]`}
                  >
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

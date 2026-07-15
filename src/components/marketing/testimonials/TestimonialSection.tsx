"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { testimonialContent } from "@/data/landing/testimonial";
import { TwoLineSectionHeader } from "@/components/marketing/ui/TwoLineSectionHeader";

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Only auto-play on small screens where the carousel is active
    const isMobile = globalThis.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    let currentIndex = 0;
    const totalItems = testimonialContent.testimonials.length;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      setActiveIndex(currentIndex);
    }, 2000); // 2 seconds delay

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <TwoLineSectionHeader
          line1="Retailers Around The World Trust"
          highlight="Sortorium"
          line2After="Every Single Day"
          description={testimonialContent.description}
        />

        {/* Mobile View - Auto fading carousel without horizontal scroll */}
        <div className="relative md:hidden w-full h-[380px] sm:h-[340px] mb-8">
          {testimonialContent.testimonials.map((t, idx) => (
            <div 
              key={t.name} 
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <div className="bg-[#F9FAFB] p-6 sm:p-8 rounded-2xl flex flex-col h-full border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
                <div className="mb-4">
                  <svg viewBox="0 0 40 32" className="w-8 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9806 0L8.52097 9.84615H15.6516V32H0V16.6154L6.14194 0H12.9806ZM36.9806 0L32.521 9.84615H39.6516V32H24V16.6154L30.1419 0H36.9806Z" fill="#9CA3AF" opacity="0.8"/>
                  </svg>
                </div>
                <p className="text-[#555555] text-[14px] leading-relaxed flex-1 mb-6">
                  {t.quote}
                </p>
                
                <div className="mt-auto">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-[14px] h-[14px] fill-[#069D7A] text-[#069D7A]" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden shrink-0">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] text-[#222222]">{t.name}</h3>
                      <span className="text-[13px] text-[#666666]">{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Standard Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
          {testimonialContent.testimonials.map((t) => (
            <div key={t.name} className="bg-[#F9FAFB] p-8 lg:p-10 rounded-2xl flex flex-col h-full border border-transparent hover:border-gray-100 transition-colors">
              <div className="mb-6">
                <svg viewBox="0 0 40 32" className="w-10 h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9806 0L8.52097 9.84615H15.6516V32H0V16.6154L6.14194 0H12.9806ZM36.9806 0L32.521 9.84615H39.6516V32H24V16.6154L30.1419 0H36.9806Z" fill="#9CA3AF" opacity="0.8"/>
                </svg>
              </div>
              <p className="text-[#555555] text-[15px] leading-relaxed flex-1 mb-8">
                {t.quote}
              </p>
              
              <div className="mt-auto">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-[18px] h-[18px] fill-[#069D7A] text-[#069D7A]" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-[#222222]">{t.name}</h3>
                    <span className="text-[14px] text-[#666666]">{t.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:hidden justify-center items-center gap-2">
          {testimonialContent.testimonials.map((t, i) => (
            <div 
              key={t.name} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#069D7A]' : 'w-1.5 bg-gray-200'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}

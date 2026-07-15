"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { pricingContent } from "@/data/landing/pricing";
import { motion, AnimatePresence } from "framer-motion";
import { TwoLineSectionHeader } from "@/components/marketing/ui/TwoLineSectionHeader";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-16 md:py-24 bg-[#FAFCFB]" id="pricing">
      <div className="mx-auto px-4 md:px-8 flex flex-col items-center w-full max-w-[1280px]">
        <TwoLineSectionHeader
          line1="Simple Transparent Plans Built For"
          highlight="Growing Retail"
          line2After="Businesses"
          description={pricingContent.description}
          className="mb-8 md:mb-12"
        />

        {/* Toggle */}
        <div className="flex items-center justify-center mb-10 md:mb-14">
          <div className="bg-white border border-[#E7E7E7] rounded-full p-1 inline-flex items-center shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 text-[14px] font-semibold rounded-full transition-all duration-300 ${
                !isAnnual
                  ? "bg-[#089B7C] text-white shadow-sm"
                  : "text-[#666666] hover:text-[#212121]"
              }`}
            >
              {pricingContent.monthlyLabel}
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 text-[14px] font-semibold rounded-full flex items-center gap-2 transition-all duration-300 ${
                isAnnual
                  ? "bg-[#089B7C] text-white shadow-sm"
                  : "text-[#666666] hover:text-[#212121]"
              }`}
            >
              {pricingContent.annuallyLabel}
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  isAnnual ? "bg-white text-[#089B7C]" : "bg-[#E7FBF7] text-[#089B7C]"
                }`}
              >
                {pricingContent.discountBadge}
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-7 w-full items-stretch">
          {pricingContent.plans.map((plan, index) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const period = isAnnual ? "/year" : "/month";
            const isCenter = plan.isPopular;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`
                  relative flex flex-col h-full rounded-3xl bg-white transition-shadow duration-300
                  ${
                    isCenter
                      ? "border-2 border-[#089B7C] shadow-[0_12px_40px_rgba(8,155,124,0.18)] ring-4 ring-[#089B7C]/10 z-10"
                      : "border border-[#E7E7E7] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(8,155,124,0.12)]"
                  }
                `}
              >
                {isCenter && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#089B7C] text-white text-[12px] md:text-[13px] font-bold px-5 py-1.5 rounded-full whitespace-nowrap shadow-[0_4px_14px_rgba(8,155,124,0.35)]">
                    Most Popular
                  </div>
                )}

                <div className="flex flex-col h-full p-7 md:p-8">
                  <h3 className="text-[15px] font-semibold tracking-wide uppercase mb-2 text-[#089B7C]">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price + period}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className={`font-bold leading-none text-[#212121] ${
                          isCenter ? "text-[44px]" : "text-[40px]"
                        }`}
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                    {price !== "Custom" && (
                      <span className="text-[15px] font-medium text-[#666666]">
                        {period}
                      </span>
                    )}
                  </div>

                  {plan.subtitle ? (
                    <p className="text-[13px] mb-4 text-[#666666]">
                      {plan.subtitle}
                    </p>
                  ) : (
                    <div className="mb-4 h-[20px]" />
                  )}

                  <div className="h-px w-full mb-4 bg-[#E7E7E7]" />

                  <p className="text-[14px] leading-[1.6] mb-4 text-[#555555]">
                    {plan.desc}
                  </p>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[14px] text-[#212121]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E7FBF7]">
                          <Check className="w-3.5 h-3.5 text-[#089B7C]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex-1 min-h-6" aria-hidden />

                  <button
                    type="button"
                    className={`w-full text-[15px] font-semibold rounded-full px-6 py-3.5 transition-all duration-300 ${
                      isCenter
                        ? "bg-[#089B7C] text-white hover:bg-[#07856B] shadow-[0_6px_20px_rgba(8,155,124,0.3)]"
                        : "bg-[#212121] hover:bg-black text-white"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TwoLineSectionHeaderProps = {
  line1: string;
  /** Optional text before the green stamp on line 2 */
  line2Before?: string;
  /** 1–2 most important words with green stamp */
  highlight: string;
  /** Optional text after the green stamp on line 2 */
  line2After?: string;
  description?: ReactNode;
  className?: string;
};

/** 2-line header: line 1 plain, line 2 with green stamp on max 2 key words. */
export function TwoLineSectionHeader({
  line1,
  line2Before,
  highlight,
  line2After,
  description,
  className = "",
}: TwoLineSectionHeaderProps) {
  return (
    <div
      className={`flex w-full max-w-full flex-col items-center px-1 text-center mb-10 md:mb-16 ${className}`}
    >
      <h2 className="w-full max-w-full font-bold text-[#222222] leading-[1.25] text-center !text-[clamp(20px,5.2vw,42px)]">
        <span className="block text-balance whitespace-normal md:whitespace-nowrap">
          {line1}
        </span>
        <span className="mt-2 flex flex-wrap items-center justify-center gap-x-[0.28em] gap-y-1.5 whitespace-normal md:whitespace-nowrap">
          {line2Before ? <span>{line2Before}</span> : null}
          <span className="relative inline-flex max-w-full">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-[#089B7C] rounded-[6px] origin-left"
            />
            <span className="relative px-2.5 text-white sm:px-3">{highlight}</span>
          </span>
          {line2After ? <span>{line2After}</span> : null}
        </span>
      </h2>

      {description && (
        <p className="mt-5 md:mt-6 text-[15px] md:text-[18px] text-[#555555] leading-[1.6] max-w-3xl px-1">
          {description}
        </p>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Unique visual treatment per section */
  variant?:
    | "underline"
    | "split-accent"
    | "quote"
    | "bars"
    | "glow"
    | "bracket"
    | "plain";
  className?: string;
  align?: "center" | "left";
  maxWidthClass?: string;
};

export function SectionHeader({
  title,
  description,
  variant = "underline",
  className = "",
  align = "center",
  maxWidthClass = "max-w-3xl",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      className={`flex flex-col ${alignClass} mb-10 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {variant === "bars" && (
        <div className="flex items-center gap-3 mb-4 md:mb-5" aria-hidden>
          <span className="h-[2px] w-8 bg-[#089B7C] rounded-full" />
          <span className="h-[2px] w-3 bg-[#089B7C]/40 rounded-full" />
        </div>
      )}

      {variant === "quote" && (
        <div className="mb-3 md:mb-4 text-[#089B7C]/35" aria-hidden>
          <svg viewBox="0 0 40 32" className="w-10 h-auto mx-auto" fill="currentColor">
            <path d="M12.98 0L8.52 9.85H15.65V32H0V16.62L6.14 0h6.84ZM36.98 0L32.52 9.85H39.65V32H24V16.62L30.14 0h6.84Z" />
          </svg>
        </div>
      )}

      {variant === "bracket" && (
        <div className="flex items-center justify-center gap-4 mb-2" aria-hidden>
          <span className="w-6 h-6 border-l-2 border-t-2 border-[#089B7C] rounded-tl-sm" />
          <span className="w-6 h-6 border-r-2 border-t-2 border-[#089B7C] rounded-tr-sm" />
        </div>
      )}

      <h2
        className={`!text-[28px] sm:!text-[36px] md:!text-[44px] font-bold text-[#222222] leading-[1.2] ${maxWidthClass} ${
          variant === "glow" ? "relative" : ""
        }`}
      >
        {variant === "glow" && (
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-24 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#089B7C]/10 blur-2xl"
            aria-hidden
          />
        )}
        {title}
      </h2>

      {variant === "underline" && (
        <div className="mt-4 md:mt-5 h-[3px] w-14 md:w-16 rounded-full bg-gradient-to-r from-[#089B7C] to-[#5CE7C9]" />
      )}

      {variant === "split-accent" && (
        <div className="mt-4 md:mt-5 flex items-center gap-2" aria-hidden>
          <span className="h-[3px] w-10 rounded-full bg-[#089B7C]" />
          <span className="h-[3px] w-3 rounded-full bg-[#089B7C]/35" />
          <span className="h-[3px] w-3 rounded-full bg-[#089B7C]/20" />
        </div>
      )}

      {description && (
        <p className={`mt-4 md:mt-5 text-[15px] md:text-[18px] text-[#555555] leading-[1.6] ${maxWidthClass}`}>
          {description}
        </p>
      )}

      {variant === "bracket" && (
        <div className="flex items-center justify-center gap-4 mt-3" aria-hidden>
          <span className="w-6 h-6 border-l-2 border-b-2 border-[#089B7C] rounded-bl-sm" />
          <span className="w-6 h-6 border-r-2 border-b-2 border-[#089B7C] rounded-br-sm" />
        </div>
      )}
    </motion.div>
  );
}

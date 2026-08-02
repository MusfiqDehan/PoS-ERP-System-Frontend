"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroVisuals() {
  return (
    <div className="relative w-full max-w-[1170px] mx-auto h-[210px] sm:h-[300px] md:h-[430px] lg:h-[529px] mt-[32px]">
      {/* Sales & Purchase Panel - centered, behind everything */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-[20px] sm:top-[30px] md:top-[50px] lg:top-[60px] left-1/2 -translate-x-1/2 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[752px] shadow-[0_4px_60px_rgba(0,0,0,0.08)] rounded-[8px] overflow-hidden z-10 border border-[rgba(0,0,0,0.04)]"
      >
        <div className="bg-white">
          <Image
            src="/images/hero/sales-purchase.png"
            alt="Sales & Purchase Dashboard"
            width={752}
            height={344}
            className="w-full h-auto"
            priority
          />
        </div>
      </motion.div>

      {/* Overall Information Panel - right */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute lg:top-[266px] md:top-[209px] sm:top-[134px] top-[108px] right-0 w-[55%] sm:w-[45%] md:w-[36%] lg:w-[364px] shadow-[0_4px_60px_rgba(0,0,0,0.08)] rounded-[8px] overflow-hidden z-20 border border-[rgba(0,0,0,0.04)]"
      >
        <div className="bg-white">
          <Image
            src="/images/hero/overall-info.png"
            alt="Overall Information Dashboard"
            width={364}
            height={277}
            className="w-full h-auto"
          />
        </div>
      </motion.div>

      {/* Sales Statics Panel - left */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute lg:top-[308px] md:top-[258px] sm:top-[188px] top-[120px] left-0 w-[65%] sm:w-[55%] md:w-[48%] lg:w-[558px] shadow-[0_4px_60px_rgba(0,0,0,0.08)] rounded-[8px] overflow-hidden z-30 border border-[rgba(0,0,0,0.04)]"
      >
        <div className="bg-white">
          <Image
            src="/images/hero/sales-statics.png"
            alt="Sales Statics Dashboard"
            width={558}
            height={222}
            className="w-full h-auto"
          />
        </div>
      </motion.div>
    </div>
  );
}

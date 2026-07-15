"use client";

import React from "react";
import {
  FcCollaboration,
  FcServices,
  FcCalculator,
  FcStatistics,
  FcInspection,
  FcSalesPerformance,
  FcPackage,
  FcShop,
} from "react-icons/fc";
import { motion } from "framer-motion";
import { integrationsContent } from "@/data/landing/integrations";

export function IntegrationsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F9FA] relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent overflow-hidden" />
      <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#089B7C]/[0.06] blur-3xl" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          className="flex flex-col items-center text-center mb-10 md:mb-16 px-2 md:px-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="!text-[28px] sm:!text-[36px] md:!text-[44px] font-bold text-[#222222] mb-3 md:mb-4 leading-[1.2]">
            <span className="block">
              {integrationsContent.titlePart1}
            </span>
            <span className="relative mt-1 inline-block">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-1 h-[0.38em] bg-[#089B7C]/18 rounded-sm origin-left"
              />
              <span className="relative z-10 text-[#089B7C]">
                {integrationsContent.titlePart2}
              </span>
            </span>
          </h2>

          <div className="h-[3px] w-16 md:w-20 rounded-full bg-gradient-to-r from-[#089B7C] to-[#5CE7C9] mb-5 md:mb-6" />

          <p className="text-[#555555] text-[15px] md:text-[18px] leading-[1.6] max-w-3xl">
            {integrationsContent.description}
          </p>
        </motion.div>

        {/* Network Diagram Container — Desktop */}
        <div className="hidden lg:block w-full pb-8 md:pb-12">
          <div className="relative w-[900px] md:w-[1000px] lg:w-full max-w-[1200px] mx-auto" style={{ aspectRatio: "1200 / 600" }}>
            {/* SVG layer: dashed lines & connection dots */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1200 600"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <style>{`
                @keyframes dashFlow {
                  to { stroke-dashoffset: -12; }
                }
                .dash-line {
                  stroke: #00D09C;
                  stroke-width: 1.5;
                  stroke-dasharray: 6 6;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  animation: dashFlow 0.6s linear infinite;
                }
              `}</style>
  
              {/* ── Top Network (Stock, Purchases, HRM, CMS -> SORTORIUM Top) ── */}
              {/* Stock: Right, Up, Right to junction */}
              <path className="dash-line" d="M 192 300 L 250 300 L 250 200 L 600 200" />
              {/* Purchases: Left, Up, Left to junction */}
              <path className="dash-line" d="M 1008 300 L 950 300 L 950 200 L 600 200" />
  
              {/* HRM: Right, Down to junction */}
              <path className="dash-line" d="M 392 120 L 600 120 L 600 200" />
              {/* CMS: Left, Down to junction */}
              <path className="dash-line" d="M 808 120 L 600 120 L 600 200" />
  
              {/* Center drop to SORTORIUM top */}
              <path className="dash-line" d="M 600 200 L 600 265" />
  
              {/* ── Middle Network (POS, Analytics -> SORTORIUM Sides) ── */}
              <path className="dash-line" d="M 392 300 L 505 300" />
              <path className="dash-line" d="M 808 300 L 695 300" />
  
              {/* ── Bottom Network (Inventory, Sales -> SORTORIUM Bottom) ── */}
              <path className="dash-line" d="M 350 446 L 350 400 L 600 400" />
              <path className="dash-line" d="M 850 446 L 850 400 L 600 400" />
              {/* Center rise to SORTORIUM bottom */}
              <path className="dash-line" d="M 600 400 L 600 335" />
  
              {/* ── Connection Dots ── */}
              <g fill="#00D09C">
                {/* Outer module dots */}
                <circle cx="392" cy="120" r="4.5" />
                <circle cx="808" cy="120" r="4.5" />
                <circle cx="392" cy="300" r="4.5" />
                <circle cx="808" cy="300" r="4.5" />
                <circle cx="350" cy="446" r="4.5" />
                <circle cx="850" cy="446" r="4.5" />
                <circle cx="192" cy="300" r="4.5" />
                <circle cx="1008" cy="300" r="4.5" />
                
                {/* Central SORTORIUM dots */}
                <circle cx="600" cy="265" r="4.5" />
                <circle cx="600" cy="335" r="4.5" />
                <circle cx="505" cy="300" r="4.5" />
                <circle cx="695" cy="300" r="4.5" />
              </g>
            </svg>
  
            {/* ── SORTORIUM Center Box ── */}
            <div
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 190,
                height: 70,
              }}
            >
              <div className="w-full h-full bg-[#D5F5EC] border-2 border-[#069D7A] rounded-xl flex items-center justify-center shadow-md">
                <span className="font-[900] text-[#069D7A] tracking-widest text-[17px]">
                  {integrationsContent.centerText}
                </span>
              </div>
            </div>
  
            {/* Peripheral Module Boxes */}
            <ModuleBox x={integrationsContent.modules[0].x} y={integrationsContent.modules[0].y} accentSide={integrationsContent.modules[0].accentSide} label={integrationsContent.modules[0].label}>
              <FcCollaboration className="w-14 h-14" />
            </ModuleBox>
            <ModuleBox x={integrationsContent.modules[1].x} y={integrationsContent.modules[1].y} accentSide={integrationsContent.modules[1].accentSide} label={integrationsContent.modules[1].label}>
              <FcServices className="w-14 h-14" />
            </ModuleBox>
            <ModuleBox x={integrationsContent.modules[2].x} y={integrationsContent.modules[2].y} accentSide={integrationsContent.modules[2].accentSide} label={integrationsContent.modules[2].label}>
              <FcCalculator className="w-14 h-14" />
            </ModuleBox>
            <ModuleBox x={integrationsContent.modules[3].x} y={integrationsContent.modules[3].y} accentSide={integrationsContent.modules[3].accentSide} label={integrationsContent.modules[3].label}>
              <FcStatistics className="w-14 h-14" />
            </ModuleBox>
            <ModuleBox x={integrationsContent.modules[4].x} y={integrationsContent.modules[4].y} accentSide={integrationsContent.modules[4].accentSide} label={integrationsContent.modules[4].label}>
              <FcPackage className="w-14 h-14" />
            </ModuleBox>
            <ModuleBox x={integrationsContent.modules[5].x} y={integrationsContent.modules[5].y} accentSide={integrationsContent.modules[5].accentSide} label={integrationsContent.modules[5].label}>
              <FcShop className="w-14 h-14" />
            </ModuleBox>
            <ModuleBox x={integrationsContent.modules[6].x} y={integrationsContent.modules[6].y} accentSide={integrationsContent.modules[6].accentSide} label={integrationsContent.modules[6].label}>
              <FcInspection className="w-14 h-14" />
            </ModuleBox>
            <ModuleBox x={integrationsContent.modules[7].x} y={integrationsContent.modules[7].y} accentSide={integrationsContent.modules[7].accentSide} label={integrationsContent.modules[7].label}>
              <FcSalesPerformance className="w-14 h-14" />
            </ModuleBox>
          </div>
        </div>
        
        {/* Mobile/Tablet Vertical Flow (No horizontal scroll) */}
        <div className="flex flex-col items-center lg:hidden w-full max-w-md mx-auto mt-4 relative pb-4">
          <style>{`
            @keyframes dashMove {
              to { stroke-dashoffset: -12; }
            }
            .dash-mobile {
              stroke: #00D09C;
              stroke-width: 2.5;
              stroke-dasharray: 6 6;
              stroke-linecap: round;
            }
            .dash-fwd { animation: dashMove 0.6s linear infinite; }
            .dash-rev { animation: dashMove 0.6s linear reverse infinite; }
          `}</style>
          
          {/* Top 4 Modules (2x2) */}
          <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-12 w-full px-2 sm:px-6 relative z-10 mb-12 mt-4">
            {/* Horizontal connection lines (Row 1) */}
            <div className="absolute top-[28px] left-[25%] right-[50%] h-[2.5px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none"><line x1="0" y1="50%" x2="100%" y2="50%" className="dash-mobile dash-fwd" /></svg>
            </div>
            <div className="absolute top-[28px] left-[50%] right-[25%] h-[2.5px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none"><line x1="0" y1="50%" x2="100%" y2="50%" className="dash-mobile dash-rev" /></svg>
            </div>
            
            {/* Horizontal connection lines (Row 2) */}
            <div className="absolute top-[132px] left-[25%] right-[50%] h-[2.5px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none"><line x1="0" y1="50%" x2="100%" y2="50%" className="dash-mobile dash-fwd" /></svg>
            </div>
            <div className="absolute top-[132px] left-[50%] right-[25%] h-[2.5px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none"><line x1="0" y1="50%" x2="100%" y2="50%" className="dash-mobile dash-rev" /></svg>
            </div>

            {/* Vertical spine connecting top rows to center */}
            <div className="absolute top-[28px] left-1/2 -translate-x-1/2 w-[2.5px] h-[180px] -z-10">
               <svg className="w-full h-full" preserveAspectRatio="none"><line x1="50%" y1="0" x2="50%" y2="100%" className="dash-mobile dash-fwd" /></svg>
            </div>

            {[0, 1, 2, 3].map((i) => {
              const mod = integrationsContent.modules[i];
              const icons = [FcCollaboration, FcServices, FcCalculator, FcStatistics];
              const Icon = icons[i];
              return (
                <div key={i} className="flex flex-col items-center gap-2 bg-[#F8F9FA]">
                   <div className="w-[72px] h-[72px] bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm border-b-[3px] border-b-[#069D7A] relative z-10">
                     <Icon className="w-11 h-11" />
                   </div>
                   <span className="font-bold text-[#333] text-[12px] text-center px-1 bg-[#F8F9FA] relative z-10">{mod.label}</span>
                </div>
              );
            })}
          </div>

          {/* Center Box */}
          <div className="w-[190px] h-[64px] bg-[#D5F5EC] border-2 border-[#069D7A] rounded-xl flex items-center justify-center shadow-md relative z-10 mb-12">
            <span className="font-[900] text-[#069D7A] tracking-widest text-[16px]">
              {integrationsContent.centerText}
            </span>
          </div>

          {/* Bottom 4 Modules (2x2) */}
          <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-12 w-full px-2 sm:px-6 relative z-10 mb-4">
            {/* Horizontal connection lines (Row 3) */}
            <div className="absolute top-[28px] left-[25%] right-[50%] h-[2.5px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none"><line x1="0" y1="50%" x2="100%" y2="50%" className="dash-mobile dash-fwd" /></svg>
            </div>
            <div className="absolute top-[28px] left-[50%] right-[25%] h-[2.5px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none"><line x1="0" y1="50%" x2="100%" y2="50%" className="dash-mobile dash-rev" /></svg>
            </div>
            
            {/* Horizontal connection lines (Row 4) */}
            <div className="absolute top-[132px] left-[25%] right-[50%] h-[2.5px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none"><line x1="0" y1="50%" x2="100%" y2="50%" className="dash-mobile dash-fwd" /></svg>
            </div>
            <div className="absolute top-[132px] left-[50%] right-[25%] h-[2.5px] -z-10">
              <svg className="w-full h-full" preserveAspectRatio="none"><line x1="0" y1="50%" x2="100%" y2="50%" className="dash-mobile dash-rev" /></svg>
            </div>

            {/* Vertical spine connecting bottom rows to center */}
            <div className="absolute top-[-48px] left-1/2 -translate-x-1/2 w-[2.5px] h-[180px] -z-10">
               <svg className="w-full h-full" preserveAspectRatio="none"><line x1="50%" y1="0" x2="50%" y2="100%" className="dash-mobile dash-rev" /></svg>
            </div>

            {[0, 1, 2, 3].map((i) => {
              const globalIndex = i + 4;
              const mod = integrationsContent.modules[globalIndex];
              const icons = [FcPackage, FcShop, FcInspection, FcSalesPerformance];
              const Icon = icons[i];
              return (
                <div key={i} className="flex flex-col items-center gap-2 bg-[#F8F9FA]">
                   <div className="w-[72px] h-[72px] bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm border-b-[3px] border-b-[#069D7A] relative z-10">
                     <Icon className="w-11 h-11" />
                   </div>
                   <span className="font-bold text-[#333] text-[12px] text-center px-1 bg-[#F8F9FA] relative z-10">{mod.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable Box Component ── */

const accentClass: Record<string, string> = {
  top: "border-t-[4px] border-t-[#069D7A]",
  bottom: "border-b-[4px] border-b-[#069D7A]",
  left: "border-l-[4px] border-l-[#069D7A]",
  right: "border-r-[4px] border-r-[#069D7A]",
};

function ModuleBox({
  x,
  y,
  accentSide,
  label,
  children,
}: Readonly<{
  x: number;
  y: number;
  accentSide: "top" | "bottom" | "left" | "right";
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: `${(x / 1200) * 100}%`,
        top: `${(y / 600) * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`relative w-[100px] h-[84px] bg-white border border-gray-200 ${accentClass[accentSide]} rounded-xl flex items-center justify-center shadow-sm transition-transform duration-200 hover:-translate-y-1 cursor-pointer group`}
      >
        {children}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-bold text-[#333] text-[13px] whitespace-nowrap transition-transform duration-200 group-hover:translate-y-1">
          {label}
        </span>
      </div>
    </div>
  );
}

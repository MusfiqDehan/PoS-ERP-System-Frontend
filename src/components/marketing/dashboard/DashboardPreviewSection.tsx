"use client";

import React from "react";
import { TwoLineSectionHeader } from "@/components/marketing/ui/TwoLineSectionHeader";

export function DashboardPreviewSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-40 w-[480px] rounded-full bg-[#089B7C]/[0.07] blur-3xl" />
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        <TwoLineSectionHeader
          line1="See Your Entire Business Clearly At A"
          highlight="Single Glance"
          description="The Admin Dashboard surfaces the numbers that matter most — sales return, total purchase, profit, invoice dues — with period comparisons so you always know which direction you're trending."
        />

        <div className="w-full max-w-6xl overflow-hidden rounded-xl md:rounded-2xl shadow-2xl border border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/dashboard.png"
            alt="Sortorium Dashboard Preview"
            className="w-full h-auto object-cover"
            width={1200}
            height={800}
          />
        </div>
      </div>
    </section>
  );
}

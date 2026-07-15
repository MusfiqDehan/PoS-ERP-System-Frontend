"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/marketing/ui/Button";
import { ctaContent } from "@/data/landing/cta";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes dash-flow {
          from { stroke-dashoffset: 16; }
          to { stroke-dashoffset: 0; }
        }
        .animate-dash-flow {
          animation: dash-flow 1s linear infinite;
        }
      `,
        }}
      />
      <div className="mx-auto px-4 md:px-8 w-full max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
          {/* Left Box: Payment Gateways */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-[#089B7C]/25 bg-gradient-to-br from-[#D8F7EE] via-[#E6FAF4] to-[#C8F0E4] p-6 md:p-8 flex flex-col shadow-[0_16px_48px_rgba(8,155,124,0.14)] min-h-[480px] lg:min-h-0 h-full">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#089B7C]/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/70 blur-2xl" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(8,155,124,0.18) 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 flex flex-col items-start text-left mb-4 md:mb-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#089B7C]/20 px-3.5 py-1 text-[12px] font-semibold text-[#069D7A] mb-3 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#069D7A]" />
                Local &amp; global gateways
              </span>
              <h3 className="text-[22px] md:text-[28px] font-extrabold text-[#0B3D33] leading-tight text-left">
                {ctaContent.leftBox.titlePart1}
                <br />
                <span className="text-[#069D7A]">{ctaContent.leftBox.titlePart2}</span>
              </h3>
              <p className="mt-2 text-[13px] md:text-[14px] text-[#3A6B60]/80 max-w-[280px] leading-snug text-left">
                Accept cards, wallets, and local payments in one checkout.
              </p>
            </div>

            <div className="relative z-10 w-full flex-1 flex items-center justify-center min-h-0 rounded-2xl bg-white/55 border border-white/80 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(8,155,124,0.08)] px-2 py-3 md:px-3 md:py-4">
              <svg
                viewBox="0 0 500 650"
                className="w-full h-full max-h-[400px]"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  fill="none"
                  stroke="#069D7A"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-dash-flow"
                  opacity="0.85"
                >
                  <path d="M 290 255 L 290 120 L 370 120" />
                  <path d="M 320 280 L 380 280" />
                  <path d="M 290 395 L 290 480 L 370 480" />
                  <path d="M 220 395 L 220 560 L 140 560" />
                  <path d="M 200 395 L 200 430 L 160 430" />
                  <path d="M 180 290 L 150 290 L 150 240 L 130 240" />
                </g>

                <g fill="#069D7A">
                  <circle cx="370" cy="120" r="4.5" />
                  <circle cx="380" cy="280" r="4.5" />
                  <circle cx="370" cy="480" r="4.5" />
                  <circle cx="140" cy="560" r="4.5" />
                  <circle cx="160" cy="430" r="4.5" />
                  <circle cx="130" cy="240" r="4.5" />
                </g>

                {/* Soft drop shadows under logo tiles */}
                <rect x="372" y="84" width="80" height="80" rx="14" fill="#069D7A" opacity="0.08" />
                <rect x="382" y="244" width="80" height="80" rx="14" fill="#069D7A" opacity="0.08" />
                <rect x="372" y="444" width="80" height="80" rx="14" fill="#069D7A" opacity="0.08" />
                <rect x="62" y="524" width="80" height="80" rx="14" fill="#069D7A" opacity="0.08" />
                <rect x="42" y="404" width="120" height="60" rx="14" fill="#069D7A" opacity="0.08" />
                <rect x="52" y="204" width="80" height="80" rx="14" fill="#069D7A" opacity="0.08" />

                <rect x="370" y="80" width="80" height="80" rx="14" fill="white" stroke="#069D7A" strokeWidth="1.5" />
                <foreignObject x="370" y="80" width="80" height="80">
                  <div className="w-full h-full flex items-center justify-center p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/payment/stripe.svg" alt="Stripe" className="w-full h-full object-contain" />
                  </div>
                </foreignObject>

                <rect x="380" y="240" width="80" height="80" rx="14" fill="white" stroke="#069D7A" strokeWidth="1.5" />
                <foreignObject x="380" y="240" width="80" height="80">
                  <div className="w-full h-full flex items-center justify-center p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/payment/visa.png" alt="Visa" className="w-full h-full object-contain" />
                  </div>
                </foreignObject>

                <rect x="370" y="440" width="80" height="80" rx="14" fill="white" stroke="#069D7A" strokeWidth="1.5" />
                <foreignObject x="370" y="440" width="80" height="80">
                  <div className="w-full h-full flex items-center justify-center p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/payment/nagad.webp" alt="Nagad" className="w-full h-full object-contain" />
                  </div>
                </foreignObject>

                <rect x="60" y="520" width="80" height="80" rx="14" fill="white" stroke="#069D7A" strokeWidth="1.5" />
                <foreignObject x="60" y="520" width="80" height="80">
                  <div className="w-full h-full flex items-center justify-center p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/payment/paypal.png" alt="PayPal" className="w-full h-full object-contain" />
                  </div>
                </foreignObject>

                <rect x="40" y="400" width="120" height="60" rx="14" fill="white" stroke="#069D7A" strokeWidth="1.5" />
                <foreignObject x="40" y="400" width="120" height="60">
                  <div className="w-full h-full flex items-center justify-center p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/payment/sslcommerze.png" alt="SSLCommerz" className="w-full h-full object-contain" />
                  </div>
                </foreignObject>

                <rect x="50" y="200" width="80" height="80" rx="14" fill="white" stroke="#069D7A" strokeWidth="1.5" />
                <foreignObject x="50" y="200" width="80" height="80">
                  <div className="w-full h-full flex items-center justify-center p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/payment/bkash.jpg" alt="bKash" className="w-full h-full object-contain rounded-md" />
                  </div>
                </foreignObject>

                <rect x="180" y="255" width="140" height="140" rx="18" fill="white" stroke="#069D7A" strokeWidth="2" />
                <rect x="184" y="259" width="132" height="132" rx="16" fill="#E6FAF4" opacity="0.55" />
                <foreignObject x="180" y="255" width="140" height="140">
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="absolute w-[90px] h-[55px] bg-[#FFD147] rounded-xl transform rotate-12 top-8 right-6 shadow-md overflow-hidden border border-white/40">
                      <div className="w-full h-[10px] bg-[#374151] mt-2" />
                    </div>
                    <div className="absolute w-[95px] h-[60px] bg-[#539BFF] rounded-xl bottom-8 left-5 shadow-lg p-2.5 flex flex-col justify-between border border-white/20 z-10">
                      <div className="flex justify-between items-start">
                        <div className="w-5 h-3.5 bg-[#FFD147] rounded-sm shadow-sm" />
                        <div className="flex flex-col gap-1 pt-0.5">
                          <div className="w-4 h-[2px] bg-white rounded-full" />
                          <div className="w-2.5 h-[2px] bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex justify-between gap-1 mt-2">
                        <div className="w-3.5 h-[5px] bg-white/80 rounded-sm" />
                        <div className="w-3.5 h-[5px] bg-white/80 rounded-sm" />
                        <div className="w-3.5 h-[5px] bg-white/80 rounded-sm" />
                        <div className="w-3.5 h-[5px] bg-white/80 rounded-sm" />
                      </div>
                    </div>
                  </div>
                </foreignObject>
              </svg>
            </div>
          </div>

          {/* Right Box: Main CTA */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-[#069D7A] p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center text-left shadow-[0_16px_48px_rgba(6,157,122,0.28)] min-h-[480px] lg:min-h-0 h-full">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-black/10 blur-2xl" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }} />

            <div className="relative z-10 flex flex-col items-start max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-1.5 text-[13px] font-semibold text-white mb-5 md:mb-6">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                14-day free trial
              </span>

              <h2 className="!text-[28px] sm:!text-[36px] md:!text-[44px] font-extrabold text-white mb-4 md:mb-5 leading-[1.15] text-left">
                {ctaContent.rightBox.title}
              </h2>

              <p className="text-white/85 text-[15px] md:text-[17px] mb-8 md:mb-10 leading-relaxed max-w-md text-left">
                {ctaContent.rightBox.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link href={ctaContent.rightBox.buttonHref} className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    className="bg-white text-[#069D7A] hover:bg-[#F0FFFB] font-bold px-8 py-3.5 rounded-full w-full sm:w-auto h-auto text-[15px] md:text-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                  >
                    {ctaContent.rightBox.buttonText}
                  </Button>
                </Link>
                <p className="text-white/70 text-[13px]">No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

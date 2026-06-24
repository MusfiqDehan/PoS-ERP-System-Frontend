"use client";

import Link from "next/link";

export default function UpgradeBanner() {
  return (
    <div className="bg-[#1B2850] rounded-lg text-center relative overflow-hidden p-5">
      <span className="w-12 h-12 rounded-full bg-white inline-flex items-center justify-center mb-2">
        <i className="ti ti-alert-triangle text-[#1B2850] text-[20px]" />
      </span>
      <h6 className="text-white mb-3 text-[14px] leading-snug">
        Enjoy Unlimited Access on a small price monthly.
      </h6>
      <Link
        href="#"
        className="inline-flex items-center gap-1 px-4 py-2 rounded-md bg-white text-[#1B2850] text-[13px] font-medium hover:bg-[#f1f1f1] transition-colors"
      >
        Upgrade Now <i className="ti ti-arrow-right" />
      </Link>
    </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

import CommonFooter from "@/core/common/footer/commonFooter";
import Link from "next/link";

export default function AudioCallComponent() {
  return (
    <div className="page-wrapper">
      <div className="content mb-3">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
          <div>
            <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Calls</h4>
            <p className="m-0 text-[14px] font-medium text-[#646B72]">Manage your calls</p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-1 px-4 py-[10px] rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
          >
            <i className="ti ti-circle-plus text-[16px]" /> Add People
          </Link>
        </div>

        <div className="bg-white border border-[#f1f1f1] rounded-[12px] overflow-hidden max-w-[640px] mx-auto">
          {/* Caller header */}
          <div className="flex items-center justify-between gap-2 p-4 border-b border-[#f1f1f1]">
            <div className="flex items-center gap-2">
              <span className="w-11 h-11 rounded-full overflow-hidden shrink-0">
                <img src="assets/img/users/user-27.jpg" className="w-full h-full object-cover" alt="img" />
              </span>
              <div>
                <h5 className="m-0 text-[15px] font-semibold text-[#212B36]">Anthony Lewis</h5>
                <span className="inline-flex items-center gap-1 text-[12px] text-[#0ac79e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0ac79e]" /> Online
                </span>
              </div>
            </div>
            <Link
              href="#"
              className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[#f1f5f6] text-[#212B36] hover:bg-[#e7e7e7] transition-colors"
            >
              <i className="ti ti-user-plus text-[18px]" />
            </Link>
          </div>

          {/* Call stage */}
          <div className="relative flex flex-col items-center justify-center text-center px-4 py-10 bg-[#f4fbf9] min-h-[360px]">
            <span className="relative mb-4 inline-flex">
              <span className="absolute inset-0 rounded-full bg-[#0ac79e]/20 animate-ping" />
              <img
                src="assets/img/users/user-27.jpg"
                className="relative w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-lg"
                alt="img"
              />
            </span>
            <h4 className="m-0 text-[20px] font-bold text-[#212B36]">Anthony Lewis</h4>
            <p className="mt-1 mb-0 text-[14px] text-[#646B72]">00:24</p>
            <span className="absolute bottom-4 right-4 w-[72px] h-[96px] rounded-lg overflow-hidden border-2 border-white shadow-md">
              <img src="assets/img/users/user-05.jpg" className="w-full h-full object-cover" alt="self" />
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 p-5 border-t border-[#f1f1f1]">
            <Link
              href="#"
              className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-[#f1f5f6] text-[#212B36] hover:bg-[#e7e7e7] transition-colors"
            >
              <i className="ti ti-video text-[20px]" />
            </Link>
            <Link
              href="#"
              className="w-14 h-14 inline-flex items-center justify-center rounded-full bg-[#dc3545] text-white hover:bg-[#bb2d3b] transition-colors shadow-lg"
            >
              <i className="ti ti-phone text-[22px]" />
            </Link>
            <Link
              href="#"
              className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-[#f1f5f6] text-[#212B36] hover:bg-[#e7e7e7] transition-colors"
            >
              <i className="ti ti-microphone text-[20px]" />
            </Link>
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
}

"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[12px] text-[#646B72] mb-1">{label}</span>
      <h6 className="m-0 text-[14px] font-normal text-[#212B36]">{value}</h6>
    </div>
  );
}

export default function DomainPendingModal() {
  return (
    <div className="modal fade" id="domain_pending">
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 flex items-center gap-2 text-[18px] font-bold text-[#212B36]">
              Domain Detail
              <span className="inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium bg-[#EAF1FE] text-[#155EEF]">
                <i className="ti ti-point-filled" /> Pending
              </span>
            </h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="p-4">
            <div className="p-3 mb-4 rounded-md bg-[#f8f9fa] flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-full border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0">
                  <img src="assets/img/company/company-01.svg" className="w-full h-full object-cover" alt="img" />
                </span>
                <h6 className="m-0 text-[14px] font-medium text-[#212B36]">
                  <Link href="#">BrightWave Innovations</Link>
                </h6>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium bg-[#E7FBF7] text-[#0ac79e] hover:bg-[#0ac79e] hover:text-white transition-colors"
                >
                  <i className="ti ti-check" /> Approve
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium bg-[#fff0f0] text-[#c80000] hover:bg-[#c80000] hover:text-white transition-colors"
                >
                  <i className="ti ti-x" /> Reject
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 min-[576px]:grid-cols-3 gap-4">
              <Detail label="Plan Name" value="Advanced" />
              <Detail label="Plan Type" value="Monthly" />
              <Detail label="Account URL" value="bwi.example.com" />
              <Detail label="Price" value="200" />
              <Detail label="Register Date" value="12 Sep 2024" />
              <Detail label="Expiring On" value="11 Oct 2024" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

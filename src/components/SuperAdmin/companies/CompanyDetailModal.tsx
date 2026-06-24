"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="m-0 text-[12px] text-[#646B72] mb-1">{label}</p>
      <p className="m-0 text-[14px] text-[#212B36]">{value}</p>
    </div>
  );
}

export default function CompanyDetailModal() {
  return (
    <div className="modal fade" id="company_detail">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Company Detail</h4>
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
            <div className="flex items-center justify-between gap-3 flex-wrap rounded-md bg-[#f8f9fa] p-3 mb-4">
              <div className="flex items-center gap-2 min-w-0">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0"
                >
                  <img src="assets/img/company/company-01.svg" className="w-full h-full object-cover" alt="img" />
                </Link>
                <div className="min-w-0">
                  <p className="m-0 text-[14px] font-medium text-[#212B36] truncate">
                    BrightWave Innovations
                  </p>
                  <p className="m-0 text-[13px] text-[#646B72] truncate">michael@example.com</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium bg-[#E7FBF7] text-[#0ac79e]">
                <i className="ti ti-point-filled" /> Active
              </span>
            </div>

            <p className="text-[14px] font-medium text-[#212B36] mb-3">Basic Info</p>
            <div className="grid grid-cols-2 min-[576px]:grid-cols-3 gap-4 pb-4 mb-4 border-b border-[#f1f1f1]">
              <Field label="Account URL" value="bwi.example.com" />
              <Field label="Phone Number" value="(163) 2459 315" />
              <Field label="Website" value="www.exmple.com" />
              <Field label="Currency" value="United Stated Dollar (USD)" />
              <Field label="Language" value="English" />
              <Field label="Address" value="3705 Lynn Avenue, Phelps, WI 54554" />
            </div>

            <p className="text-[14px] font-medium text-[#212B36] mb-3">Plan Details</p>
            <div className="grid grid-cols-2 min-[576px]:grid-cols-3 gap-4">
              <Field label="Plan Name" value="Advanced" />
              <Field label="Plan Type" value="Monthly" />
              <Field label="Price" value="$200" />
              <Field label="Register Date" value="12 Sep 2024" />
              <Field label="Expiring On" value="11 Oct 2024" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

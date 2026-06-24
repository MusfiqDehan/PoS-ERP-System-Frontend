"use client";
/* eslint-disable @next/next/no-img-element */

import { DatePicker } from "antd";
import Select from "react-select";
import { planName, planType } from "@/core/common/selectOption/selectOption";

type UpgradeInfoModalProps = {
  getModalContainer: () => HTMLElement;
};

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="m-0 text-[12px] text-[#646B72] mb-1">{label}</p>
      <p className="m-0 text-[14px] text-[#212B36]">{value}</p>
    </div>
  );
}

export default function UpgradeInfoModal({ getModalContainer }: UpgradeInfoModalProps) {
  return (
    <div className="modal fade" id="upgrade_info">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Upgrade Package</h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
          </div>

          <div className="p-4 pb-0">
            <div className="rounded-md bg-[#f8f9fa] p-4">
              <h5 className="text-[16px] font-semibold text-[#212B36] mb-3">Current Plan Details</h5>
              <div className="grid grid-cols-2 min-[576px]:grid-cols-3 gap-4">
                <Field label="Company Name" value="BrightWave Innovations" />
                <Field label="Plan Name" value="Advanced" />
                <Field label="Plan Type" value="Monthly" />
                <Field label="Price" value="200" />
                <Field label="Register Date" value="12 Sep 2024" />
                <Field label="Expiring On" value="11 Oct 2024" />
              </div>
            </div>
          </div>

          <form>
            <div className="p-4">
              <h5 className="text-[16px] font-semibold text-[#212B36] mb-4">Change Plan</h5>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Plan Name <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={planName} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Plan Type <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={planType} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Amount <span className="text-[#dc3545]">*</span></label>
                  <input type="text" className={inputCls} />
                </div>
                {["Payment Date", "Next Payment Date", "Expiring On"].map((lbl) => (
                  <div key={lbl} className="col-span-12 min-[768px]:col-span-6">
                    <label className={labelCls}>{lbl} <span className="text-[#dc3545]">*</span></label>
                    <DatePicker
                      className="w-full"
                      format="DD-MM-YYYY"
                      getPopupContainer={getModalContainer}
                      placeholder="DD-MM-YYYY"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

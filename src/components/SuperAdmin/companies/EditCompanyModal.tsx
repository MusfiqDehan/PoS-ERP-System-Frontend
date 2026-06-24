"use client";
/* eslint-disable @next/next/no-img-element */

import Select from "react-select";
import Link from "next/link";
import {
  currency,
  language,
  planName,
  planType,
  statusChoose,
} from "@/core/common/selectOption/selectOption";

type PasswordVisibilityState = {
  password: boolean;
  confirmPassword: boolean;
};

type PasswordModalProps = {
  passwordVisibility: PasswordVisibilityState;
  togglePasswordVisibility: (field: keyof PasswordVisibilityState) => void;
};

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

export default function EditCompanyModal({
  passwordVisibility,
  togglePasswordVisibility,
}: PasswordModalProps) {
  return (
    <div className="modal fade" id="edit_company">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Edit Company</h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <form>
            <div className="p-4">
              <div className="flex items-center flex-wrap gap-3 bg-[#f8f9fa] rounded-md p-3 mb-4">
                <span className="w-[72px] h-[72px] rounded-full border border-dashed border-[#cfd4da] flex items-center justify-center text-[#646B72] shrink-0">
                  <i className="ti ti-photo text-[24px]" />
                </span>
                <div>
                  <h6 className="mb-1 text-[14px] font-semibold text-[#212B36]">Upload Profile Image</h6>
                  <p className="text-[12px] text-[#646B72] mb-2">Image should be below 4 mb</p>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center px-3 py-1.5 rounded-md bg-[#0ac79e] text-white text-[13px] font-medium cursor-pointer hover:bg-[#089b7c] transition-colors">
                      Upload
                      <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                    </label>
                    <Link href="#" className="px-3 py-1.5 rounded-md border border-[#e7e7e7] text-[#646B72] text-[13px] font-medium hover:bg-[#f6f6f6]">
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Name <span className="text-[#dc3545]">*</span></label>
                  <input type="text" className={inputCls} defaultValue="Stellar Dynamics" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Email Address</label>
                  <input type="email" className={inputCls} defaultValue="sophie@example.com" />
                </div>
                <div className="col-span-12">
                  <label className={labelCls}>Account URL</label>
                  <input type="text" className={inputCls} defaultValue="sd.example.com" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Phone Number <span className="text-[#dc3545]">*</span></label>
                  <input type="text" className={inputCls} defaultValue="+1 895455450" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Website</label>
                  <input type="text" className={inputCls} defaultValue="Admin Website" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Password <span className="text-[#dc3545]">*</span></label>
                  <div className="relative">
                    <input
                      type={passwordVisibility.password ? "text" : "password"}
                      className={`${inputCls} pr-10`}
                    />
                    <span
                      className={`ti ${passwordVisibility.password ? "ti-eye" : "ti-eye-off"} absolute right-3 top-1/2 -translate-y-1/2 text-[#646B72] cursor-pointer`}
                      onClick={() => togglePasswordVisibility("password")}
                    />
                  </div>
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Confirm Password <span className="text-[#dc3545]">*</span></label>
                  <div className="relative">
                    <input
                      type={passwordVisibility.confirmPassword ? "text" : "password"}
                      className={`${inputCls} pr-10`}
                    />
                    <span
                      className={`ti ${passwordVisibility.confirmPassword ? "ti-eye" : "ti-eye-off"} absolute right-3 top-1/2 -translate-y-1/2 text-[#646B72] cursor-pointer`}
                      onClick={() => togglePasswordVisibility("confirmPassword")}
                    />
                  </div>
                </div>
                <div className="col-span-12">
                  <label className={labelCls}>Address</label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Plan Name <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={planName} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Plan Type <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={planType} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-4">
                  <label className={labelCls}>Currency <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={currency} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-4">
                  <label className={labelCls}>Language <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={language} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-4">
                  <label className={labelCls}>Status</label>
                  <Select classNamePrefix="react-select" options={statusChoose} placeholder="Choose" />
                </div>
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

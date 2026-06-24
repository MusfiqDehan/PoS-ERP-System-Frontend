"use client";
/* eslint-disable @next/next/no-img-element */

import Select from "react-select";
import { contactType } from "@/core/common/selectOption/selectOption";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <span className="relative block w-9 h-5 bg-[#e7e7e7] rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
    </label>
  );
}

export default function AddContactModal() {
  return (
    <div className="modal fade" id="add-contact">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Add Contact</h4>
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
              <div className="flex items-center gap-3 mb-4">
                <span className="w-[72px] h-[72px] rounded-full border border-dashed border-[#cfd4da] flex flex-col items-center justify-center text-[#646B72] shrink-0 gap-0.5">
                  <i className="ti ti-circle-plus text-[18px]" />
                  <span className="text-[11px]">Add</span>
                </span>
                <div>
                  <label className="relative inline-flex items-center px-3 py-1.5 rounded-md bg-[#0ac79e] text-white text-[13px] font-medium cursor-pointer hover:bg-[#089b7c] transition-colors">
                    Upload Image
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </label>
                  <p className="mt-2 text-[12px] text-[#646B72]">JPEG, PNG up to 2 MB</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 min-[576px]:col-span-6">
                  <label className={labelCls}>First Name <span className="text-[#dc3545]">*</span></label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="col-span-12 min-[576px]:col-span-6">
                  <label className={labelCls}>Last Name <span className="text-[#dc3545]">*</span></label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="col-span-12">
                  <label className={labelCls}>Email <span className="text-[#dc3545]">*</span></label>
                  <input type="email" className={inputCls} />
                </div>
                <div className="col-span-12">
                  <label className={labelCls}>Phone <span className="text-[#dc3545]">*</span></label>
                  <input type="tel" className={inputCls} />
                </div>
                <div className="col-span-12">
                  <label className={labelCls}>Contact Type <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={contactType} placeholder="Choose" />
                </div>
                <div className="col-span-12 flex items-center justify-between">
                  <span className="text-[14px] font-medium text-[#212B36]">Status</span>
                  <Toggle defaultChecked />
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
                type="submit"
                className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
              >
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

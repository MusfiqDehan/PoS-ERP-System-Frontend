"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Select from "react-select";
import {
  discountType,
  planName,
  planPosition,
  planType,
  plancurrency,
  status,
} from "@/components/SuperAdmin/packages/planSelectOptions";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";
const checkboxCls = "w-4 h-4 rounded accent-[#0ac79e]";

const modules = [
  "Employees", "Invoices", "Reports", "Contacts", "Clients", "Estimates",
  "Goals", "Deals", "Projects", "Payments", "Assets", "Leads",
  "Tickets", "Taxes", "Activities", "Pipelines",
];

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <span className="relative block w-9 h-5 bg-[#e7e7e7] rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
    </label>
  );
}

export default function EditPlanModal() {
  return (
    <div className="modal fade" id="edit_plans">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Edit Plan</h4>
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
                <span className="w-[72px] h-[72px] rounded-full border border-dashed border-[#cfd4da] overflow-hidden flex items-center justify-center shrink-0">
                  <img src="assets/img/profiles/avatar-30.jpg" alt="img" className="w-full h-full object-cover" />
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
                  <label className={labelCls}>Plan Name <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={planName} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Plan Type <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={planType} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Plan Position <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={planPosition} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <label className={labelCls}>Plan Currency <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={plancurrency} placeholder="Choose" />
                </div>
                <div className="col-span-12 min-[768px]:col-span-6">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[13px] font-medium text-[#212B36]">Price <span className="text-[#dc3545]">*</span></label>
                    <span className="text-[12px] text-[#0ac79e] inline-flex items-center gap-1">
                      <i className="fa-solid fa-circle-exclamation" /> Set 0 for free
                    </span>
                  </div>
                  <Select classNamePrefix="react-select" options={plancurrency} placeholder="Choose" />
                </div>
                <div className="col-span-6 min-[768px]:col-span-3">
                  <label className={labelCls}>Discount Type <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={discountType} placeholder="Choose" />
                </div>
                <div className="col-span-6 min-[768px]:col-span-3">
                  <label className={labelCls}>Discount <span className="text-[#dc3545]">*</span></label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="col-span-6 min-[768px]:col-span-3">
                  <label className={labelCls}>Limitations Invoices</label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="col-span-6 min-[768px]:col-span-3">
                  <label className={labelCls}>Max Customers</label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="col-span-6 min-[768px]:col-span-3">
                  <label className={labelCls}>Product</label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="col-span-6 min-[768px]:col-span-3">
                  <label className={labelCls}>Supplier</label>
                  <input type="text" className={inputCls} />
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 mb-3">
                <h6 className="m-0 text-[14px] font-semibold text-[#212B36]">Plan Modules</h6>
                <label className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer">
                  <input type="checkbox" className={checkboxCls} /> Select All
                </label>
              </div>
              <div className="grid grid-cols-2 min-[992px]:grid-cols-4 gap-3 mb-4">
                {modules.map((mod) => (
                  <label key={mod} className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer">
                    <input type="checkbox" className={checkboxCls} defaultChecked /> {mod}
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[14px] font-medium text-[#212B36]">Access Trial</span>
                <Toggle defaultChecked />
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 min-[768px]:col-span-4">
                  <label className={labelCls}>Trial Days</label>
                  <input type="text" className={inputCls} />
                </div>
                <div className="col-span-12 min-[768px]:col-span-3">
                  <span className="block text-[13px] font-medium text-[#212B36] mb-1.5">Is Recommended</span>
                  <Toggle defaultChecked />
                </div>
                <div className="col-span-12 min-[768px]:col-span-5">
                  <label className={labelCls}>Status <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={status} placeholder="Choose" />
                </div>
                <div className="col-span-12">
                  <label className={labelCls}>Description</label>
                  <textarea className={`${inputCls} min-h-[90px]`} defaultValue="" />
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

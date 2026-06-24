"use client";

import { DatePicker } from "antd";
import Select from "react-select";
import { ProductName } from "@/core/common/selectOption/selectOption";
import Link from "next/link";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

export default function EditExpiredProductModal() {
  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Edit Expired Product</h4>
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
            <div className="p-4 flex flex-col gap-4">
              <div>
                <label className={labelCls}>SKU <span className="text-[#dc3545]">*</span></label>
                <input type="text" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Product Name <span className="text-[#dc3545]">*</span></label>
                <Select classNamePrefix="react-select" options={ProductName} placeholder="Choose" />
              </div>
              <div>
                <label className={labelCls}>Manufacturer Date <span className="text-[#dc3545]">*</span></label>
                <DatePicker className="w-full" placeholder="Choose Date" />
              </div>
              <div>
                <label className={labelCls}>Expiry Date <span className="text-[#dc3545]">*</span></label>
                <DatePicker className="w-full" placeholder="Choose Date" />
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
              <Link
                href="#"
                data-bs-dismiss="modal"
                className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
              >
                Save Changes
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

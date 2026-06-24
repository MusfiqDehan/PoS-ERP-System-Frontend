"use client";

import Select from "react-select";
import { Period } from "@/core/common/selectOption/selectOption";
import Link from "next/link";
import { useState } from "react";
import DefaultEditor from "react-simple-wysiwyg";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

export default function AddWarrantyModal() {
  const [description, setDescription] = useState<string | undefined>();

  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Add Warranty</h4>
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
                <label className={labelCls}>Warranty <span className="text-[#dc3545]">*</span></label>
                <input type="text" className={inputCls} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Duration <span className="text-[#dc3545]">*</span></label>
                  <input type="text" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Period <span className="text-[#dc3545]">*</span></label>
                  <Select classNamePrefix="react-select" options={Period} placeholder="Choose" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Description <span className="text-[#dc3545]">*</span></label>
                <DefaultEditor value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#212B36]">Status</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <span className="relative block w-9 h-5 bg-[#e7e7e7] rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
                </label>
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
                Add Warranty
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

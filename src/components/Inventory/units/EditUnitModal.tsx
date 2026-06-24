"use client";

import Link from "next/link";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

export default function EditUnitModal() {
  return (
    <div className="modal fade" id="edit-units">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Edit Unit</h4>
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
                <label className={labelCls}>Unit <span className="text-[#dc3545]">*</span></label>
                <input type="text" className={inputCls} defaultValue="Kilograms" />
              </div>
              <div>
                <label className={labelCls}>Short Name <span className="text-[#dc3545]">*</span></label>
                <input type="text" className={inputCls} defaultValue="kg" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#212B36]">Status</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
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
                Save Changes
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

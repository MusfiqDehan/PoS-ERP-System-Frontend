"use client";

import Link from "next/link";
import { all_routes } from "@/data/all_routes";

export default function EditProductModals() {
  return (
    <>
      {/* Add Category */}
      <div className="modal fade" id="add-product-category">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
              <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Add Category</h4>
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
              <label className="block text-[13px] font-medium text-[#212B36] mb-1.5">
                Category<span className="ms-1 text-[#dc3545]">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors"
              />
            </div>
            <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
              <Link
                href="#"
                data-bs-dismiss="modal"
                className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[13px] font-medium hover:bg-[#f6f6f6] transition-colors"
              >
                Cancel
              </Link>
              <Link
                href={all_routes.addproduct}
                className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[13px] font-medium hover:bg-[#089b7c] transition-colors"
              >
                Submit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Attribute */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="p-5 px-3 text-center">
              <span className="w-12 h-12 rounded-full inline-flex items-center justify-center bg-[#FDECEC] mb-3">
                <i className="ti ti-trash text-[24px] text-[#dc3545]" />
              </span>
              <h4 className="text-[20px] font-bold mb-2 mt-1 text-[#212B36]">Delete Attribute</h4>
              <p className="mb-0 text-[16px] text-[#646B72]">
                Are you sure you want to delete Attribute?
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[13px] font-medium hover:bg-[#f6f6f6] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[13px] font-medium hover:bg-[#089b7c] transition-colors"
                >
                  Yes Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

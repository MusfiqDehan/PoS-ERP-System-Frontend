"use client";

export default function DeleteAttributeModal() {
  return (
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
                className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[13px] font-medium hover:bg-[#089b7c] transition-colors"
              >
                Yes Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

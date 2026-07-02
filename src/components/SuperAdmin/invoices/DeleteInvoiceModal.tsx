"use client";

export default function DeleteInvoiceModal() {
  return (
    <div className="modal fade" id="delete_modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <span className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-[#fff0f0] text-[#dc3545]">
                <i className="ti ti-trash-x text-[32px]" />
              </span>
            </div>
            <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Confirm Delete</h4>
            <p className="mb-4 text-[14px] text-[#646B72]">
              You want to delete all the marked items, this cant be undone once you
              delete.
            </p>
            <div className="flex items-center justify-center gap-3">
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
                className="px-4 py-2 rounded-[6px] bg-[#dc3545] text-white text-[14px] font-medium hover:bg-[#bb2d3b] transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

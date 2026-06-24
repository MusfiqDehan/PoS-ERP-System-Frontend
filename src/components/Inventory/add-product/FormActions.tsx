"use client";

export default function FormActions() {
  return (
    <div className="flex items-center justify-end gap-2 mb-4">
      <button
        type="button"
        className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
      >
        Add Product
      </button>
    </div>
  );
}

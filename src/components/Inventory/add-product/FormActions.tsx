"use client";

export default function FormActions() {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        className="px-5 py-[10px] rounded-[10px] border border-[#E2E8F0] bg-white text-[#475569] text-[13px] font-semibold hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-5 py-[10px] rounded-[10px] bg-[#0ac79e] text-white text-[13px] font-semibold hover:bg-[#089b7c] transition-all shadow-sm shadow-[#0ac79e]/20"
      >
        Add Product
      </button>
    </div>
  );
}

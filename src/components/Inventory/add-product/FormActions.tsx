"use client";

import Link from "next/link";
import { all_routes } from "@/data/all_routes";

type Props = { submitting: boolean };

export default function FormActions({ submitting }: Props) {
  return (
    <div className="flex items-center justify-end gap-3">
      <Link
        href={all_routes.productlist}
        className="px-5 py-[10px] rounded-[10px] border border-[#E2E8F0] bg-white text-[#475569] text-[13px] font-semibold hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all"
      >
        Cancel
      </Link>
      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-[10px] rounded-[10px] bg-[#0ac79e] text-white text-[13px] font-semibold hover:bg-[#089b7c] transition-all shadow-sm shadow-[#0ac79e]/20 disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Add Product"}
      </button>
    </div>
  );
}

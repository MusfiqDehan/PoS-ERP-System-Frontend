"use client";
/* eslint-disable @next/next/no-img-element */

import { Plus, X } from "react-feather";

type ImagesSectionProps = {
  showPrimaryImage: boolean;
  showSecondaryImage: boolean;
  onRemovePrimaryImage: () => void;
  onRemoveSecondaryImage: () => void;
};

export default function ImagesSection({
  showPrimaryImage,
  showSecondaryImage,
  onRemovePrimaryImage,
  onRemoveSecondaryImage,
}: ImagesSectionProps) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center">
          <i className="ti ti-photo text-[16px] text-[#0ac79e]" />
        </div>
        <div>
          <h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Images</h5>
          <p className="m-0 text-[12px] text-[#94A3B8]">Upload product images</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        <div className="flex flex-wrap items-start gap-4">
          {/* Upload placeholder */}
          <label className="relative w-[130px] h-[130px] border-2 border-dashed border-[#CBD5E1] rounded-xl flex flex-col items-center justify-center text-center hover:border-[#0ac79e] hover:bg-[#F0FDF9] transition-all cursor-pointer group">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] group-hover:bg-[#0ac79e]/10 flex items-center justify-center transition-colors">
              <Plus size={18} className="text-[#64748B] group-hover:text-[#0ac79e]" />
            </div>
            <span className="text-[12px] font-medium text-[#64748B] mt-1.5 group-hover:text-[#0ac79e] transition-colors">
              Add Images
            </span>
          </label>

          {/* Secondary image preview */}
          {showSecondaryImage && (
            <div className="relative w-[130px] h-[130px] rounded-xl border border-[#F1F5F9] overflow-hidden group shadow-sm">
              <img
                src="assets/img/products/phone-add-2.png"
                alt="product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-xl" />
              <button
                type="button"
                onClick={onRemoveSecondaryImage}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[#64748B] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={13} />
              </button>
            </div>
          )}

          {/* Primary image preview */}
          {showPrimaryImage && (
            <div className="relative w-[130px] h-[130px] rounded-xl border border-[#F1F5F9] overflow-hidden group shadow-sm">
              <img
                src="assets/img/products/phone-add-1.png"
                alt="product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-xl" />
              <button
                type="button"
                onClick={onRemovePrimaryImage}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-[#64748B] hover:text-[#EF4444] transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

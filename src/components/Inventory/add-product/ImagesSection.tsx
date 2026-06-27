"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Image, PlusCircle, X } from "react-feather";

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
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px] mb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 px-4 py-3.5 text-left"
      >
        <span className="flex items-center gap-2 text-[16px] font-semibold text-[#212B36]">
          <Image size={18} className="text-[#0ac79e]" />
          Images
        </span>
        <i className={`ti ti-chevron-${open ? "up" : "down"} text-[#646B72]`} />
      </button>
      {open && (
        <div className="border-t border-[#f1f1f1] p-4">
          <div className="flex flex-wrap items-start gap-3">
            <div className="relative w-[120px] h-[120px] border-2 border-dashed border-[#e7e7e7] rounded-lg flex flex-col items-center justify-center text-center hover:border-[#0ac79e] transition-colors cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <PlusCircle size={18} className="text-[#0ac79e] mb-1" />
              <span className="text-[13px] text-[#646B72]">Add Images</span>
            </div>

            {showSecondaryImage && (
              <div className="relative w-[120px] h-[120px] rounded-lg border border-[#f1f1f1] overflow-hidden">
                <img
                  src="assets/img/products/phone-add-2.png"
                  alt="image"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={onRemoveSecondaryImage}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-[#646B72] hover:text-[#c80000] transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {showPrimaryImage && (
              <div className="relative w-[120px] h-[120px] rounded-lg border border-[#f1f1f1] overflow-hidden">
                <img
                  src="assets/img/products/phone-add-1.png"
                  alt="image"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={onRemovePrimaryImage}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-[#646B72] hover:text-[#c80000] transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

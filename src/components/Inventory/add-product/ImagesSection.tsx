"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef } from "react";
import { Plus, X } from "react-feather";
import { resolveProductImageUrl } from "@/lib/media";

export type ProductImageDraft = {
  id: string;
  file?: File;
  previewUrl: string;
  uploadedUrl?: string;
  uploading?: boolean;
  error?: string;
};

type ImagesSectionProps = {
  images: ProductImageDraft[];
  onAddFiles: (files: FileList | File[]) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
};

const MAX_IMAGES = 10;

export default function ImagesSection({
  images,
  onAddFiles,
  onRemove,
  disabled,
}: ImagesSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onAddFiles(files);
    }
    e.target.value = "";
  };

  const canAddMore = images.length < MAX_IMAGES;

  return (
    <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center">
          <i className="ti ti-photo text-[16px] text-[#0ac79e]" />
        </div>
        <div>
          <h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Images</h5>
          <p className="m-0 text-[12px] text-[#94A3B8]">
            Upload one or more product images ({images.length}/{MAX_IMAGES})
          </p>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="flex flex-wrap items-start gap-4">
          {canAddMore && (
            <label
              className={`relative w-[130px] h-[130px] border-2 border-dashed border-[#CBD5E1] rounded-xl flex flex-col items-center justify-center text-center hover:border-[#0ac79e] hover:bg-[#F0FDF9] transition-all group ${disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                disabled={disabled}
              />
              <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] group-hover:bg-[#0ac79e]/10 flex items-center justify-center transition-colors">
                <Plus size={18} className="text-[#64748B] group-hover:text-[#0ac79e]" />
              </div>
              <span className="text-[12px] font-medium text-[#64748B] mt-1.5 group-hover:text-[#0ac79e] transition-colors">
                Add Images
              </span>
            </label>
          )}

          {images.map((image, index) => (
            <div key={image.id} className="relative w-[130px] h-[130px]">
              <div className="relative w-full h-full rounded-xl border border-[#F1F5F9] overflow-hidden shadow-sm">
                <img
                  src={resolveProductImageUrl(image.uploadedUrl ?? image.previewUrl)}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {image.uploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-[11px] font-medium text-[#64748B]">
                    Uploading...
                  </div>
                )}
                {image.error && (
                  <div className="absolute inset-x-0 bottom-0 bg-[#FEE2E2] text-[#B91C1C] text-[10px] px-1 py-0.5 truncate">
                    {image.error}
                  </div>
                )}
                {index === 0 && !image.uploading && (
                  <span className="absolute bottom-1 left-1 text-[10px] font-semibold bg-[#0ac79e] text-white px-1.5 py-0.5 rounded">
                    Primary
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemove(image.id)}
                disabled={disabled || image.uploading}
                aria-label={`Remove image ${index + 1}`}
                className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-[#334155] text-white shadow-md flex items-center justify-center hover:bg-[#EF4444] transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

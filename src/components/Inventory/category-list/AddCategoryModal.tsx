"use client";

import { useState, useRef } from "react";
import type { CreateCategoryPayload } from "@/lib/inventory";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

type Props = {
  onAddCategory: (payload: CreateCategoryPayload) => Promise<{ ok: boolean; error?: string }>;
};

export default function AddCategoryModal({ onAddCategory }: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const resetForm = () => {
    setName("");
    setSlug("");
    setIsActive(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;
    setSubmitting(true);
    setError(null);
    const result = await onAddCategory({
      name: name.trim(),
      slug: slug.trim(),
      is_active: isActive,
      parent: null,
    });
    setSubmitting(false);
    if (result.ok) {
      resetForm();
      closeBtnRef.current?.click();
    } else {
      setError(result.error ?? "Failed to create category.");
    }
  };

  return (
    <div className="modal fade" id="add-category">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Add Category</h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeBtnRef}
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
              onClick={resetForm}
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-4 flex flex-col gap-4">
              {error && (
                <div className="p-2.5 rounded bg-[#fff0f0] text-[#c80000] text-[13px]">
                  {error}
                </div>
              )}
              <div>
                <label className={labelCls}>
                  Category <span className="text-[#dc3545]">*</span>
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>
                  Category Slug <span className="text-[#dc3545]">*</span>
                </label>
                <input
                  type="text"
                  className={inputCls}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium text-[#212B36]">
                  Status <span className="text-[#dc3545]">*</span>
                </span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <span className="relative block w-9 h-5 bg-[#e7e7e7] rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-4" />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors"
                onClick={resetForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !name.trim() || !slug.trim()}
                className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

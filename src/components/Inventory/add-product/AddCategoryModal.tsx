"use client";

import { useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { createCategory } from "@/lib/inventory";
import { slugifyName } from "@/lib/productFormUtils";

type AddCategoryModalProps = {
  open: boolean;
  parentCategoryId?: string;
  onClose: () => void;
  onCreated: (categoryId: string) => void;
};

export default function AddCategoryModal({
  open,
  parentCategoryId,
  onClose,
  onCreated,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    const result = await createCategory(
      {
        name: name.trim(),
        slug: (slug || slugifyName(name)).trim(),
        parent: parentCategoryId || null,
        is_active: true,
      },
      getAccessToken(),
    );
    setSubmitting(false);
    if (result.ok && result.body.data?.id) {
      onCreated(result.body.data.id);
      setName("");
      setSlug("");
      onClose();
    } else {
      setError(result.body.message ?? "Failed to create category.");
    }
  };

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
          <h4 className="m-0 text-[16px] font-bold text-[#0F172A]">Add New Category</h4>
          <button type="button" onClick={onClose} className="text-[#64748B] hover:text-[#0F172A]">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && <div className="text-[13px] text-[#c80000]">{error}</div>}
          <div>
            <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">Name</label>
            <input
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px]"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug) setSlug(slugifyName(e.target.value));
              }}
              required
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">Slug</label>
            <input
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px]"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-[13px]">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-[#0ac79e] text-white text-[13px] disabled:opacity-50">
              {submitting ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

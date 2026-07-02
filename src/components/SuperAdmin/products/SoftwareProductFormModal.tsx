"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createPlatformProduct,
  fetchPlatformProduct,
  updatePlatformProduct,
  type SoftwareProduct,
} from "@/lib/billing";
import { getAccessToken } from "@/lib/auth-session";

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";
const labelCls = "block text-[13px] font-medium text-[#212B36] mb-1.5";

type Props = {
  isCreate?: boolean;
  productId?: string | null;
  onSaved?: () => void;
};

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  category: "",
  sortOrder: "0",
  isActive: true,
  isPublished: true,
};

export default function SoftwareProductFormModal({ isCreate, productId, onSaved }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    function () {
      if (isCreate || !productId) {
        setForm(emptyForm);
        return;
      }

      const token = getAccessToken();
      if (!token) return;

      setFetching(true);
      setError(null);

      fetchPlatformProduct(productId, token).then(function (result) {
        if (result.ok && result.body.success && result.body.data) {
          const p = result.body.data as SoftwareProduct;
          setForm({
            name: p.name || "",
            slug: p.slug || "",
            description: p.description || "",
            category: p.category || "",
            sortOrder: String(p.sort_order ?? 0),
            isActive: p.is_active,
            isPublished: p.is_published,
          });
        } else {
          setError(result.body.message || "Failed to load product.");
        }
        setFetching(false);
      });
    },
    [isCreate, productId],
  );

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm(function (prev) {
      return { ...prev, [key]: value };
    });
  }

  const handleSave = useCallback(
    async function (e: React.FormEvent) {
      e.preventDefault();

      const token = getAccessToken();
      if (!token) {
        setError("You must be signed in as a platform admin.");
        return;
      }

      setLoading(true);
      setError(null);

      const payload = {
        name: form.name || undefined,
        slug: form.slug || undefined,
        description: form.description || undefined,
        category: form.category || null,
        sort_order: form.sortOrder ? parseInt(form.sortOrder, 10) : undefined,
        is_active: form.isActive,
        is_published: form.isPublished,
      };

      try {
        let result;
        if (isCreate) {
          result = await createPlatformProduct(payload, token);
        } else if (productId) {
          result = await updatePlatformProduct(productId, payload, token);
        } else {
          return;
        }

        if (result.ok && result.body.success) {
          if (onSaved) onSaved();
          setForm(emptyForm);
        } else {
          setError(result.body.message || "Operation failed.");
        }
      } catch {
        setError("Unable to reach the server.");
      } finally {
        setLoading(false);
      }
    },
    [form, isCreate, productId, onSaved],
  );

  const modalId = isCreate ? "add_product" : "edit_product";
  const title = isCreate ? "Add Product" : "Edit Product";
  const content = fetching ? (
    <div className="p-6 text-center text-muted">Loading product...</div>
  ) : productId || isCreate ? (
    <form onSubmit={handleSave}>
      <div className="p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 min-[768px]:col-span-6">
            <label className={labelCls}>
              Product Name <span className="text-[#dc3545]">*</span>
            </label>
            <input
              type="text"
              className={inputCls}
              value={form.name}
              onChange={function (e) { set("name", e.target.value); }}
              required
            />
          </div>
          <div className="col-span-12 min-[768px]:col-span-6">
            <label className={labelCls}>Slug</label>
            <input
              type="text"
              className={inputCls}
              value={form.slug}
              onChange={function (e) { set("slug", e.target.value); }}
            />
          </div>
          <div className="col-span-12 min-[768px]:col-span-6">
            <label className={labelCls}>Category ID</label>
            <input
              type="text"
              className={inputCls}
              value={form.category}
              onChange={function (e) { set("category", e.target.value); }}
              placeholder="Leave blank for none"
            />
          </div>
          <div className="col-span-12 min-[768px]:col-span-3">
            <label className={labelCls}>Sort Order</label>
            <input
              type="number"
              className={inputCls}
              value={form.sortOrder}
              onChange={function (e) { set("sortOrder", e.target.value); }}
            />
          </div>
          <div className="col-span-6 min-[768px]:col-span-3 flex flex-col justify-end gap-2 pb-0.5">
            <label className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#0ac79e]"
                checked={form.isActive}
                onChange={function (e) { set("isActive", e.target.checked); }}
              />
              Active
            </label>
            <label className="flex items-center gap-2 text-[14px] font-medium text-[#212B36] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#0ac79e]"
                checked={form.isPublished}
                onChange={function (e) { set("isPublished", e.target.checked); }}
              />
              Published
            </label>
          </div>
          <div className="col-span-12">
            <label className={labelCls}>Description</label>
            <textarea
              className={`${inputCls} min-h-[90px]`}
              value={form.description}
              onChange={function (e) { set("description", e.target.value); }}
            />
          </div>
        </div>
      </div>

      {error ? (
        <p className="px-4 text-[14px] text-[#dc3545]">{error}</p>
      ) : null}

      <div className="flex items-center justify-end gap-2 p-4 border-t border-[#f1f1f1]">
        <button
          type="button"
          data-bs-dismiss="modal"
          disabled={loading}
          className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : isCreate ? "Create" : "Save Changes"}
        </button>
      </div>
    </form>
  ) : (
    <div className="p-6 text-center text-muted">No product selected.</div>
  );

  return (
    <div className="modal fade" id={modalId}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">{title}</h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
}

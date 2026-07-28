"use client";

import { useState } from "react";
import type { ProductListRecord } from "./types";

type Props = { product: ProductListRecord | null; onDelete: (id: string) => Promise<boolean> };

export default function DeleteProductModal({ product, onDelete }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!product) return;
    setDeleting(true);
    const ok = await onDelete(product.id);
    setDeleting(false);
    if (ok) (window as any).bootstrap?.Modal?.getInstance?.(document.getElementById("delete-product-modal"))?.hide();
  };

  return (
    <div className="modal fade" id="delete-product-modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <span className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-[#fff0f0] text-[#dc3545]">
                <i className="ti ti-trash text-[32px]" />
              </span>
            </div>
            <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Delete Product</h4>
            <p className="mb-4 text-[14px] text-[#646B72]">
              Are you sure you want to delete &quot;{product?.name ?? ""}&quot;?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button type="button" data-bs-dismiss="modal" className="px-4 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[14px] font-medium hover:bg-[#f6f6f6] transition-colors">Cancel</button>
              <button type="button" disabled={deleting} onClick={handleDelete} className="px-4 py-2 rounded-[6px] bg-[#dc3545] text-white text-[14px] font-medium hover:bg-[#bb2d3b] transition-colors disabled:opacity-50">{deleting ? "Deleting..." : "Yes, Delete"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

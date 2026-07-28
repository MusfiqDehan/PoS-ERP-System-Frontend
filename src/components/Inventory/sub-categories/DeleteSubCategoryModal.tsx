"use client";

import { useState } from "react";
import type { SubCategoryRecord } from "./types";

type Props = {
  subCategory: SubCategoryRecord | null;
  onDeleteSubCategory: (id: string) => Promise<boolean>;
};

export default function DeleteSubCategoryModal({
  subCategory,
  onDeleteSubCategory,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!subCategory) return;
    setDeleting(true);
    const success = await onDeleteSubCategory(subCategory.id);
    setDeleting(false);
    if (success) {
      (window as any).bootstrap?.Modal?.getInstance?.(
        document.getElementById("delete-sub-category-modal"),
      )?.hide();
    }
  };

  return (
    <div className="modal fade" id="delete-sub-category-modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="p-5 px-3 text-center">
            <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
              <i className="ti ti-trash fs-24 text-danger" />
            </span>
            <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Sub Category</h4>
            <p className="mb-0 text-[#646B72]">
              Are you sure you want to delete &quot;{subCategory?.name ?? ""}&quot;?
            </p>
            <div className="mt-3 d-flex justify-content-center gap-2">
              <button
                type="button"
                className="btn btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary fs-13 fw-medium p-2 px-3"
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

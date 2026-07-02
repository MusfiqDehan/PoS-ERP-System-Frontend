"use client";

import { useCallback, useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import SoftwareProductsTable from "@/components/SuperAdmin/products/SoftwareProductsTable";
import SoftwareProductFormModal from "@/components/SuperAdmin/products/SoftwareProductFormModal";
import SoftwareProductDeleteModal from "@/components/SuperAdmin/products/SoftwareProductDeleteModal";

export default function SoftwareProducsPage() {
  const [searchText, setSearchText] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleting, setDeleting] = useState<{ id: string; name: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  function closeModal(id: string) {
    if (typeof window !== "undefined") {
      const el = document.getElementById(id);
      if (el) {
        const modal = (window as any).bootstrap?.Modal?.getInstance(el);
        if (modal) modal.hide();
      }
    }
  }

  const triggerRefresh = useCallback(function () {
    setRefreshKey(function (k) { return k + 1; });
  }, []);

  const handleEdit = useCallback(function (id: string) {
    setCreating(false);
    setEditingId(id);
  }, []);

  const handleDelete = useCallback(function (id: string, name: string) {
    setDeleting({ id, name });
  }, []);

  const handleDeleted = useCallback(function () {
    setDeleting(null);
    triggerRefresh();
    closeModal("delete_product");
  }, [triggerRefresh]);

  const handleSaved = useCallback(function () {
    setCreating(false);
    setEditingId(null);
    triggerRefresh();
    closeModal(creating ? "add_product" : "edit_product");
  }, [creating, triggerRefresh]);

  const handleCreate = useCallback(function () {
    setEditingId(null);
    setCreating(true);
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Software Products</h4>
                <h6>Manage software products in the billing catalog</h6>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              className="form-control !w-72 border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] focus:border-[#0ac79e] focus:ring-1 focus:ring-[#0ac79e]"
              placeholder="Search products..."
              value={searchText}
              onChange={function (e) { setSearchText(e.target.value); }}
            />
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#add_product"
              onClick={handleCreate}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0ac79e] text-white text-[14px] font-medium rounded-md hover:bg-[#089b7c] transition-colors"
            >
              <i className="ti ti-plus" />
              Add Product
            </button>
          </div>

          <SoftwareProductsTable
            searchText={searchText}
            onEditProduct={handleEdit}
            onDeleteProduct={handleDelete}
            refreshKey={refreshKey}
          />
        </div>
        <CommonFooter />
      </div>

      <SoftwareProductFormModal
        isCreate={creating}
        productId={creating ? null : editingId}
        onSaved={handleSaved}
      />

      <SoftwareProductDeleteModal
        productId={deleting?.id ?? null}
        productName={deleting?.name}
        onDeleted={handleDeleted}
      />
    </>
  );
}

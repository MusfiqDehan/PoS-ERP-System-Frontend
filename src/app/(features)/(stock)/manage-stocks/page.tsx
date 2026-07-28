"use client";

import { useState, useCallback } from "react";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AddStockModal from "@/components/stock/managestock/AddStockModal";
import EditStockModal from "@/components/stock/managestock/EditStockModal";
import ManageStockTable from "@/components/stock/managestock/ManageStockTable";
import PageHeader from "@/components/stock/managestock/PageHeader";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useManageStocks } from "@/hooks/stock/useManageStocks";
import type { StockLevel } from "@/lib/stock";

export default function ManageStock() {
  const stock = useManageStocks();
  const [editTarget, setEditTarget] = useState<StockLevel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StockLevel | null>(null);

  const handleEdit = useCallback((record: StockLevel) => { setEditTarget(record); }, []);
  const handleDeleteSelect = useCallback((record: StockLevel) => { setDeleteTarget(record); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await stock.removeStockLevel(deleteTarget.id);
    setDeleteTarget(null);
    closeBsModal("delete-modal");
  };

  return (
    <PermissionGuard featureKey="manage_stocks">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ManageStockTable
            dataSource={stock.dataSource}
            branches={stock.branches}
            warehouses={stock.warehouses}
            filterBranch={stock.filterBranch}
            setFilterBranch={stock.setFilterBranch}
            filterWarehouse={stock.filterWarehouse}
            setFilterWarehouse={stock.setFilterWarehouse}
            onEdit={handleEdit}
            onDelete={handleDeleteSelect}
          />
        </div>
        <CommonFooter />
      </div>

      <AddStockModal
        branches={stock.branches}
        warehouses={stock.warehouses}
        products={stock.products}
        onSubmit={stock.addStockLevel}
      />
      <EditStockModal
        target={editTarget}
        onSubmit={stock.adjustStock}
      />

      {/* Delete Stock Modal */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 text-gray-9 fw-bold mb-2 mt-1">Delete Stock Level</h4>
                <p className="text-gray-6 mb-0 fs-16">
                  Are you sure you want to delete this stock level for{" "}
                  <strong>{deleteTarget?.product_name ?? deleteTarget?.product}</strong>?
                </p>
                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                  <button type="button" className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary fs-13 fw-medium p-2 px-3" onClick={handleDelete}>
                    Yes Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}

function closeBsModal(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bsModal = (window as any).bootstrap?.Modal?.getInstance(el);
  bsModal?.hide();
}

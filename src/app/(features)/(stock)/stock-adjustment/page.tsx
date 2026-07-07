"use client";

import { useState, useCallback } from "react";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AddAdjustmentModal from "@/components/stock/stock-adjustment/AddAdjustmentModal";
import PageHeader from "@/components/stock/stock-adjustment/PageHeader";
import StockAdjustmentTable from "@/components/stock/stock-adjustment/StockAdjustmentTable";
import ViewNotesModal from "@/components/stock/stock-adjustment/ViewNotesModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useStockAdjustments } from "@/hooks/stock/useStockAdjustments";
import type { StockAdjustment } from "@/lib/stock";

export default function StockAdjustment() {
  const stock = useStockAdjustments();
  const [notesTarget, setNotesTarget] = useState<StockAdjustment | null>(null);

  const handleViewNotes = useCallback((record: StockAdjustment) => {
    setNotesTarget(record);
    openBsModal("view-notes");
  }, []);

  return (
    <PermissionGuard featureKey="stock_adjustment">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <StockAdjustmentTable
            dataSource={stock.dataSource}
            loading={stock.loading}
            error={stock.error}
            branches={stock.branches}
            filterBranch={stock.filterBranch}
            setFilterBranch={stock.setFilterBranch}
            onViewNotes={handleViewNotes}
          />
        </div>
        <CommonFooter />
      </div>
      <AddAdjustmentModal
        branches={stock.branches}
        warehouses={stock.warehouses}
        products={stock.products}
        saving={stock.saving}
        onSubmit={stock.createAdjustment}
      />
      <ViewNotesModal reason={notesTarget?.reason ?? ""} />
    </PermissionGuard>
  );
}

function openBsModal(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Bootstrap = (window as any).bootstrap;
  if (!Bootstrap?.Modal) return;
  Bootstrap.Modal.getOrCreateInstance(el).show();
}

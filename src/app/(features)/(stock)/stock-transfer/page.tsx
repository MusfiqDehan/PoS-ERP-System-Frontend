"use client";

import { useState, useCallback } from "react";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AddTransferModal from "@/components/stock/stock-transfer/AddTransferModal";
import EditTransferModal from "@/components/stock/stock-transfer/EditTransferModal";
import PageHeader from "@/components/stock/stock-transfer/PageHeader";
import StockTransferTable from "@/components/stock/stock-transfer/StockTransferTable";
import type { StockTransferRecord } from "@/components/stock/stock-transfer/types";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useStockTransfers } from "@/hooks/stock/useStockTransfers";

export default function StockTransfer() {
  const stock = useStockTransfers();
  const [viewTarget, setViewTarget] = useState<StockTransferRecord | null>(null);

  const handleView = useCallback((record: StockTransferRecord) => {
    setViewTarget(record);
    openBsModal("edit-units");
  }, []);

  return (
    <PermissionGuard featureKey="stock_transfer">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <StockTransferTable
            dataSource={stock.dataSource}
            loading={stock.loading}
            error={stock.error}
            branches={stock.branches}
            filterBranch={stock.filterBranch}
            setFilterBranch={stock.setFilterBranch}
            onView={handleView}
          />
        </div>
        <CommonFooter />
      </div>
      <AddTransferModal
        branches={stock.branches}
        products={stock.products}
        saving={stock.saving}
        onSubmit={stock.createTransfer}
      />
      <EditTransferModal
        transfer={viewTarget}
        saving={stock.saving}
        onApprove={stock.approveTransfer}
        onReject={stock.rejectTransfer}
        onShip={stock.shipTransfer}
        onReceive={stock.receiveTransfer}
        onPartialApprove={stock.partialApproveTransfer}
      />
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

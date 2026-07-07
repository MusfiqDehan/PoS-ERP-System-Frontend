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
import { openBootstrapModal } from "@/lib/bootstrapModal";

export default function StockTransfer() {
  const stock = useStockTransfers();
  const { loadTransferDetail } = stock;
  const [viewTarget, setViewTarget] = useState<StockTransferRecord | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const handleView = useCallback(
    async (record: StockTransferRecord) => {
      setViewTarget(record);
      setDetailLoading(true);
      openBootstrapModal("edit-units");

      const detail = await loadTransferDetail(record.id);
      if (detail) {
        setViewTarget(detail);
      }
      setDetailLoading(false);
    },
    [loadTransferDetail],
  );

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
        warehouses={stock.warehouses}
        products={stock.products}
        saving={stock.saving}
        onSubmit={stock.createTransfer}
      />
      <EditTransferModal
        transfer={viewTarget}
        detailLoading={detailLoading}
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

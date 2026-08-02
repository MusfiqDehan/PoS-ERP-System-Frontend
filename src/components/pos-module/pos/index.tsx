"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { openPosModal } from "./categories-modal/openPosModal";
import PosSaleModals, { useFinalizeSale } from "./PosSaleModals";
import PosOrderDetails from "./PosOrderDetails";
import PosOrderSidebar from "./PosOrderSidebar";
import PosProductsPanel from "./PosProductsPanel";
import PosScannerPanel from "./PosScannerPanel";
import { usePosCart } from "@/hooks/pos/usePosCart";
import { usePosCategories } from "@/hooks/pos/usePosCategories";
import {
  POS_MODAL_IDS,
  usePosKeyboardShortcuts,
} from "@/hooks/pos/usePosKeyboardShortcuts";
import { usePosPage } from "@/hooks/pos/usePosPage";
import { usePosProducts } from "@/hooks/pos/usePosProducts";
import { useActiveBranch } from "@/providers/branch-provider";
import { getAccessToken } from "@/lib/auth-session";
import { fetchPosConfig } from "@/lib/pos";
import { apiRowToPosProduct } from "@/lib/posProductMapping";
import {
  playScanSound,
  scanAddedMessage,
  scanNotFoundMessage,
  scanOutOfStockMessage,
  scanStockLimitMessage,
} from "@/lib/posScanFeedback";

const PosModals = dynamic(() => import("@/core/modals/pos-modal/posModals"));
const PosManageCategoriesModal = dynamic(
  () => import("./categories-modal/PosManageCategoriesModal"),
);
const PosCreateCustomerModal = dynamic(() => import("./PosCreateCustomerModal"));

function scanFailureMessage(apiMessage: string): string {
  if (
    apiMessage === "Select a branch before scanning." ||
    apiMessage === "Enter a barcode or SKU to scan."
  ) {
    return apiMessage;
  }
  return scanNotFoundMessage();
}

export default function PosComponent() {
  const { activeBranch } = useActiveBranch();
  const branchId = activeBranch?.id ?? null;

  const { activeTab, setActiveTab } = usePosPage();
  const cart = usePosCart();
  const finalize = useFinalizeSale();
  const [printReceiptRequest, setPrintReceiptRequest] = useState(0);
  const categories = usePosCategories({
    branchId,
    activeTab,
    onTabChange: setActiveTab,
  });

  const { products, loading: productsLoading, scanBarcode } = usePosProducts({
    branchId,
    categoryId: activeTab,
    searchQuery: undefined,
  });

  const [scanSoundEnabled, setScanSoundEnabled] = useState(true);

  useEffect(() => {
    if (!branchId) {
      return;
    }

    let cancelled = false;
    void (async () => {
      const token = getAccessToken();
      const res = await fetchPosConfig(token, branchId);
      if (cancelled || !res.ok || !res.body.data) {
        return;
      }
      setScanSoundEnabled(res.body.data.scan_sound_enabled ?? true);
    })();

    return () => {
      cancelled = true;
    };
  }, [branchId]);

  const handleBarcodeScan = useCallback(
    async (code: string) => {
      const trimmed = code.trim();
      if (!trimmed) {
        return;
      }

      try {
        const result = await scanBarcode(trimmed);
        if (!result.ok) {
          if (scanSoundEnabled) {
            playScanSound("error");
          }
          cart.showStatus(scanFailureMessage(result.message));
          return;
        }

        const product = apiRowToPosProduct(result.row);
        const added = cart.addProduct(product, { quiet: true });
        if (added) {
          if (scanSoundEnabled) {
            playScanSound("success");
          }
          cart.showStatus(scanAddedMessage(product.name));
          return;
        }

        if (scanSoundEnabled) {
          playScanSound("error");
        }
        cart.showStatus(
          product.stockStatus === "out-of-stock"
            ? scanOutOfStockMessage(product.name)
            : scanStockLimitMessage(product.name),
        );
      } catch {
        if (scanSoundEnabled) {
          playScanSound("error");
        }
        cart.showStatus("Scan failed. Check your connection and try again.");
      }
    },
    [cart, scanBarcode, scanSoundEnabled, branchId],
  );

  const handlePrintLastReceipt = useCallback(() => {
    if (cart.receiptSnapshot) {
      setPrintReceiptRequest((current) => current + 1);
      return;
    }
    openPosModal(POS_MODAL_IDS.printReceipt);
  }, [cart.receiptSnapshot]);

  usePosKeyboardShortcuts({
    onHoldOrder: cart.holdOrder,
    onStartNewOrder: cart.startNewOrder,
    onCompleteSale: finalize.open,
    onPrintLastReceipt: handlePrintLastReceipt,
    canCompleteSale: cart.canCheckout,
  });

  return (
    <div className="main-wrapper pos-five">
      <div className="page-wrapper pos-pg-wrapper ms-0">
        <div className="content pos-design p-0">
          {cart.statusMessage && (
            <output className="pos-status-toast" role="status" aria-live="polite">
              {cart.statusMessage}
            </output>
          )}

          {!branchId && (
            <output className="pos-status-toast pos-status-toast--warning" role="status">
              Select a branch in the header before scanning products.
            </output>
          )}

          <PosScannerPanel onBarcodeScan={handleBarcodeScan} />

          <div className="pos-wrapper">
            <PosProductsPanel
              categories={categories.categories}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onProductSelect={cart.addProduct}
              cartProductIds={cart.cartProductIds}
              products={products}
              productsLoading={productsLoading}
              onBarcodeScan={handleBarcodeScan}
              branchId={branchId}
            />
            <PosOrderDetails
              items={cart.items}
              onDecrease={cart.decreaseQuantity}
              onIncrease={cart.increaseQuantity}
              onRemove={cart.removeItem}
              onClearAll={cart.clearCart}
            />
            <PosOrderSidebar
              invoiceId={cart.invoiceId}
              summaryLines={cart.summaryLines}
              totalPayable={cart.summary.totalPayable}
              selectedPaymentId={cart.selectedPaymentId}
              canCheckout={cart.canCheckout}
              onSelectPayment={cart.setSelectedPaymentId}
              onHold={cart.holdOrder}
              onNew={cart.startNewOrder}
              onClear={cart.clearCart}
              onSaveDraft={cart.saveDraft}
              onPayAndPrint={finalize.open}
              customers={cart.customers}
              selectedCustomer={cart.selectedCustomer}
              onSelectCustomer={cart.selectCustomer}
              loyaltyMode={cart.loyaltyMode}
              onLoyaltyModeChange={cart.setLoyaltyMode}
              cartSubtotal={cart.subtotal}
              paymentMethods={cart.paymentMethods}
            />
          </div>
        </div>
      </div>
      <PosCreateCustomerModal onCreateCustomer={cart.createCustomer} />
      <PosManageCategoriesModal
        categories={categories.categories}
        categoryStats={categories.categoryStats}
        onCreateCategory={categories.createCategory}
        onUpdateCategory={categories.updateCategory}
        onDeleteCategory={categories.deleteCategory}
      />
      <PosSaleModals
        totalPayable={cart.summary.totalPayable}
        invoiceId={cart.invoiceId}
        selectedPaymentId={cart.selectedPaymentId}
        receiptSnapshot={cart.receiptSnapshot}
        onCompleteOrder={() => cart.completeOrder(branchId)}
        onDismissReceipt={cart.clearReceiptSnapshot}
        paymentMethods={cart.paymentMethods}
        modalView={finalize.view}
        onModalViewChange={finalize.setView}
        printReceiptRequest={printReceiptRequest}
      />
      <PosModals />
    </div>
  );
}

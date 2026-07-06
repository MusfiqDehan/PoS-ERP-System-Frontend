"use client";

import { useCallback, useState } from "react";
import PosModals from "@/core/modals/pos-modal/posModals";
import PosManageCategoriesModal from "./categories-modal/PosManageCategoriesModal";
import { openPosModal } from "./categories-modal/openPosModal";
import PosCreateCustomerModal from "./PosCreateCustomerModal";
import PosSaleModals, { useFinalizeSale } from "./PosSaleModals";
import PosOrderDetails from "./PosOrderDetails";
import PosOrderSidebar from "./PosOrderSidebar";
import PosProductsPanel from "./PosProductsPanel";
import { usePosCart } from "@/hooks/pos/usePosCart";
import { usePosCategories } from "@/hooks/pos/usePosCategories";
import {
  POS_MODAL_IDS,
  usePosKeyboardShortcuts,
} from "@/hooks/pos/usePosKeyboardShortcuts";
import { usePosPage } from "@/hooks/pos/usePosPage";
import { usePosProducts } from "@/hooks/pos/usePosProducts";
import { useActiveBranch } from "@/providers/branch-provider";
import { apiRowToPosProduct } from "@/lib/posProductMapping";

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

  const handleBarcodeScan = useCallback(
    async (code: string) => {
      const result = await scanBarcode(code);
      if (result.ok) {
        cart.addProduct(apiRowToPosProduct(result.row));
        return;
      }
      cart.showStatus(result.message);
    },
    [cart, scanBarcode],
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
            <output className="pos-status-toast">{cart.statusMessage}</output>
          )}

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

"use client";

import PosModals from "@/core/modals/pos-modal/posModals";
import PosManageCategoriesModal from "./categories-modal/PosManageCategoriesModal";
import PosCreateCustomerModal from "./PosCreateCustomerModal";
import PosSaleModals from "./PosSaleModals";
import PosOrderDetails from "./PosOrderDetails";
import PosOrderSidebar from "./PosOrderSidebar";
import PosProductsPanel from "./PosProductsPanel";
import { usePosCart } from "@/hooks/pos/usePosCart";
import { usePosCategories } from "@/hooks/pos/usePosCategories";
import { usePosPage } from "@/hooks/pos/usePosPage";

export default function PosComponent() {
  const { activeTab, setActiveTab } = usePosPage();
  const cart = usePosCart();
  const categories = usePosCategories({
    activeTab,
    onTabChange: setActiveTab,
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
              onCompleteOrder={cart.completeOrder}
              customers={cart.customers}
              selectedCustomer={cart.selectedCustomer}
              onSelectCustomer={cart.selectCustomer}
              loyaltyMode={cart.loyaltyMode}
              onLoyaltyModeChange={cart.setLoyaltyMode}
              cartSubtotal={cart.subtotal}
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
        onCompleteOrder={cart.completeOrder}
        onDismissReceipt={cart.clearReceiptSnapshot}
      />
      <PosModals />
    </div>
  );
}

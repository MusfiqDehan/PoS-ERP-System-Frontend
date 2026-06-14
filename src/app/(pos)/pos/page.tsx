"use client";

import PosModals from "@/core/modals/pos-modal/posModals";
import PosCreateCustomerModal from "@/components/pos-module/pos/PosCreateCustomerModal";
import PosSaleModals from "@/components/pos-module/pos/PosSaleModals";
import PosOrderDetails from "@/components/pos-module/pos/PosOrderDetails";
import PosOrderSidebar from "@/components/pos-module/pos/PosOrderSidebar";
import PosProductsPanel from "@/components/pos-module/pos/PosProductsPanel";
import { usePosCart } from "@/components/pos-module/pos/usePosCart";
import { usePosPage } from "@/components/pos-module/pos/usePosPage";

export default function PosComponent() {
  const { activeTab, setActiveTab } = usePosPage();
  const cart = usePosCart();

  return (
    <div className="main-wrapper pos-five">
      <div className="page-wrapper pos-pg-wrapper ms-0">
        <div className="content pos-design p-0">
          {cart.statusMessage && (
            <output className="pos-status-toast">{cart.statusMessage}</output>
          )}

          <div className="pos-wrapper">
            <PosProductsPanel
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onProductSelect={cart.addProduct}
              cartProductIds={cart.cartProductIds}
            />

          </div>
        </div>
      </div>
      <PosCreateCustomerModal onCreateCustomer={cart.createCustomer} />
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

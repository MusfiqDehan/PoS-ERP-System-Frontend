"use client";

import { useCallback } from "react";
import PosManageCategoriesModal from "@/components/pos-module/pos/categories-modal/PosManageCategoriesModal";
import PosProductsPanel from "@/components/pos-module/pos/PosProductsPanel";
import { usePosCart } from "@/hooks/pos/usePosCart";
import { usePosCategories } from "@/hooks/pos/usePosCategories";
import { usePosPage } from "@/hooks/pos/usePosPage";
import { usePosProducts } from "@/hooks/pos/usePosProducts";
import PosOrderDetails from "@/components/pos-module/pos/PosOrderDetails";
import { useActiveBranch } from "@/providers/branch-provider";
import { apiRowToPosProduct } from "@/lib/posProductMapping";
import {
  scanAddedMessage,
  scanNotFoundMessage,
  scanOutOfStockMessage,
  scanStockLimitMessage,
} from "@/lib/posScanFeedback";

export default function Pos2() {
  const { activeBranch } = useActiveBranch();
  const branchId = activeBranch?.id ?? null;
  const { activeTab, setActiveTab } = usePosPage();
  const cart = usePosCart();
  const categoryState = usePosCategories({
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
      const trimmed = code.trim();
      if (!trimmed) {
        return;
      }

      try {
        const result = await scanBarcode(trimmed);
        if (!result.ok) {
          cart.showStatus(result.message || scanNotFoundMessage());
          return;
        }

        const product = apiRowToPosProduct(result.row);
        const added = cart.addProduct(product, { quiet: true });
        if (added) {
          cart.showStatus(scanAddedMessage(product.name));
          return;
        }

        cart.showStatus(
          product.stockStatus === "out-of-stock"
            ? scanOutOfStockMessage(product.name)
            : scanStockLimitMessage(product.name),
        );
      } catch {
        cart.showStatus("Scan failed. Check your connection and try again.");
      }
    },
    [cart, scanBarcode],
  );

  return (
    <div className="main-wrapper pos-five">
      <div className="page-wrapper pos-pg-wrapper ms-0">
        <div className="content pos-design p-0">
          {cart.statusMessage && (
            <output className="pos-status-toast">{cart.statusMessage}</output>
          )}

          <div className="pos-wrapper">
            <PosProductsPanel
              categories={categoryState.categories}
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
          </div>
        </div>
      </div>

      <PosManageCategoriesModal
        categories={categoryState.categories}
        categoryStats={categoryState.categoryStats}
        onCreateCategory={categoryState.createCategory}
        onUpdateCategory={categoryState.updateCategory}
        onDeleteCategory={categoryState.deleteCategory}
      />
    </div>
  );
}

"use client";

import PosManageCategoriesModal from "@/components/pos-module/pos/categories-modal/PosManageCategoriesModal";
import PosProductsPanel from "@/components/pos-module/pos/PosProductsPanel";
import { usePosCart } from "@/hooks/pos/usePosCart";
import { usePosCategories } from "@/hooks/pos/usePosCategories";
import { usePosPage } from "@/hooks/pos/usePosPage";
import PosOrderDetails from "@/components/pos-module/pos/PosOrderDetails";
import { useActiveBranch } from "@/providers/branch-provider";

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

"use client";

import { useState } from "react";
import ProductSearchField from "./ProductSearchField";
import QrCodeActionButtons from "./QrCodeActionButtons";
import QrCodePrintSettings from "./QrCodePrintSettings";
import QrCodeProductsTable from "./QrCodeProductsTable";
import WarehouseStoreFields from "./WarehouseStoreFields";

export default function QrCodeContent() {
  const [quantity, setQuantity] = useState(4);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 sm:p-5">
      <form>
        <WarehouseStoreFields />
        <ProductSearchField />
      </form>
      <QrCodeProductsTable
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
      <QrCodePrintSettings />
      <QrCodeActionButtons />
    </div>
  );
}

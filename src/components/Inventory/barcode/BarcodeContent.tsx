"use client";

import { useState } from "react";
import BarcodeActionButtons from "./BarcodeActionButtons";
import BarcodePrintSettings from "./BarcodePrintSettings";
import BarcodeProductsTable from "./BarcodeProductsTable";
import ProductSearchField from "./ProductSearchField";
import WarehouseStoreFields from "./WarehouseStoreFields";

export default function BarcodeContent() {
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
    <div className="barcode-content-list">
      <form>
        <WarehouseStoreFields />
        <ProductSearchField />
      </form>
      <BarcodeProductsTable
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
      <BarcodePrintSettings />
      <BarcodeActionButtons />
    </div>
  );
}

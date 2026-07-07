"use client";

import { useCallback, useState } from "react";

export type LabelQueueItem = {
  key: string;
  entity_type: "product" | "variant" | "package";
  entity_id: string;
  quantity: number;
  displayName: string;
  sku: string;
  barcode?: string | null;
  imageUrl?: string;
  productId?: string;
};

export function useLabelPrintQueue() {
  const [items, setItems] = useState<LabelQueueItem[]>([]);

  const addItem = useCallback((item: Omit<LabelQueueItem, "key">) => {
    setItems((current) => {
      const existing = current.find(
        (row) =>
          row.entity_type === item.entity_type && row.entity_id === item.entity_id,
      );
      if (existing) {
        return current.map((row) =>
          row.key === existing.key
            ? { ...row, quantity: row.quantity + item.quantity }
            : row,
        );
      }
      return [
        ...current,
        { ...item, key: `${item.entity_type}-${item.entity_id}-${Date.now()}` },
      ];
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((row) => row.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      current.map((row) =>
        row.key === key ? { ...row, quantity: Math.max(1, quantity) } : row,
      ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return { items, addItem, removeItem, updateQuantity, clear };
}

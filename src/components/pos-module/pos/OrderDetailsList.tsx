"use client";

import OrderDetailsRow from "./OrderDetailsRow";
import type { OrderDetailItem } from "./orderDetailsData";

type OrderDetailsListProps = {
  items: OrderDetailItem[];
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function OrderDetailsList({
  items,
  onDecrease,
  onIncrease,
  onRemove,
}: OrderDetailsListProps) {
  if (items.length === 0) {
    return (
      <div className="pos-order-details__empty">
        <p>No items in this order yet.</p>
      </div>
    );
  }

  return (
    <div className="pos-order-details__list">
      {items.map((item) => (
        <OrderDetailsRow
          key={item.id}
          item={item}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

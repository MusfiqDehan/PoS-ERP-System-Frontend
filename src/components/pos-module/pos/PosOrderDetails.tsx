"use client";

import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderDetailsList from "./OrderDetailsList";
import OrderDetailsTableHead from "./OrderDetailsTableHead";
import type { OrderDetailItem } from "./orderDetailsData";

type PosOrderDetailsProps = {
  items: OrderDetailItem[];
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
};

export default function PosOrderDetails({
  items,
  onDecrease,
  onIncrease,
  onRemove,
  onClearAll,
}: PosOrderDetailsProps) {
  return (
    <div className="pos-order-details__col">
      <section className="pos-order-details">
        <OrderDetailsHeader
          itemCount={items.length}
          onClearAll={onClearAll}
        />
        <OrderDetailsTableHead />

        <div className="pos-order-details__scroll">
          <OrderDetailsList
            items={items}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            onRemove={onRemove}
          />
        </div>
      </section>
    </div>
  );
}

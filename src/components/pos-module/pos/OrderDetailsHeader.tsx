"use client";

type OrderDetailsHeaderProps = {
  itemCount: number;
  onClearAll: () => void;
};

export default function OrderDetailsHeader({
  itemCount,
  onClearAll,
}: OrderDetailsHeaderProps) {
  return (
    <div className="pos-order-details__header">
      <div className="pos-order-details__title-wrap">
        <h2 className="pos-order-details__title">Order Details</h2>
        <span className="pos-order-details__count">
          {String(itemCount).padStart(2, "0")}
        </span>
      </div>

      <button
        type="button"
        className="pos-order-details__clear-btn"
        onClick={onClearAll}
      >
        Clear All
      </button>
    </div>
  );
}

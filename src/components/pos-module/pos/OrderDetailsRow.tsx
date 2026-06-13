"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import {
  formatOrderCurrency,
  getOrderSubtotal,
  orderDetailsAssets,
  type OrderDetailItem,
} from "./orderDetailsData";

type OrderDetailsRowProps = {
  item: OrderDetailItem;
  onDecrease: (id: string) => void;
  onIncrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function OrderDetailsRow({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}: OrderDetailsRowProps) {
  return (
    <article className="pos-order-details__row">
      <div className="pos-order-details__row-main">
        <p className="pos-order-details__col-product pos-order-details__product-name">
          {item.name}
        </p>
        <p className="pos-order-details__col-price pos-order-details__price">
          {formatOrderCurrency(item.price)}
        </p>

        <div className="pos-order-details__col-qty pos-order-details__qty">
          <button
            type="button"
            className="pos-order-details__qty-btn"
            onClick={() => onDecrease(item.id)}
            aria-label={`Decrease quantity for ${item.name}`}
          >
            <ImageWithBasePath
              src={orderDetailsAssets.minus}
              alt=""
              width={13}
              height={13}
            />
          </button>
          <span className="pos-order-details__qty-value">{item.quantity}</span>
          <button
            type="button"
            className="pos-order-details__qty-btn"
            onClick={() => onIncrease(item.id)}
            aria-label={`Increase quantity for ${item.name}`}
          >
            <ImageWithBasePath
              src={orderDetailsAssets.plus}
              alt=""
              width={13}
              height={13}
            />
          </button>
        </div>

        <p className="pos-order-details__col-subtotal pos-order-details__subtotal">
          {formatOrderCurrency(getOrderSubtotal(item))}
        </p>

        <button
          type="button"
          className="pos-order-details__remove-btn"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name}`}
        >
          <ImageWithBasePath
            src={orderDetailsAssets.remove}
            alt=""
            width={12}
            height={12}
          />
        </button>
      </div>

      <div className="pos-order-details__row-meta">
        <span className="pos-order-details__sku">{item.sku}</span>
        <span
          className={`pos-order-details__stock pos-order-details__stock--${item.stockStatus}`}
        >
          {item.stockLabel}
        </span>
      </div>
    </article>
  );
}

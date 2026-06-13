"use client";

export default function OrderDetailsTableHead() {
  return (
    <div className="pos-order-details__table-head">
      <span className="pos-order-details__col-product">Product</span>
      <span className="pos-order-details__col-price">Price</span>
      <span className="pos-order-details__col-qty">Quantity</span>
      <span className="pos-order-details__col-subtotal">Sub Total</span>
      <span className="pos-order-details__col-action" aria-hidden="true" />
    </div>
  );
}

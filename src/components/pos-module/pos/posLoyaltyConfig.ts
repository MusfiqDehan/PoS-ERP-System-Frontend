/**
 * POS loyalty — milestone model (not ranges):
 * - Every full 100 points in balance = 1% discount offer.
 *   · 99 pts → 0% · 100 pts → 1% · 178 pts → 1% (78 remain after exchange)
 *   · 200 pts → 2% · 220 pts → 2% (20 remain) · 420 pts → 4% (20 remain)
 * - Redeem: exchange (discount% × 100) points for that % off; remainder stays.
 * - Store points: no discount; earn more on this sale.
 */

export type LoyaltyMode = "redeem" | "accumulate";

/** Each 1% discount requires this many points to exchange. */
export const POINTS_PER_DISCOUNT_PERCENT = 100;

/** Maximum loyalty discount % a customer can unlock. */
export const MAX_LOYALTY_DISCOUNT_PERCENT = 10;

/** Points earned per BDT 1 subtotal when storing points (not redeeming). */
export const POINTS_PER_CURRENCY_UNIT = 1;

export const MIN_SUBTOTAL_TO_EARN_POINTS = 1;

export const WALK_IN_CUSTOMER_ID = "walk-in";

export type CustomerLoyalty = {
  points: number;
  discountPercent: number;
  redeemCostPoints: number;
  pointsAfterRedeem: number;
  earnsPoints: boolean;
  canRedeem: boolean;
};

export function isLoyaltyCustomer(customerId: string): boolean {
  return customerId !== WALK_IN_CUSTOMER_ID;
}

/**
 * Discount % = how many complete 100-point blocks the customer has.
 * Strict: must cross 100 for 1%, 200 for 2%, etc.
 */
export function getEligibleDiscountPercent(points: number): number {
  if (points < POINTS_PER_DISCOUNT_PERCENT) {
    return 0;
  }

  const fromMilestones = Math.floor(points / POINTS_PER_DISCOUNT_PERCENT);
  return Math.min(MAX_LOYALTY_DISCOUNT_PERCENT, fromMilestones);
}

/** Points spent to activate the current eligible discount on one order. */
export function getRedeemCostPoints(discountPercent: number): number {
  return discountPercent * POINTS_PER_DISCOUNT_PERCENT;
}

export function getCustomerLoyalty(
  customerId: string,
  points: number,
): CustomerLoyalty {
  const earnsPoints = isLoyaltyCustomer(customerId);
  const discountPercent = earnsPoints ? getEligibleDiscountPercent(points) : 0;
  const redeemCostPoints = getRedeemCostPoints(discountPercent);
  const canRedeem = earnsPoints && discountPercent > 0 && points >= redeemCostPoints;

  return {
    points,
    discountPercent,
    redeemCostPoints,
    pointsAfterRedeem: Math.max(0, points - redeemCostPoints),
    earnsPoints,
    canRedeem,
  };
}

export function calculateLoyaltyDiscountAmount(
  subtotal: number,
  discountPercent: number,
): number {
  return subtotal * (discountPercent / 100);
}

export function calculatePointsEarned(subtotal: number): number {
  if (subtotal < MIN_SUBTOTAL_TO_EARN_POINTS) {
    return 0;
  }

  return Math.floor(subtotal * POINTS_PER_CURRENCY_UNIT);
}

export function resolveLoyaltyForOrder(
  customerId: string,
  pointsBalance: number,
  subtotal: number,
  mode: LoyaltyMode,
) {
  const loyalty = getCustomerLoyalty(customerId, pointsBalance);
  const potentialDiscount = calculateLoyaltyDiscountAmount(
    subtotal,
    loyalty.discountPercent,
  );

  const applyDiscount =
    mode === "redeem" && loyalty.canRedeem && subtotal > 0;
  const effectiveDiscountPercent = applyDiscount ? loyalty.discountPercent : 0;
  const loyaltyDiscount = applyDiscount ? potentialDiscount : 0;
  const pointsToRedeem = applyDiscount ? loyalty.redeemCostPoints : 0;

  return {
    loyalty,
    mode,
    applyDiscount,
    canRedeem: loyalty.canRedeem && subtotal > 0,
    effectiveDiscountPercent,
    loyaltyDiscount,
    pointsToRedeem,
    pointsAfterRedeem: applyDiscount ? loyalty.pointsAfterRedeem : pointsBalance,
    pointsToEarn:
      mode === "accumulate" && loyalty.earnsPoints
        ? calculatePointsEarned(subtotal)
        : 0,
  };
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function calculateOrderTotals(
  subtotal: number,
  discountPercent: number,
  taxRate: number,
  shipping = 0,
) {
  const discountRate = discountPercent / 100;
  const loyaltyDiscount = round2(subtotal * discountRate);
  const taxableSubtotal = Math.max(0, round2(subtotal - loyaltyDiscount));
  const tax = round2(taxableSubtotal * taxRate);
  const totalPayable = round2(taxableSubtotal + tax + shipping);

  return {
    subtotal,
    loyaltyDiscount,
    taxableSubtotal,
    tax,
    shipping,
    totalPayable,
    discountRate,
    discountPercent,
  };
}

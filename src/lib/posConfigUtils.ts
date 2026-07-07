/** Convert backend decimal tax rate (0.12) to display percentage (12). */
export function decimalToTaxPercent(taxRate: string | number): number {
  const decimal = typeof taxRate === "string" ? parseFloat(taxRate) : taxRate;
  if (!Number.isFinite(decimal)) {
    return 0;
  }
  return Math.round(decimal * 10000) / 100;
}

/** Convert display percentage (12) to backend decimal string ("0.12"). */
export function taxPercentToDecimal(percent: number): string {
  const safe = Number.isFinite(percent) ? percent : 0;
  const decimal = safe / 100;
  return decimal.toFixed(4).replace(/\.?0+$/, "") || "0";
}

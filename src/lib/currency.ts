/** Project-wide default currency (Bangladeshi Taka). */
export const DEFAULT_CURRENCY_CODE = "BDT" as const;
export const DEFAULT_CURRENCY_LOCALE = "en-BD";

const currencyFormatter = new Intl.NumberFormat(DEFAULT_CURRENCY_LOCALE, {
  style: "currency",
  currency: DEFAULT_CURRENCY_CODE,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format a numeric amount as BDT (e.g. `৳4,233.00`). */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/** Parse a formatted or raw price string/number into a number (strips ৳, commas, etc.). */
export function parseCurrency(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === "") {
    return 0;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }
  const cleaned = value.replace(/[^0-9.]/g, "");
  return Number.parseFloat(cleaned) || 0;
}

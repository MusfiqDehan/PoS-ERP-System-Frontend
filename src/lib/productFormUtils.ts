/** Helpers for product add/edit forms. */

export type BarcodeSymbology = "code128" | "ean13" | "upca";

function randomDigits(length: number): string {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += Math.floor(Math.random() * 10).toString();
  }
  return out;
}

export function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function generateSkuCandidate(prefix = "SKU"): string {
  const stamp = Date.now().toString(36).toUpperCase();
  return `${prefix}-${stamp}-${randomDigits(4)}`;
}

export function generateBarcodeCandidate(symbology: BarcodeSymbology = "code128"): string {
  if (symbology === "ean13") {
    const body = randomDigits(12);
    return body;
  }
  if (symbology === "upca") {
    return randomDigits(11);
  }
  return `SRT${randomDigits(10)}`;
}

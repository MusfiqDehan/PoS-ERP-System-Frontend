import { image_path } from "@/environment";
import { getBackendOrigin } from "./env";

const DEFAULT_POS_PRODUCT_IMAGE = "assets/img/pos/products-panel/product-01.png";

/** Resolve Django /media/ paths against the backend origin when API is on another host. */
export function resolveMediaUrl(src: string): string {
  if (!src.startsWith("/media/")) {
    return src;
  }
  const origin = getBackendOrigin();
  return origin ? `${origin}${src}` : src;
}

/** Resolve product image URL for img src (supports /media/, absolute URLs, and static assets). */
export function resolveProductImageUrl(
  src: string | null | undefined,
  fallback: string = DEFAULT_POS_PRODUCT_IMAGE,
): string {
  if (!src || !src.trim()) {
    return fallback.startsWith("http") || fallback.startsWith("/")
      ? fallback
      : `${image_path}${fallback}`;
  }
  const trimmed = src.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }
  if (trimmed.startsWith("/media/")) {
    return resolveMediaUrl(trimmed);
  }
  if (trimmed.startsWith("/")) {
    return trimmed;
  }
  return `${image_path}${trimmed}`;
}

export { DEFAULT_POS_PRODUCT_IMAGE };

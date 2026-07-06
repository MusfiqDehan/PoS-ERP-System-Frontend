"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { renderBarcodeImage } from "@/lib/labels";
import type { BarcodeSymbology } from "@/lib/productFormUtils";

type ProductBarcodePreviewProps = {
  productId: string;
  barcode: string | null;
  symbology?: string | null;
};

function normalizeSymbology(value?: string | null): BarcodeSymbology {
  if (value === "ean13" || value === "upca" || value === "code128") {
    return value;
  }
  return "code128";
}

export default function ProductBarcodePreview({
  productId,
  barcode,
  symbology,
}: ProductBarcodePreviewProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = barcode?.trim() ?? "";
    if (!code) {
      setImageSrc(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setImageSrc(null);

    renderBarcodeImage(
      {
        code,
        symbology: normalizeSymbology(symbology),
        exclude_product_id: productId,
      },
      getAccessToken(),
    ).then((result) => {
      if (cancelled) return;
      setLoading(false);
      if (result.ok && result.body.data?.image_base64) {
        setImageSrc(`data:image/png;base64,${result.body.data.image_base64}`);
        setError(null);
        return;
      }
      setImageSrc(null);
      setError(result.body.message ?? "Failed to render barcode.");
    });

    return () => {
      cancelled = true;
    };
  }, [productId, barcode, symbology]);

  if (!barcode?.trim()) return null;

  return (
    <div className="shrink-0">
      {imageSrc ? (
        <img src={imageSrc} alt={`Barcode ${barcode}`} className="max-h-[60px]" />
      ) : loading ? (
        <div className="px-3 py-2 rounded border border-dashed border-[#E2E8F0] text-[12px] text-[#94A3B8]">
          Loading barcode…
        </div>
      ) : (
        <div className="px-3 py-2 rounded border border-dashed border-[#FECACA] text-[12px] text-[#c80000]">
          {error ?? "Barcode preview unavailable."}
        </div>
      )}
    </div>
  );
}

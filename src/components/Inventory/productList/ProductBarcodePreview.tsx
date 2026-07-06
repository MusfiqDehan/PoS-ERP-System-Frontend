"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { previewLabel } from "@/lib/labels";

type ProductBarcodePreviewProps = {
  productId: string;
  barcode: string | null;
};

export default function ProductBarcodePreview({ productId, barcode }: ProductBarcodePreviewProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!productId || !barcode) {
      setImageSrc(null);
      return;
    }
    let cancelled = false;
    previewLabel(
      {
        entity_type: "product",
        entity_id: productId,
        code_type: "barcode",
      },
      getAccessToken(),
    ).then((result) => {
      if (cancelled) return;
      if (result.ok && result.body.data?.image_base64) {
        setImageSrc(`data:image/png;base64,${result.body.data.image_base64}`);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [productId, barcode]);

  if (!barcode) return null;

  return (
    <div className="shrink-0">
      {imageSrc ? (
        <img src={imageSrc} alt={`Barcode ${barcode}`} className="max-h-[60px]" />
      ) : (
        <div className="px-3 py-2 rounded border border-dashed border-[#E2E8F0] text-[12px] text-[#94A3B8]">
          Loading barcode…
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import {
  generateBarcodeWithImage,
  renderBarcodeImage,
  type BarcodeImageResult,
} from "@/lib/labels";
import type { BarcodeSymbology } from "@/lib/productFormUtils";

type UseProductBarcodeOptions = {
  excludeProductId?: string;
};

export function useProductBarcode({ excludeProductId }: UseProductBarcodeOptions = {}) {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [effectiveSymbology, setEffectiveSymbology] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applyResult = useCallback((result: BarcodeImageResult) => {
    setImageBase64(result.image_base64);
    setEffectiveSymbology(result.symbology);
  }, []);

  const renderPreview = useCallback(
    async (code: string, symbology: BarcodeSymbology) => {
      const trimmed = code.trim();
      if (!trimmed) {
        setImageBase64(null);
        setEffectiveSymbology(null);
        setError(null);
        return null;
      }
      setLoading(true);
      setError(null);
      const result = await renderBarcodeImage(
        {
          code: trimmed,
          symbology,
          exclude_product_id: excludeProductId,
        },
        getAccessToken(),
      );
      setLoading(false);
      if (result.ok && result.body.data) {
        applyResult(result.body.data);
        return result.body.data;
      }
      setError(result.body.message ?? "Failed to render barcode.");
      setImageBase64(null);
      return null;
    },
    [applyResult, excludeProductId],
  );

  const scheduleRenderPreview = useCallback(
    (code: string, symbology: BarcodeSymbology) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        void renderPreview(code, symbology);
      }, 400);
    },
    [renderPreview],
  );

  const generateBarcode = useCallback(async (symbology: BarcodeSymbology) => {
    setLoading(true);
    setError(null);
    const result = await generateBarcodeWithImage({ symbology }, getAccessToken());
    setLoading(false);
    if (result.ok && result.body.data) {
      applyResult(result.body.data);
      return result.body.data.barcode;
    }
    setError(result.body.message ?? "Failed to generate barcode.");
    return null;
  }, [applyResult]);

  const downloadBarcodeImage = useCallback((filename: string) => {
    if (!imageBase64) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageBase64}`;
    link.download = filename.endsWith(".png") ? filename : `${filename}.png`;
    link.click();
  }, [imageBase64]);

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  return {
    imageBase64,
    effectiveSymbology,
    loading,
    error,
    renderPreview,
    scheduleRenderPreview,
    generateBarcode,
    downloadBarcodeImage,
    setImageBase64,
    setError,
  };
}

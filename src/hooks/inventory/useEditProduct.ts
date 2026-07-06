"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAccessToken } from "@/lib/auth-session";
import { apiGet, type ApiResult } from "@/lib/api";
import { updateProduct, type Product } from "@/lib/inventory";
import { generateSkuCandidate, type BarcodeSymbology } from "@/lib/productFormUtils";
import { useProductImageDrafts } from "@/hooks/inventory/useProductImageDrafts";
import { useProductFormOptions } from "@/hooks/inventory/useProductFormOptions";
import { useProductBarcode } from "@/hooks/inventory/useProductBarcode";
import { buildProductPayload, mapProductToFormValues } from "@/hooks/inventory/buildProductPayload";
import {
  defaultProductFormValues,
  type ProductFormValues,
  type ProductVariantFormRow,
} from "@/hooks/inventory/productFormTypes";

async function fetchProduct(id: string, token?: string): Promise<ApiResult<Product>> {
  return apiGet<Product>(`inventory/products/${id}/`, token);
}

export function useEditProduct(onSuccess: () => void) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") ?? "";

  const [values, setValues] = useState<ProductFormValues>(defaultProductFormValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const options = useProductFormOptions();
  const barcode = useProductBarcode({ excludeProductId: productId || undefined });
  const { images, addImageFiles, removeImage, uploadAll, setFromUrls } = useProductImageDrafts();

  useEffect(() => {
    if (!productId || options.loadingOptions) {
      if (!productId) setLoadingProduct(false);
      return;
    }
    const token = getAccessToken();
    fetchProduct(productId, token).then((r) => {
      if (r.ok && r.body.data) {
        const allCategories = [...options.categories, ...options.subCategories];
        const mapped = mapProductToFormValues(r.body.data, allCategories);
        setValues(mapped);
        setFromUrls(Array.isArray(r.body.data.images) ? r.body.data.images : []);
        if (mapped.barcode.trim()) {
          void barcode.renderPreview(mapped.barcode, mapped.barcodeSymbology as BarcodeSymbology);
        }
      }
      setLoadingProduct(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, options.loadingOptions, options.categories, options.subCategories, setFromUrls]);

  const setField = useCallback(<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setName = useCallback((name: string) => {
    setValues((prev) => ({ ...prev, name }));
  }, []);

  const generateSku = useCallback(() => {
    setField("sku", generateSkuCandidate());
  }, [setField]);

  const handleBarcodeChange = useCallback(
    (value: string) => {
      setField("barcode", value);
      barcode.scheduleRenderPreview(value, values.barcodeSymbology as BarcodeSymbology);
    },
    [barcode, setField, values.barcodeSymbology],
  );

  const handleBarcodeSymbologyChange = useCallback(
    (symbology: string) => {
      setField("barcodeSymbology", symbology as ProductFormValues["barcodeSymbology"]);
      if (values.barcode.trim()) {
        barcode.scheduleRenderPreview(values.barcode, symbology as BarcodeSymbology);
      }
    },
    [barcode, setField, values.barcode],
  );

  const generateBarcode = useCallback(async () => {
    const code = await barcode.generateBarcode(values.barcodeSymbology as BarcodeSymbology);
    if (code) setField("barcode", code);
  }, [barcode, setField, values.barcodeSymbology]);

  const downloadBarcodeImage = useCallback(() => {
    const filename = values.barcode.trim() || values.sku.trim() || "product-barcode";
    barcode.downloadBarcodeImage(filename);
  }, [barcode, values.barcode, values.sku]);

  const addVariantRow = useCallback((attributeName: string, attributeValue: string) => {
    setValues((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          sku: generateSkuCandidate("VAR"),
          barcode: "",
          barcode_symbology: prev.barcodeSymbology,
          price: prev.price || "0",
          cost: prev.cost || "",
          attributes: { [attributeName]: attributeValue },
        },
      ],
    }));
  }, []);

  const updateVariantRow = useCallback((index: number, patch: Partial<ProductVariantFormRow>) => {
    setValues((prev) => ({
      ...prev,
      variants: prev.variants.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    }));
  }, []);

  const removeVariantRow = useCallback((index: number) => {
    setValues((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const categoryId = values.subCategoryId || values.categoryId;
    if (
      !productId ||
      !values.name.trim() ||
      !values.slug.trim() ||
      !values.sku.trim() ||
      !categoryId ||
      !values.unitId
    ) {
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const imageUrls = images.length > 0 ? await uploadAll() : [];
      const payload = buildProductPayload(values);
      payload.images = imageUrls;

      const result = await updateProduct(productId, payload, getAccessToken());
      setSubmitting(false);
      if (result.ok) {
        onSuccess();
      } else {
        setSubmitError(result.body.message ?? "Failed to update product.");
      }
    } catch (err) {
      setSubmitting(false);
      setSubmitError(err instanceof Error ? err.message : "Failed to upload images.");
    }
  }, [productId, values, images, uploadAll, onSuccess]);

  return {
    productId,
    values,
    setField,
    setName,
    generateSku,
    generateBarcode,
    handleBarcodeChange,
    handleBarcodeSymbologyChange,
    downloadBarcodeImage,
    barcodePreview: barcode,
    addVariantRow,
    updateVariantRow,
    removeVariantRow,
    images,
    addImageFiles,
    removeImage,
    submitting,
    submitError,
    handleSubmit,
    loadingProduct,
    ...options,
  };
}

export type UseEditProductReturn = ReturnType<typeof useEditProduct>;

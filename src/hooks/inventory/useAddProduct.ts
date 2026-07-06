"use client";

import { useCallback, useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { createProduct } from "@/lib/inventory";
import { assignProductBarcodes } from "@/lib/labels";
import { generateSkuCandidate, slugifyName, type BarcodeSymbology } from "@/lib/productFormUtils";
import { useProductImageDrafts } from "@/hooks/inventory/useProductImageDrafts";
import { useProductFormOptions } from "@/hooks/inventory/useProductFormOptions";
import { useProductBarcode } from "@/hooks/inventory/useProductBarcode";
import { buildProductPayload } from "@/hooks/inventory/buildProductPayload";
import {
  defaultProductFormValues,
  type ProductFormValues,
  type ProductVariantFormRow,
} from "@/hooks/inventory/productFormTypes";

export function useAddProduct(onSuccess: () => void) {
  const [values, setValues] = useState<ProductFormValues>(defaultProductFormValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const options = useProductFormOptions();
  const barcode = useProductBarcode();
  const { images, addImageFiles, removeImage, uploadAll } = useProductImageDrafts();

  const setField = useCallback(<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setName = useCallback((name: string) => {
    setValues((prev) => ({
      ...prev,
      name,
      slug: prev.slug || slugifyName(name),
    }));
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
      payload.images = imageUrls.length > 0 ? imageUrls : undefined;

      const result = await createProduct(payload, getAccessToken());
      if (!result.ok) {
        setSubmitError(result.body.message ?? "Failed to create product.");
        setSubmitting(false);
        return;
      }

      const productId = result.body.data?.id;
      if (productId && !values.barcode.trim()) {
        await assignProductBarcodes([productId], getAccessToken());
      }

      setSubmitting(false);
      onSuccess();
    } catch (err) {
      setSubmitting(false);
      setSubmitError(err instanceof Error ? err.message : "Failed to upload images.");
    }
  }, [values, images, uploadAll, onSuccess]);

  return {
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
    ...options,
  };
}

export type UseAddProductReturn = ReturnType<typeof useAddProduct>;

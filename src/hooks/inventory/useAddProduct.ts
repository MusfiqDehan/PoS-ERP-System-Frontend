"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchCategories,
  fetchBrands,
  fetchUnits,
  createProduct,
  type Category,
  type Brand,
  type Unit,
  type CreateProductPayload,
} from "@/lib/inventory";

export function useAddProduct(onSuccess: () => void) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [minQtyAlert, setMinQtyAlert] = useState("10");
  const [sellingType, setSellingType] = useState("");
  const [taxType, setTaxType] = useState("exclusive");
  const [productType, setProductType] = useState("single");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    Promise.all([
      fetchCategories(token),
      fetchBrands(token),
      fetchUnits(token),
    ]).then(([c, b, u]) => {
      if (c.ok && c.body.data) setCategories(Array.isArray(c.body.data) ? c.body.data : []);
      if (b.ok && b.body.data) setBrands(Array.isArray(b.body.data) ? b.body.data : []);
      if (u.ok && u.body.data) setUnits(Array.isArray(u.body.data) ? u.body.data : []);
      setLoadingOptions(false);
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim() || !sku.trim() || !categoryId || !brandId || !unitId) return;
    setSubmitting(true);
    setSubmitError(null);
    const payload: CreateProductPayload = {
      name: name.trim(),
      slug: slug.trim(),
      sku: sku.trim(),
      category: categoryId,
      brand: brandId,
      unit: unitId,
      price: price || undefined,
      cost: cost || undefined,
      min_qty_alert: minQtyAlert ? Number(minQtyAlert) : undefined,
      product_type: productType,
      selling_type: sellingType || undefined,
      tax_type: taxType || undefined,
    };
    const result = await createProduct(payload, getAccessToken());
    setSubmitting(false);
    if (result.ok) {
      onSuccess();
    } else {
      setSubmitError(result.body.message ?? "Failed to create product.");
    }
  }, [name, slug, sku, categoryId, brandId, unitId, price, cost, minQtyAlert, productType, sellingType, taxType, onSuccess]);

  return {
    name, setName, slug, setSlug, sku, setSku,
    categoryId, setCategoryId, brandId, setBrandId, unitId, setUnitId,
    price, setPrice, cost, setCost, minQtyAlert, setMinQtyAlert,
    sellingType, setSellingType, taxType, setTaxType, productType, setProductType,
    submitting, submitError, handleSubmit,
    categories, brands, units, loadingOptions,
  };
}

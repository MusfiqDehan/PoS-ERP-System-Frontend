"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchCategories,
  fetchBrands,
  fetchUnits,
  updateProduct,
  type Category,
  type Brand,
  type Unit,
  type CreateProductPayload,
} from "@/lib/inventory";
import { apiGet, type ApiResult } from "@/lib/api";
import type { Product } from "@/lib/inventory";

async function fetchProduct(id: string, token?: string): Promise<ApiResult<Product>> {
  return apiGet<Product>(`inventory/products/${id}/`, token);
}

export function useEditProduct(onSuccess: () => void) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") ?? "";

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
  const [loadingProduct, setLoadingProduct] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    const loaders: Promise<unknown>[] = [
      fetchCategories(token).then(c => { if (c.ok && c.body.data) setCategories(Array.isArray(c.body.data) ? c.body.data : []); }),
      fetchBrands(token).then(b => { if (b.ok && b.body.data) setBrands(Array.isArray(b.body.data) ? b.body.data : []); }),
      fetchUnits(token).then(u => { if (u.ok && u.body.data) setUnits(Array.isArray(u.body.data) ? u.body.data : []); }),
    ];
    if (productId) {
      loaders.push(
        fetchProduct(productId, token).then(r => {
          if (r.ok && r.body.data) {
            const p = r.body.data;
            setName(p.name);
            setSlug(p.slug);
            setSku(p.sku);
            setCategoryId(p.category);
            setBrandId(p.brand);
            setUnitId(p.unit);
            setPrice(p.price ?? "");
            setCost(p.cost ?? "");
            setMinQtyAlert(String(p.min_qty_alert ?? 10));
            setSellingType(p.selling_type ?? "");
            setTaxType(p.tax_type ?? "exclusive");
            setProductType(p.product_type ?? "single");
          }
          setLoadingProduct(false);
        })
      );
    } else {
      setLoadingProduct(false);
    }
    Promise.all(loaders).then(() => setLoadingOptions(false));
  }, [productId]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !name.trim() || !slug.trim() || !sku.trim() || !categoryId || !brandId || !unitId) return;
    setSubmitting(true);
    setSubmitError(null);
    const payload: Partial<CreateProductPayload> = {
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
    const result = await updateProduct(productId, payload, getAccessToken());
    setSubmitting(false);
    if (result.ok) onSuccess();
    else setSubmitError(result.body.message ?? "Failed to update product.");
  }, [productId, name, slug, sku, categoryId, brandId, unitId, price, cost, minQtyAlert, productType, sellingType, taxType, onSuccess]);

  return {
    productId, name, setName, slug, setSlug, sku, setSku,
    categoryId, setCategoryId, brandId, setBrandId, unitId, setUnitId,
    price, setPrice, cost, setCost, minQtyAlert, setMinQtyAlert,
    sellingType, setSellingType, taxType, setTaxType, productType, setProductType,
    submitting, submitError, handleSubmit,
    categories, brands, units, loadingOptions, loadingProduct,
  };
}

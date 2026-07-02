"use client";
/* eslint-disable @next/next/no-img-element */

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAccessToken } from "@/lib/auth-session";
import { apiGet, type ApiResult } from "@/lib/api";
import {
  fetchCategories,
  fetchBrands,
  fetchUnits,
  type Product,
  type Category,
  type Brand,
  type Unit,
} from "@/lib/inventory";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import CommonFooter from "@/core/common/footer/commonFooter";

async function fetchProduct(id: string, token?: string): Promise<ApiResult<Product>> {
  return apiGet<Product>(`inventory/products/${id}/`, token);
}

function resolveName(id: string, map: Map<string, string>): string {
  return map.get(id) ?? id.slice(0, 8);
}

function DetailsContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") ?? "";
  const [product, setProduct] = useState<Product | null>(null);
  const [catMap, setCatMap] = useState<Map<string, string>>(new Map());
  const [brandMap, setBrandMap] = useState<Map<string, string>>(new Map());
  const [unitMap, setUnitMap] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) { setError("No product ID provided."); setLoading(false); return; }
    const token = getAccessToken();
    Promise.all([
      fetchProduct(productId, token),
      fetchCategories(token),
      fetchBrands(token),
      fetchUnits(token),
    ]).then(([p, c, b, u]) => {
      if (p.ok && p.body.data) setProduct(p.body.data);
      else setError(p.body.message ?? "Failed to load product.");
      if (c.ok && c.body.data) setCatMap(new Map(c.body.data.map(x => [x.id, x.name])));
      if (b.ok && b.body.data) setBrandMap(new Map(b.body.data.map(x => [x.id, x.name])));
      if (u.ok && u.body.data) setUnitMap(new Map(u.body.data.map(x => [x.id, x.name])));
      setLoading(false);
    });
  }, [productId]);

  if (loading) return <div className="py-10 text-center text-[#646B72]">Loading product details...</div>;
  if (error) return <div className="py-10 text-center text-[#dc3545]">{error}</div>;
  if (!product) return <div className="py-10 text-center text-[#646B72]">Product not found.</div>;

  const images: string[] = Array.isArray(product.images) ? product.images : [];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-[1.5rem]">
          <div>
            <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Product Details</h4>
            <p className="m-0 text-[14px] font-medium text-[#646B72]">Full details of a product</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`${all_routes.editproduct}?id=${product.id}`} className="px-3 py-2 rounded-[6px] border border-[#e7e7e7] text-[#646B72] text-[13px] font-medium hover:bg-[#f6f6f6] transition-colors">
              <i className="ti ti-edit me-1" />Edit
            </Link>
            <Link href={all_routes.productlist} className="px-3 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[13px] font-medium hover:bg-[#089b7c] transition-colors">
              <i className="ti ti-arrow-left me-1" />Back to List
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 sm:p-5">
              <ul className="divide-y divide-[#f1f1f1]">
                {[
                  ["Product Name", product.name],
                  ["SKU", product.sku],
                  ["Barcode", product.barcode ?? "—"],
                  ["Slug", product.slug],
                  ["Category", resolveName(product.category, catMap)],
                  ["Brand", resolveName(product.brand, brandMap)],
                  ["Unit", resolveName(product.unit, unitMap)],
                  ["Product Type", product.product_type ?? "—"],
                  ["Selling Type", product.selling_type ?? "—"],
                  ["Tax Type", product.tax_type ?? "—"],
                  ["Price", product.price ?? "—"],
                  ["Cost", product.cost ?? "—"],
                  ["Min Qty Alert", product.min_qty_alert ? String(product.min_qty_alert) : "—"],
                  ["Manufactured Date", product.manufactured_at?.slice(0, 10) ?? "—"],
                  ["Expiry Date", product.expires_at?.slice(0, 10) ?? "—"],
                  ["Status", product.is_active ? "Active" : "Inactive"],
                  ["Description", product.description || "—"],
                ].map(([label, value]) => (
                  <li key={label} className="grid grid-cols-1 sm:grid-cols-3 gap-1 py-2.5">
                    <span className="text-[14px] font-semibold text-[#212B36]">{label}</span>
                    <span className="sm:col-span-2 text-[14px] text-[#646B72]">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 sm:p-5">
              <h5 className="mb-3 text-[15px] font-bold text-[#212B36]">Product Images</h5>
              {images.length === 0 ? (
                <p className="text-[14px] text-[#646B72]">No images uploaded.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {images.map((src, i) => (
                    <div key={i} className="border border-[#f1f1f1] rounded-md overflow-hidden">
                      <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-32 object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
}

export default function ProductDetails() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={<div className="py-10 text-center text-[#646B72]">Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
}

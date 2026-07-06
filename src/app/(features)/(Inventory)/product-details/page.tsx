"use client";
/* eslint-disable @next/next/no-img-element */

import { Suspense, useEffect, useState } from "react";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { useSearchParams } from "next/navigation";
import { getAccessToken } from "@/lib/auth-session";
import { apiGet, extractListItems, type ApiResult } from "@/lib/api";
import {
  fetchCategories,
  fetchBrands,
  fetchUnits,
  type Product,
  type Category,
  type Brand,
  type Unit,
} from "@/lib/inventory";
import { fetchBranches, type Branch } from "@/lib/branches";
import { fetchWarehouses, type Warehouse } from "@/lib/warehouses";
import { all_routes } from "@/data/all_routes";
import Link from "next/link";
import CommonFooter from "@/core/common/footer/commonFooter";
import { resolveProductImageUrl } from "@/lib/media";
import ProductBarcodePreview from "@/components/Inventory/productList/ProductBarcodePreview";

async function fetchProduct(id: string, token?: string): Promise<ApiResult<Product>> {
  return apiGet<Product>(`inventory/products/${id}/`, token);
}

function resolveName(id: string | null | undefined, map: Map<string, string>): string {
  if (!id) return "—";
  return map.get(id) ?? id.slice(0, 8);
}

function DetailsContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") ?? "";
  const [product, setProduct] = useState<Product | null>(null);
  const [catMap, setCatMap] = useState<Map<string, string>>(new Map());
  const [brandMap, setBrandMap] = useState<Map<string, string>>(new Map());
  const [unitMap, setUnitMap] = useState<Map<string, string>>(new Map());
  const [branchMap, setBranchMap] = useState<Map<string, string>>(new Map());
  const [warehouseMap, setWarehouseMap] = useState<Map<string, string>>(new Map());
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
      fetchBranches(token),
      fetchWarehouses(token),
    ]).then(([p, c, b, u, br, w]) => {
      if (p.ok && p.body.data) setProduct(p.body.data);
      else setError(p.body.message ?? "Failed to load product.");
      if (c.ok && c.body.data) {
        setCatMap(new Map(extractListItems<Category>(c.body.data).map((x) => [x.id, x.name])));
      }
      if (b.ok && b.body.data) {
        setBrandMap(new Map(extractListItems<Brand>(b.body.data).map((x) => [x.id, x.name])));
      }
      if (u.ok && u.body.data) {
        setUnitMap(new Map(extractListItems<Unit>(u.body.data).map((x) => [x.id, x.name])));
      }
      if (br.ok && br.body.data) {
        const branches = Array.isArray(br.body.data) ? br.body.data : extractListItems<Branch>(br.body.data);
        setBranchMap(new Map(branches.map((x) => [x.id, x.name])));
      }
      if (w.ok && w.body.data) {
        setWarehouseMap(new Map(extractListItems<Warehouse>(w.body.data).map((x) => [x.id, x.name])));
      }
      setLoading(false);
    });
  }, [productId]);

  if (loading) return <div className="py-10 text-center text-[#646B72]">Loading product details...</div>;
  if (error) return <div className="py-10 text-center text-[#dc3545]">{error}</div>;
  if (!product) return <div className="py-10 text-center text-[#646B72]">Product not found.</div>;

  const images: string[] = Array.isArray(product.images) ? product.images : [];
  const discountLabel = product.discount_type
    ? `${product.discount_value} (${product.discount_type})`
    : "—";

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
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-[#f1f1f1] pb-4 mb-4 gap-4">
                <div>
                  <p className="m-0 text-[12px] uppercase tracking-wide text-[#94A3B8] font-semibold">Barcode</p>
                  <p className="m-0 mt-1 text-[18px] font-bold text-[#212B36] font-mono">{product.barcode || "—"}</p>
                  <p className="m-0 mt-2 text-[13px] text-[#646B72]">
                    Mfg: {product.manufactured_at?.slice(0, 10) ?? "—"} · Exp: {product.expires_at?.slice(0, 10) ?? "—"}
                  </p>
                </div>
                <ProductBarcodePreview productId={product.id} barcode={product.barcode} />
              </div>
              <ul className="divide-y divide-[#f1f1f1]">
                {[
                  ["Product Name", product.name],
                  ["SKU", product.sku],
                  ["Barcode Symbology", product.barcode_symbology ?? "—"],
                  ["Slug", product.slug],
                  ["Branch", resolveName(product.branch, branchMap)],
                  ["Warehouse", resolveName(product.warehouse, warehouseMap)],
                  ["Category", resolveName(product.category, catMap)],
                  ["Brand", resolveName(product.brand, brandMap)],
                  ["Unit", resolveName(product.unit, unitMap)],
                  ["Manufacturer", product.manufacturer || "—"],
                  ["Product Type", product.product_type ?? "—"],
                  ["Selling Type", product.selling_type ?? "—"],
                  ["Tax Type", product.tax_type ?? "—"],
                  ["Price", product.price ?? "—"],
                  ["Cost", product.cost ?? "—"],
                  ["Discount", discountLabel],
                  ["Min Qty Alert", product.min_qty_alert ? String(product.min_qty_alert) : "—"],
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
                      <img
                        src={resolveProductImageUrl(src)}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-32 object-cover"
                      />
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
    <PermissionGuard featureKey="products">
      <Suspense fallback={<div className="py-10 text-center text-[#646B72]">Loading...</div>}>
        <DetailsContent />
      </Suspense>
    </PermissionGuard>
  );
}

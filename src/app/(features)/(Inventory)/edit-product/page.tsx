"use client";

import { Suspense, useEffect, useState } from "react";
import { all_routes } from "@/data/all_routes";
import FormActions from "@/components/Inventory/add-product/FormActions";
import PageHeader from "@/components/Inventory/edit-product/PageHeader";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useEditProduct } from "@/hooks/inventory/useEditProduct";
import { useRouter } from "next/navigation";

const ic = "w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#0F172A] bg-white focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e]/20 transition-all";
const lc = "block text-[13px] font-semibold text-[#0F172A] mb-1.5";
const pillBase = "px-5 py-2 rounded-full border text-[13px] font-semibold cursor-pointer transition-all [&.active]:bg-[#0ac79e] [&.active]:text-white [&.active]:border-[#0ac79e] [&.active]:shadow-sm [&.active]:shadow-[#0ac79e]/25";

function EditProductForm() {
  const router = useRouter();
  const handleSuccess = () => router.push(all_routes.productlist);
  const f = useEditProduct(handleSuccess);

  if (f.loadingOptions || f.loadingProduct) {
    return <div className="py-10 text-center text-[#646B72]">Loading product...</div>;
  }

  return (
    <form onSubmit={f.handleSubmit} className="space-y-5">
      {f.submitError && <div className="p-3 rounded-lg bg-[#fff0f0] text-[#c80000] text-[13px]">{f.submitError}</div>}

      <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
          <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center"><i className="ti ti-info-circle text-[16px] text-[#0ac79e]" /></div>
          <div><h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Product Information</h5><p className="m-0 text-[12px] text-[#94A3B8]">Edit basic details</p></div>
        </div>
        <div className="px-5 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div><label className={lc}>Product Name <span className="text-[#EF4444]">*</span></label><input className={ic} value={f.name} onChange={e => f.setName(e.target.value)} required /></div>
            <div><label className={lc}>Slug <span className="text-[#EF4444]">*</span></label><input className={ic} value={f.slug} onChange={e => f.setSlug(e.target.value)} required /></div>
            <div><label className={lc}>SKU <span className="text-[#EF4444]">*</span></label><input className={ic} value={f.sku} onChange={e => f.setSku(e.target.value)} required /></div>
            <div><label className={lc}>Category <span className="text-[#EF4444]">*</span></label><select className={ic} value={f.categoryId} onChange={e => f.setCategoryId(e.target.value)} required><option value="">Choose</option>{f.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div><label className={lc}>Brand <span className="text-[#EF4444]">*</span></label><select className={ic} value={f.brandId} onChange={e => f.setBrandId(e.target.value)} required><option value="">Choose</option>{f.brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
            <div><label className={lc}>Unit <span className="text-[#EF4444]">*</span></label><select className={ic} value={f.unitId} onChange={e => f.setUnitId(e.target.value)} required><option value="">Choose</option>{f.units.map(u => <option key={u.id} value={u.id}>{u.name} ({u.short_name})</option>)}</select></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
          <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center"><i className="ti ti-lifebuoy text-[16px] text-[#0ac79e]" /></div>
          <div><h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Pricing & Stocks</h5></div>
        </div>
        <div className="px-5 py-5">
          <div className="mb-5">
            <label className={lc}>Product Type</label>
            <div className="flex flex-wrap gap-3">
              <button type="button" className={`${pillBase} ${f.productType === "single" ? "active" : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"}`} onClick={() => f.setProductType("single")}>Single Product</button>
              <button type="button" className={`${pillBase} ${f.productType === "variable" ? "active" : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"}`} onClick={() => f.setProductType("variable")}>Variable Product</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div><label className={lc}>Price</label><input className={ic} type="number" step="0.01" value={f.price} onChange={e => f.setPrice(e.target.value)} /></div>
            <div><label className={lc}>Cost</label><input className={ic} type="number" step="0.01" value={f.cost} onChange={e => f.setCost(e.target.value)} /></div>
            <div><label className={lc}>Tax Type</label><select className={ic} value={f.taxType} onChange={e => f.setTaxType(e.target.value)}><option value="exclusive">Exclusive</option><option value="inclusive">Inclusive</option></select></div>
            <div><label className={lc}>Quantity Alert</label><input className={ic} type="number" value={f.minQtyAlert} onChange={e => f.setMinQtyAlert(e.target.value)} /></div>
          </div>
        </div>
      </div>

      <FormActions submitting={f.submitting} />
    </form>
  );
}

export default function EditProduct() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader />
        <Suspense fallback={<div className="py-10 text-center text-[#646B72]">Loading...</div>}>
          <EditProductForm />
        </Suspense>
      </div>
      <CommonFooter />
    </div>
  );
}

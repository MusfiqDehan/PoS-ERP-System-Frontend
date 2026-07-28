"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CommonFooter from "@/core/common/footer/commonFooter";
import PageHeader from "@/components/Inventory/edit-product/PageHeader";
import ProductForm from "@/components/Inventory/add-product/ProductForm";
import { useEditProduct } from "@/hooks/inventory/useEditProduct";
import { all_routes } from "@/data/all_routes";

function EditProductFormInner() {
  const router = useRouter();
  const handleSuccess = () => router.push(all_routes.productlist);
  const form = useEditProduct(handleSuccess);

  if (form.loadingOptions || form.loadingProduct) {
    return <div className="py-10 text-center text-[#646B72]">Loading product...</div>;
  }

  return <ProductForm form={form} submitLabel="Save Product" />;
}

export default function EditProduct() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <PermissionGuard featureKey="products" requiredLevel="edit">
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <Suspense fallback={<div className="py-10 text-center text-[#646B72]">Loading...</div>}>
            <EditProductFormInner />
          </Suspense>
        </div>
        <CommonFooter />
      </div>
    </PermissionGuard>
  );
}

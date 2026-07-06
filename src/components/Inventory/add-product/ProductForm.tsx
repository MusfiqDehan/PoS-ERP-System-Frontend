"use client";

import { useMemo, useState } from "react";
import type { UseAddProductReturn } from "@/hooks/inventory/useAddProduct";
import type { UseEditProductReturn } from "@/hooks/inventory/useEditProduct";
import AddCategoryModal from "./AddCategoryModal";
import CustomFieldsSection from "./CustomFieldsSection";
import FormActions from "./FormActions";
import ImagesSection from "./ImagesSection";
import PricingStocksSection from "./PricingStocksSection";
import ProductInformationSection from "./ProductInformationSection";

type ProductFormHook = UseAddProductReturn | UseEditProductReturn;

type ProductFormProps = {
  form: ProductFormHook;
  submitLabel?: string;
};

export default function ProductForm({ form, submitLabel = "Add Product" }: ProductFormProps) {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { values } = form;

  const subCategoryOptions = useMemo(
    () => form.subCategoryOptionsFor(values.categoryId),
    [form, values.categoryId],
  );

  const warrantySelectOptions = useMemo(
    () => [{ value: "", label: "Choose" }, ...form.warrantyOptions.filter((o) => o.value !== "")],
    [form.warrantyOptions],
  );

  const handleCategoryCreated = async (categoryId: string) => {
    await form.reloadCategories();
    form.setField("categoryId", categoryId);
  };

  return (
    <>
      <form onSubmit={form.handleSubmit} className="space-y-5">
        {form.submitError && (
          <div className="p-3 rounded-lg bg-[#fff0f0] text-[#c80000] text-[13px]">{form.submitError}</div>
        )}

        <ProductInformationSection
          branchOptions={form.branchOptions}
          warehouseOptions={form.warehouseOptions}
          categoryOptions={form.categoryOptions}
          subCategoryOptions={subCategoryOptions}
          brandOptions={form.brandOptions}
          unitOptions={form.unitOptions}
          branchId={values.branchId}
          warehouseId={values.warehouseId}
          name={values.name}
          slug={values.slug}
          sku={values.sku}
          sellingType={values.sellingType}
          categoryId={values.categoryId}
          subCategoryId={values.subCategoryId}
          brandId={values.brandId}
          unitId={values.unitId}
          barcodeSymbology={values.barcodeSymbology}
          barcode={values.barcode}
          description={values.description}
          onBranchChange={(v) => form.setField("branchId", v)}
          onWarehouseChange={(v) => form.setField("warehouseId", v)}
          onNameChange={form.setName}
          onSlugChange={(v) => form.setField("slug", v)}
          onSkuChange={(v) => form.setField("sku", v)}
          onSellingTypeChange={(v) => form.setField("sellingType", v)}
          onCategoryChange={(v) => {
            form.setField("categoryId", v);
            form.setField("subCategoryId", "");
          }}
          onSubCategoryChange={(v) => form.setField("subCategoryId", v)}
          onBrandChange={(v) => form.setField("brandId", v)}
          onUnitChange={(v) => form.setField("unitId", v)}
          onBarcodeSymbologyChange={form.handleBarcodeSymbologyChange}
          onBarcodeChange={form.handleBarcodeChange}
          onGenerateSku={form.generateSku}
          onDescriptionChange={(v) => form.setField("description", v)}
          onGenerateBarcode={() => void form.generateBarcode()}
          onDownloadBarcode={form.downloadBarcodeImage}
          barcodeImageBase64={form.barcodePreview.imageBase64}
          barcodeEffectiveSymbology={form.barcodePreview.effectiveSymbology}
          barcodeLoading={form.barcodePreview.loading}
          barcodeError={form.barcodePreview.error}
          onAddCategoryClick={() => setCategoryModalOpen(true)}
          disabled={form.submitting}
        />

        <PricingStocksSection
          productType={values.productType}
          price={values.price}
          cost={values.cost}
          taxType={values.taxType}
          discountType={values.discountType}
          discountValue={values.discountValue}
          minQtyAlert={values.minQtyAlert}
          variants={values.variants}
          variantAttributes={form.variantAttributes}
          onProductTypeChange={(v) => form.setField("productType", v)}
          onPriceChange={(v) => form.setField("price", v)}
          onCostChange={(v) => form.setField("cost", v)}
          onTaxTypeChange={(v) => form.setField("taxType", v)}
          onDiscountTypeChange={(v) => form.setField("discountType", v)}
          onDiscountValueChange={(v) => form.setField("discountValue", v)}
          onMinQtyAlertChange={(v) => form.setField("minQtyAlert", v)}
          onAddVariantRow={form.addVariantRow}
          onUpdateVariantRow={form.updateVariantRow}
          onRemoveVariantRow={form.removeVariantRow}
          disabled={form.submitting}
        />

        <ImagesSection
          images={form.images}
          onAddFiles={form.addImageFiles}
          onRemove={form.removeImage}
          disabled={form.submitting}
        />

        <CustomFieldsSection
          warrantyOptions={warrantySelectOptions}
          warrantyId={values.warrantyId}
          manufacturer={values.manufacturer}
          manufacturedAt={values.manufacturedAt}
          expiresAt={values.expiresAt}
          onWarrantyChange={(v) => form.setField("warrantyId", v)}
          onManufacturerChange={(v) => form.setField("manufacturer", v)}
          onManufacturedAtChange={(v) => form.setField("manufacturedAt", v)}
          onExpiresAtChange={(v) => form.setField("expiresAt", v)}
          disabled={form.submitting}
        />

        <FormActions submitting={form.submitting} submitLabel={submitLabel} />
      </form>

      <AddCategoryModal
        open={categoryModalOpen}
        parentCategoryId={values.categoryId || undefined}
        onClose={() => setCategoryModalOpen(false)}
        onCreated={handleCategoryCreated}
      />
    </>
  );
}

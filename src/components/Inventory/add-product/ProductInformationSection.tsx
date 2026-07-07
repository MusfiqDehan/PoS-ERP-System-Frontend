"use client";

import FormField from "@/core/common/form/FormField";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import { PlusCircle } from "react-feather";
import type { SelectOption } from "@/core/common/form/types";
import {
  barcodeSymbolOptions,
  sellingTypeOptions,
} from "./selectOptions";
import BarcodePreviewSection from "./BarcodePreviewSection";

export type ProductInformationSectionProps = {
  branchOptions: SelectOption[];
  warehouseOptions: SelectOption[];
  categoryOptions: SelectOption[];
  subCategoryOptions: SelectOption[];
  brandOptions: SelectOption[];
  unitOptions: SelectOption[];
  branchId: string;
  warehouseId: string;
  name: string;
  slug: string;
  sku: string;
  sellingType: string;
  categoryId: string;
  subCategoryId: string;
  brandId: string;
  unitId: string;
  barcodeSymbology: string;
  barcode: string;
  description: string;
  barcodeImageBase64: string | null;
  barcodeEffectiveSymbology: string | null;
  barcodeLoading: boolean;
  barcodeError: string | null;
  onBranchChange: (value: string) => void;
  onWarehouseChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onSkuChange: (value: string) => void;
  onSellingTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onBarcodeSymbologyChange: (value: string) => void;
  onBarcodeChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onGenerateSku: () => void;
  onGenerateBarcode: () => void;
  onDownloadBarcode: () => void;
  onAddCategoryClick: () => void;
  disabled?: boolean;
};

export default function ProductInformationSection({
  branchOptions,
  warehouseOptions,
  categoryOptions,
  subCategoryOptions,
  brandOptions,
  unitOptions,
  branchId,
  warehouseId,
  name,
  slug,
  sku,
  sellingType,
  categoryId,
  subCategoryId,
  brandId,
  unitId,
  barcodeSymbology,
  barcode,
  description,
  barcodeImageBase64,
  barcodeEffectiveSymbology,
  barcodeLoading,
  barcodeError,
  onBranchChange,
  onWarehouseChange,
  onNameChange,
  onSlugChange,
  onSkuChange,
  onSellingTypeChange,
  onCategoryChange,
  onSubCategoryChange,
  onBrandChange,
  onUnitChange,
  onBarcodeSymbologyChange,
  onBarcodeChange,
  onDescriptionChange,
  onGenerateSku,
  onGenerateBarcode,
  onDownloadBarcode,
  onAddCategoryClick,
  disabled,
}: ProductInformationSectionProps) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center">
          <i className="ti ti-info-circle text-[16px] text-[#0ac79e]" />
        </div>
        <div>
          <h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Product Information</h5>
          <p className="m-0 text-[12px] text-[#94A3B8]">Basic details about your product</p>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <SelectField
            label="Branch"
            required
            options={branchOptions}
            value={branchOptions.find((o) => o.value === branchId) ?? null}
            onChange={(opt) => onBranchChange(String(opt?.value ?? ""))}
            isDisabled={disabled}
          />
          <SelectField
            label="Warehouse"
            required
            options={warehouseOptions}
            value={warehouseOptions.find((o) => o.value === warehouseId) ?? null}
            onChange={(opt) => onWarehouseChange(String(opt?.value ?? ""))}
            isDisabled={disabled}
          />
          <TextField label="Product Name" required value={name} onChange={(e) => onNameChange(e.target.value)} disabled={disabled} />
          <TextField label="Slug" required value={slug} onChange={(e) => onSlugChange(e.target.value)} disabled={disabled} />
          <TextField
            label="SKU"
            required
            value={sku}
            onChange={(e) => onSkuChange(e.target.value)}
            inputClassName="list"
            action={{ label: "Generate", type: "button", onClick: onGenerateSku }}
            disabled={disabled}
          />
          <SelectField
            label="Selling Type"
            required
            options={sellingTypeOptions}
            value={sellingTypeOptions.find((o) => o.value === sellingType) ?? null}
            onChange={(opt) => onSellingTypeChange(String(opt?.value ?? ""))}
            isDisabled={disabled}
          />
          <SelectField
            label="Category"
            required
            options={categoryOptions}
            value={categoryOptions.find((o) => o.value === categoryId) ?? null}
            onChange={(opt) => onCategoryChange(String(opt?.value ?? ""))}
            labelWrapperClassName="flex items-center justify-between"
            labelAddon={
              <button
                type="button"
                onClick={onAddCategoryClick}
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[#0ac79e] hover:underline"
              >
                <PlusCircle size={14} />
                <span>Add New</span>
              </button>
            }
            isDisabled={disabled}
          />
          <SelectField
            label="Sub Category"
            options={subCategoryOptions}
            value={subCategoryOptions.find((o) => o.value === subCategoryId) ?? null}
            onChange={(opt) => onSubCategoryChange(String(opt?.value ?? ""))}
            isDisabled={disabled || !categoryId}
          />
          <SelectField
            label="Brand"
            options={brandOptions}
            value={brandOptions.find((o) => o.value === brandId) ?? null}
            onChange={(opt) => onBrandChange(String(opt?.value ?? ""))}
            isDisabled={disabled}
          />
          <SelectField
            label="Unit"
            required
            options={unitOptions}
            value={unitOptions.find((o) => o.value === unitId) ?? null}
            onChange={(opt) => onUnitChange(String(opt?.value ?? ""))}
            isDisabled={disabled}
          />
          <SelectField
            label="Barcode Symbology"
            required
            options={barcodeSymbolOptions}
            value={barcodeSymbolOptions.find((o) => o.value === barcodeSymbology) ?? null}
            onChange={(opt) => onBarcodeSymbologyChange(String(opt?.value ?? "code128"))}
            isDisabled={disabled}
          />
          <BarcodePreviewSection
            barcode={barcode}
            barcodeSymbology={barcodeSymbology}
            imageBase64={barcodeImageBase64}
            effectiveSymbology={barcodeEffectiveSymbology}
            loading={barcodeLoading}
            error={barcodeError}
            onBarcodeChange={onBarcodeChange}
            onGenerateBarcode={onGenerateBarcode}
            onDownload={onDownloadBarcode}
            disabled={disabled}
          />
        </div>

        <div className="mt-5">
          <FormField label="Description">
            <textarea
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#0F172A] bg-white focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e]/20 transition-all min-h-[100px]"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              disabled={disabled}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}

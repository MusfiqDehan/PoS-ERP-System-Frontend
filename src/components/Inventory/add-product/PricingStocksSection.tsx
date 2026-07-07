"use client";

import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import type { VariantAttribute } from "@/lib/inventory";
import type { ProductVariantFormRow } from "@/hooks/inventory/productFormTypes";
import { discountTypeOptions, taxTypeOptions } from "./selectOptions";

export type PricingStocksSectionProps = {
  productType: "single" | "variable";
  price: string;
  cost: string;
  taxType: string;
  discountType: string;
  discountValue: string;
  minQtyAlert: string;
  variants: ProductVariantFormRow[];
  variantAttributes: VariantAttribute[];
  onProductTypeChange: (value: "single" | "variable") => void;
  onPriceChange: (value: string) => void;
  onCostChange: (value: string) => void;
  onTaxTypeChange: (value: string) => void;
  onDiscountTypeChange: (value: string) => void;
  onDiscountValueChange: (value: string) => void;
  onMinQtyAlertChange: (value: string) => void;
  onAddVariantRow: (attributeName: string, attributeValue: string) => void;
  onUpdateVariantRow: (index: number, patch: Partial<ProductVariantFormRow>) => void;
  onRemoveVariantRow: (index: number) => void;
  disabled?: boolean;
};

const pillBase =
  "px-5 py-2 rounded-full border text-[13px] font-semibold cursor-pointer transition-all [&.active]:bg-[#0ac79e] [&.active]:text-white [&.active]:border-[#0ac79e] [&.active]:shadow-sm [&.active]:shadow-[#0ac79e]/25";

export default function PricingStocksSection({
  productType,
  price,
  cost,
  taxType,
  discountType,
  discountValue,
  minQtyAlert,
  variants,
  variantAttributes,
  onProductTypeChange,
  onPriceChange,
  onCostChange,
  onTaxTypeChange,
  onDiscountTypeChange,
  onDiscountValueChange,
  onMinQtyAlertChange,
  onAddVariantRow,
  onUpdateVariantRow,
  onRemoveVariantRow,
  disabled,
}: PricingStocksSectionProps) {
  const handleAttributePick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const attrId = e.target.value;
    if (!attrId) return;
    const attr = variantAttributes.find((a) => a.id === attrId);
    if (!attr) return;
    const values = Array.isArray(attr.values)
      ? attr.values
      : typeof attr.values === "string" && attr.values
        ? attr.values.split(",").map((v) => v.trim())
        : [];
    const firstValue = values[0] ?? "default";
    onAddVariantRow(attr.name, firstValue);
    e.target.value = "";
  };

  return (
    <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center">
          <i className="ti ti-lifebuoy text-[16px] text-[#0ac79e]" />
        </div>
        <div>
          <h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Pricing &amp; Stocks</h5>
          <p className="m-0 text-[12px] text-[#94A3B8]">Set pricing, stock, and product type</p>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="mb-5">
          <label className="block text-[13px] font-semibold text-[#0F172A] mb-2.5">
            Product Type<span className="text-[#EF4444] ms-1">*</span>
          </label>
          <div className="flex flex-wrap gap-3" role="tablist">
            <button
              type="button"
              className={`${pillBase} ${productType === "single" ? "active" : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"}`}
              onClick={() => onProductTypeChange("single")}
              disabled={disabled}
            >
              Single Product
            </button>
            <button
              type="button"
              className={`${pillBase} ${productType === "variable" ? "active" : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"}`}
              onClick={() => onProductTypeChange("variable")}
              disabled={disabled}
            >
              Variable Product
            </button>
          </div>
        </div>

        {productType === "single" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <TextField label="Price" required type="number" step="0.01" value={price} onChange={(e) => onPriceChange(e.target.value)} disabled={disabled} />
            <TextField label="Cost" type="number" step="0.01" value={cost} onChange={(e) => onCostChange(e.target.value)} disabled={disabled} />
            <SelectField
              label="Tax Type"
              options={taxTypeOptions}
              value={taxTypeOptions.find((o) => o.value === taxType) ?? null}
              onChange={(opt) => onTaxTypeChange(String(opt?.value ?? "exclusive"))}
              isDisabled={disabled}
            />
            <SelectField
              label="Discount Type"
              options={discountTypeOptions}
              value={discountTypeOptions.find((o) => o.value === discountType) ?? null}
              onChange={(opt) => onDiscountTypeChange(String(opt?.value ?? ""))}
              isDisabled={disabled}
            />
            <TextField label="Discount Value" type="number" step="0.01" value={discountValue} onChange={(e) => onDiscountValueChange(e.target.value)} disabled={disabled} />
            <TextField label="Quantity Alert" type="number" value={minQtyAlert} onChange={(e) => onMinQtyAlertChange(e.target.value)} disabled={disabled} />
          </div>
        )}

        {productType === "variable" && (
          <div>
            <div className="max-w-[500px] mb-4">
              <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                Variant Attribute
              </label>
              <select
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#0F172A] bg-white"
                onChange={handleAttributePick}
                defaultValue=""
                disabled={disabled}
              >
                <option value="" disabled>Add variant from attribute</option>
                {variantAttributes.map((attr) => (
                  <option key={attr.id} value={attr.id}>{attr.name}</option>
                ))}
              </select>
            </div>

            {variants.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[12px] text-[#64748B] font-semibold uppercase tracking-wider">
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Attributes</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Cost</th>
                      <th className="px-4 py-3">Barcode</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((row, index) => (
                      <tr key={index} className="border-b border-[#F1F5F9] last:border-0 align-middle">
                        <td className="px-4 py-3">
                          <input className="form-control" value={row.sku} onChange={(e) => onUpdateVariantRow(index, { sku: e.target.value })} disabled={disabled} />
                        </td>
                        <td className="px-4 py-3 text-[13px] text-[#64748B]">
                          {Object.entries(row.attributes).map(([k, v]) => `${k}: ${v}`).join(", ")}
                        </td>
                        <td className="px-4 py-3">
                          <input className="form-control" type="number" step="0.01" value={row.price} onChange={(e) => onUpdateVariantRow(index, { price: e.target.value })} disabled={disabled} />
                        </td>
                        <td className="px-4 py-3">
                          <input className="form-control" type="number" step="0.01" value={row.cost} onChange={(e) => onUpdateVariantRow(index, { cost: e.target.value })} disabled={disabled} />
                        </td>
                        <td className="px-4 py-3">
                          <input className="form-control" value={row.barcode} onChange={(e) => onUpdateVariantRow(index, { barcode: e.target.value })} disabled={disabled} />
                        </td>
                        <td className="px-4 py-3">
                          <button type="button" className="text-[#EF4444] text-[13px]" onClick={() => onRemoveVariantRow(index)} disabled={disabled}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

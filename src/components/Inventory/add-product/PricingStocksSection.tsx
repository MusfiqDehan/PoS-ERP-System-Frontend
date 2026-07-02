"use client";

import { useState } from "react";
import CounterThree from "@/core/common/counter/counterThree";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import TextInput from "@/core/common/form/TextInput";
import TagInput from "@/core/common/Taginput";
import { Plus } from "react-feather";
import Link from "next/link";
import { discountTypeOptions, taxTypeOptions } from "./selectOptions";

type PricingStocksSectionProps = {
  showVariant: boolean;
  showTags: boolean;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onVariantSelect: () => void;
  onRemoveTags: () => void;
};

const pillBase =
  "px-5 py-2 rounded-full border text-[13px] font-semibold cursor-pointer transition-all [&.active]:bg-[#0ac79e] [&.active]:text-white [&.active]:border-[#0ac79e] [&.active]:shadow-sm [&.active]:shadow-[#0ac79e]/25";

const variantRows = [
  { variation: "color", value: "red", sku: 1234, price: 50000, editTarget: "#add-variation" },
  { variation: "color", value: "black", sku: 2345, price: 50000, editTarget: "#edit-units" },
];

export default function PricingStocksSection({
  showVariant,
  showTags,
  tags,
  onTagsChange,
  onVariantSelect,
  onRemoveTags,
}: PricingStocksSectionProps) {
  const [pill, setPill] = useState("single");

  return (
    <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center">
          <i className="ti ti-lifebuoy text-[16px] text-[#0ac79e]" />
        </div>
        <div>
          <h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Pricing &amp; Stocks</h5>
          <p className="m-0 text-[12px] text-[#94A3B8]">Set pricing, stock, and product type</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        {/* Product type pills */}
        <div className="mb-5">
          <label className="block text-[13px] font-semibold text-[#0F172A] mb-2.5">
            Product Type<span className="text-[#EF4444] ms-1">*</span>
          </label>
          <div className="flex flex-wrap gap-3" role="tablist">
            <button
              type="button"
              className={`${pillBase} ${pill === "single" ? "active" : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"}`}
              onClick={() => setPill("single")}
              role="tab"
              aria-selected={pill === "single"}
            >
              Single Product
            </button>
            <button
              type="button"
              className={`${pillBase} ${pill === "variable" ? "active" : "border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]"}`}
              onClick={() => setPill("variable")}
              role="tab"
              aria-selected={pill === "variable"}
            >
              Variable Product
            </button>
          </div>
        </div>

        {/* Single product fields — 3-col grid */}
        {pill === "single" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <TextField label="Quantity" required />
            </div>
            <div>
              <TextField label="Price" required />
            </div>
            <div>
              <SelectField label="Tax Type" required options={taxTypeOptions} placeholder="Select Option" />
            </div>
            <div>
              <SelectField label="Discount Type" required options={discountTypeOptions} />
            </div>
            <div>
              <TextField label="Discount Value" required />
            </div>
            <div>
              <TextField label="Quantity Alert" required />
            </div>
          </div>
        )}

        {/* Variable product */}
        {pill === "variable" && (
          <div>
            <div className="max-w-[500px]">
              <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                Variant Attribute <span className="text-[#EF4444] ms-1">*</span>
              </label>
              <div className="flex items-center gap-2">
                <select
                  className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#0F172A] bg-white focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e]/20 transition-all"
                  onChange={onVariantSelect}
                  defaultValue=""
                >
                  <option value="" disabled>Choose attribute</option>
                  <option>Color</option>
                  <option value="red">Red</option>
                  <option value="black">Black</option>
                </select>
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#add-units"
                  className="w-[38px] h-[38px] shrink-0 inline-flex items-center justify-center rounded-lg bg-[#0ac79e] text-white hover:bg-[#089b7c] transition-colors"
                >
                  <Plus size={16} />
                </Link>
              </div>

              {showVariant && showTags && (
                <div className="mt-4">
                  <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
                    Variant Values <span className="text-[#EF4444] ms-1">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <TagInput initialTags={tags} onTagsChange={onTagsChange} />
                    </div>
                    <button
                      type="button"
                      onClick={onRemoveTags}
                      className="w-[38px] h-[38px] shrink-0 inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#EF4444] hover:border-[#EF4444] transition-all"
                    >
                      <i className="far fa-trash-alt" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {showVariant && (
              <div className="mt-5">
                <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[12px] text-[#64748B] font-semibold uppercase tracking-wider">
                        <th className="px-4 py-3">Variation</th>
                        <th className="px-4 py-3">Value</th>
                        <th className="px-4 py-3">SKU</th>
                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {variantRows.map((row, i) => (
                        <tr key={i} className="border-b border-[#F1F5F9] last:border-0 align-middle">
                          <td className="px-4 py-3">
                            <TextInput defaultValue={row.variation} />
                          </td>
                          <td className="px-4 py-3">
                            <TextInput defaultValue={row.value} />
                          </td>
                          <td className="px-4 py-3">
                            <TextInput defaultValue={row.sku} />
                          </td>
                          <td className="px-4 py-3">
                            <CounterThree />
                          </td>
                          <td className="px-4 py-3">
                            <TextInput defaultValue={row.price} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="w-4 h-4 rounded border-[#CBD5E1] accent-[#0ac79e]"
                              />
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target={row.editTarget}
                                className="w-8 h-8 inline-flex items-center justify-center border border-[#E2E8F0] rounded-lg text-[#64748B] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-all"
                              >
                                <Plus size={14} />
                              </Link>
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete-modal"
                                className="w-8 h-8 inline-flex items-center justify-center border border-[#E2E8F0] rounded-lg text-[#64748B] hover:text-[#EF4444] hover:border-[#EF4444] transition-all"
                              >
                                <i className="ti ti-trash" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

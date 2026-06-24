"use client";

import CounterThree from "@/core/common/counter/counterThree";
import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import TextInput from "@/core/common/form/TextInput";
import TagInput from "@/core/common/Taginput";
import { LifeBuoy, Plus } from "react-feather";
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

const pillCls =
  "px-4 py-2 rounded-full border border-[#e7e7e7] text-[14px] font-medium text-[#646B72] cursor-pointer transition-colors [&.active]:bg-[#0ac79e] [&.active]:text-white [&.active]:border-[#0ac79e]";

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
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px] mb-4">
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#SpacingTwo"
        aria-expanded="true"
        aria-controls="SpacingTwo"
        className="w-full flex items-center justify-between gap-2 px-4 py-3.5 text-left"
      >
        <span className="flex items-center gap-2 text-[16px] font-semibold text-[#212B36]">
          <LifeBuoy size={18} className="text-[#0ac79e]" />
          Pricing &amp; Stocks
        </span>
        <i className="ti ti-chevron-down text-[#646B72]" />
      </button>
      <div id="SpacingTwo" className="accordion-collapse collapse show">
        <div className="border-t border-[#f1f1f1] p-4">
          <div className="mb-4">
            <label className="block text-[13px] font-medium text-[#212B36] mb-2">
              Product Type<span className="text-[#dc3545] ms-1">*</span>
            </label>
            <ul className="nav nav-pills flex flex-wrap gap-3 p-0 m-0" id="pills-tab1" role="tablist">
              <li className="nav-item" role="presentation">
                <span
                  className={`${pillCls} active`}
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Single Product
                </span>
              </li>
              <li className="nav-item" role="presentation">
                <span
                  className={pillCls}
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Variable Product
                </span>
              </li>
            </ul>
          </div>

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="row">
                <FormCol lg={4}>
                  <TextField label="Quantity" required />
                </FormCol>
                <FormCol lg={4}>
                  <TextField label="Price" required />
                </FormCol>
                <FormCol lg={4}>
                  <SelectField
                    label="Tax Type"
                    required
                    options={taxTypeOptions}
                    placeholder="Select Option"
                  />
                </FormCol>
                <FormCol lg={4}>
                  <SelectField label="Discount Type" required options={discountTypeOptions} />
                </FormCol>
                <FormCol lg={4}>
                  <TextField label="Discount Value" required />
                </FormCol>
                <FormCol lg={4}>
                  <TextField label="Quantity Alert" required />
                </FormCol>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="lg:max-w-[50%]">
                <label className="block text-[13px] font-medium text-[#212B36] mb-1.5">
                  Variant Attribute <span className="text-[#dc3545] ms-1">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <select
                    className="flex-1 border border-[#e7e7e7] rounded-md px-3 py-2 text-[14px] text-[#212B36] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e]"
                    id="colorSelect"
                    onChange={onVariantSelect}
                  >
                    <option>Choose</option>
                    <option>Color</option>
                    <option value="red">Red</option>
                    <option value="black">Black</option>
                  </select>
                  <Link
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#add-units"
                    className="w-[38px] h-[38px] shrink-0 inline-flex items-center justify-center rounded-md bg-[#0ac79e] text-white hover:bg-[#089b7c] transition-colors"
                  >
                    <i className="feather feather-plus-circle" />
                  </Link>
                </div>

                {showVariant && showTags && (
                  <div className="mt-3" id="input-show">
                    <label className="block text-[13px] font-medium text-[#212B36] mb-1.5">
                      Variant Attribute <span className="text-[#dc3545] ms-1">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <TagInput initialTags={tags} onTagsChange={onTagsChange} />
                      </div>
                      <Link
                        href="#"
                        onClick={onRemoveTags}
                        className="w-[38px] h-[38px] shrink-0 inline-flex items-center justify-center rounded-md border border-[#e7e7e7] text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
                      >
                        <i className="far fa-trash-alt" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {showVariant && (
                <div className="mt-4 overflow-x-auto rounded-md border border-[#e7e7e7]" id="variant-table">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#e7e7e7] text-[13px] text-[#646B72]">
                        <th className="px-3 py-2.5 font-semibold">Variantion</th>
                        <th className="px-3 py-2.5 font-semibold">Variant Value</th>
                        <th className="px-3 py-2.5 font-semibold">SKU</th>
                        <th className="px-3 py-2.5 font-semibold">Quantity</th>
                        <th className="px-3 py-2.5 font-semibold">Price</th>
                        <th className="px-3 py-2.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {variantRows.map((row, i) => (
                        <tr key={i} className="border-b border-[#f1f1f1] last:border-0 align-middle">
                          <td className="px-3 py-2.5">
                            <TextInput defaultValue={row.variation} />
                          </td>
                          <td className="px-3 py-2.5">
                            <TextInput defaultValue={row.value} />
                          </td>
                          <td className="px-3 py-2.5">
                            <TextInput defaultValue={row.sku} />
                          </td>
                          <td className="px-3 py-2.5">
                            <CounterThree />
                          </td>
                          <td className="px-3 py-2.5">
                            <TextInput defaultValue={row.price} />
                          </td>
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="w-4 h-4 rounded border-[#d1d5db] accent-[#0ac79e]"
                              />
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target={row.editTarget}
                                className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#0ac79e] hover:border-[#0ac79e] transition-colors"
                              >
                                <Plus size={14} />
                              </Link>
                              <Link
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete-modal"
                                className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import FormCol from "@/core/common/form/FormCol";
import FormField from "@/core/common/form/FormField";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import TextEditor from "@/core/common/texteditor/texteditor";
import { Info, PlusCircle } from "react-feather";
import Link from "next/link";
import {
  barcodeSymbolOptions,
  brandOptions,
  categoryOptions,
  sellingTypeOptions,
  storeOptions,
  subcategoryOptions,
  unitOptions,
  warehouseOptions,
} from "./selectOptions";

export default function ProductInformationSection() {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px] mb-4">
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#SpacingOne"
        aria-expanded="true"
        aria-controls="SpacingOne"
        className="w-full flex items-center justify-between gap-2 px-4 py-3.5 text-left"
      >
        <span className="flex items-center gap-2 text-[16px] font-semibold text-[#212B36]">
          <Info size={18} className="text-[#0ac79e]" />
          Product Information
        </span>
        <i className="ti ti-chevron-down text-[#646B72]" />
      </button>
      <div id="SpacingOne" className="accordion-collapse collapse show">
        <div className="border-t border-[#f1f1f1] p-4">
          <div className="row">
            <FormCol>
              <SelectField label="Store" required options={storeOptions} />
            </FormCol>
            <FormCol>
              <SelectField label="Warehouse" required options={warehouseOptions} />
            </FormCol>
          </div>
          <div className="row">
            <FormCol>
              <TextField label="Product Name" required />
            </FormCol>
            <FormCol>
              <TextField label="Slug" required />
            </FormCol>
          </div>
          <div className="row">
            <FormCol>
              <TextField
                label="SKU"
                required
                inputClassName="list"
                action={{ label: "Generate" }}
              />
            </FormCol>
            <FormCol>
              <SelectField label="Selling Type" required options={sellingTypeOptions} />
            </FormCol>
          </div>
          <div className="row">
            <FormCol>
              <SelectField
                label="Category"
                required
                options={categoryOptions}
                labelWrapperClassName="flex items-center justify-between"
                labelAddon={
                  <Link
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#add-units-category"
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-[#0ac79e] hover:underline"
                  >
                    <PlusCircle size={14} />
                    <span>Add New</span>
                  </Link>
                }
              />
            </FormCol>
            <FormCol>
              <SelectField label="Sub Category" required options={subcategoryOptions} />
            </FormCol>
          </div>
          <div className="row">
            <FormCol>
              <SelectField label="Brand" required options={brandOptions} />
            </FormCol>
            <FormCol>
              <SelectField label="Unit" required options={unitOptions} />
            </FormCol>
          </div>
          <div className="row">
            <FormCol lg={6}>
              <SelectField label="Barcode Symbology" required options={barcodeSymbolOptions} />
            </FormCol>
            <FormCol lg={6}>
              <TextField
                label="Item Code"
                required
                inputClassName="list"
                action={{ label: "Generate", type: "submit" }}
              />
            </FormCol>
          </div>
          <div>
            <FormField label="Description">
              <TextEditor />
              <p className="text-[14px] mt-1 text-[#646B72]">Maximum 60 Words</p>
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import FormField from "@/core/common/form/FormField";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import TextEditor from "@/core/common/texteditor/texteditor";
import { PlusCircle } from "react-feather";
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
    <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center">
          <i className="ti ti-info-circle text-[16px] text-[#0ac79e]" />
        </div>
        <div>
          <h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Product Information</h5>
          <p className="m-0 text-[12px] text-[#94A3B8]">Basic details about your product</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <SelectField label="Store" required options={storeOptions} />
          </div>
          <div>
            <SelectField label="Warehouse" required options={warehouseOptions} />
          </div>
          <div>
            <TextField label="Product Name" required />
          </div>
          <div>
            <TextField label="Slug" required />
          </div>
          <div>
            <TextField
              label="SKU"
              required
              inputClassName="list"
              action={{ label: "Generate" }}
            />
          </div>
          <div>
            <SelectField label="Selling Type" required options={sellingTypeOptions} />
          </div>
          <div>
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
          </div>
          <div>
            <SelectField label="Sub Category" required options={subcategoryOptions} />
          </div>
          <div>
            <SelectField label="Brand" required options={brandOptions} />
          </div>
          <div>
            <SelectField label="Unit" required options={unitOptions} />
          </div>
          <div>
            <SelectField label="Barcode Symbology" required options={barcodeSymbolOptions} />
          </div>
          <div>
            <TextField
              label="Item Code"
              required
              inputClassName="list"
              action={{ label: "Generate", type: "submit" }}
            />
          </div>
        </div>

        <div className="mt-5">
          <FormField label="Description">
            <TextEditor />
            <p className="text-[12px] mt-1.5 text-[#94A3B8]">Maximum 60 characters</p>
          </FormField>
        </div>
      </div>
    </div>
  );
}

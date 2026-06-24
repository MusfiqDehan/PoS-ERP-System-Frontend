"use client";

import DateField from "@/core/common/form/DateField";
import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import { Calendar, List } from "react-feather";
import { warrantyOptions } from "@/components/Inventory/add-product/selectOptions";

const checks = [
  { id: "warranties", label: "Warranties" },
  { id: "manufacturer", label: "Manufacturer" },
  { id: "expiry", label: "Expiry" },
];

export default function CustomFieldsSection() {
  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px] mb-4">
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#SpacingFour"
        aria-expanded="true"
        aria-controls="SpacingFour"
        className="w-full flex items-center justify-between gap-2 px-4 py-3.5 text-left"
      >
        <span className="flex items-center gap-2 text-[16px] font-semibold text-[#212B36]">
          <List size={18} className="text-[#0ac79e]" />
          Custom Fields
        </span>
        <i className="ti ti-chevron-down text-[#646B72]" />
      </button>
      <div id="SpacingFour" className="accordion-collapse collapse show">
        <div className="border-t border-[#f1f1f1] p-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 p-3 bg-[#f9fafb] rounded border border-[#f1f1f1] mb-4">
            {checks.map((c) => (
              <label key={c.id} htmlFor={c.id} className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id={c.id}
                  className="w-4 h-4 rounded border-[#d1d5db] accent-[#0ac79e]"
                />
                <span className="text-[14px] text-[#212B36]">{c.label}</span>
              </label>
            ))}
          </div>
          <div className="row">
            <FormCol>
              <SelectField label="Warranty" required options={warrantyOptions} />
            </FormCol>
            <FormCol>
              <TextField label="Manufacturer" required defaultValue="Lenovo" className="mb-3" />
            </FormCol>
          </div>
          <div className="row">
            <FormCol>
              <DateField
                label="Manufactured Date"
                required
                icon={<Calendar className="info-img" />}
              />
            </FormCol>
            <FormCol>
              <DateField
                label="Expiry On"
                required
                icon={<Calendar className="info-img" />}
              />
            </FormCol>
          </div>
        </div>
      </div>
    </div>
  );
}

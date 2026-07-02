"use client";

import DateField from "@/core/common/form/DateField";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import { Calendar } from "react-feather";
import { warrantyOptions } from "./selectOptions";

const checks = [
  { id: "warranties", label: "Warranties" },
  { id: "manufacturer", label: "Manufacturer" },
  { id: "expiry", label: "Expiry" },
];

export default function CustomFieldsSection() {
  return (
    <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center">
          <i className="ti ti-list text-[16px] text-[#0ac79e]" />
        </div>
        <div>
          <h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Custom Fields</h5>
          <p className="m-0 text-[12px] text-[#94A3B8]">Additional product metadata</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        {/* Checkbox toggles */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 p-3.5 bg-[#F8FAFC] rounded-xl border border-[#F1F5F9] mb-5">
          {checks.map((c) => (
            <label key={c.id} htmlFor={c.id} className="inline-flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                id={c.id}
                className="w-[18px] h-[18px] rounded border-[#CBD5E1] text-[#0ac79e] accent-[#0ac79e] focus:ring-[#0ac79e]/20 focus:ring-1"
              />
              <span className="text-[14px] font-medium text-[#0F172A]">{c.label}</span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <SelectField label="Warranty" required options={warrantyOptions} />
          </div>
          <div>
            <TextField label="Manufacturer" required />
          </div>
          <div>
            <DateField label="Manufactured Date" required icon={<Calendar className="info-img" />} />
          </div>
          <div>
            <DateField label="Expiry On" required icon={<Calendar className="info-img" />} />
          </div>
        </div>
      </div>
    </div>
  );
}

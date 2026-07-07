"use client";

import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import type { SelectOption } from "@/core/common/form/types";

export type CustomFieldsSectionProps = {
  warrantyOptions: SelectOption[];
  warrantyId: string;
  manufacturer: string;
  manufacturedAt: string;
  expiresAt: string;
  onWarrantyChange: (value: string) => void;
  onManufacturerChange: (value: string) => void;
  onManufacturedAtChange: (value: string) => void;
  onExpiresAtChange: (value: string) => void;
  disabled?: boolean;
};

const ic = "w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-[13px] text-[#0F172A] bg-white focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e]/20 transition-all";

export default function CustomFieldsSection({
  warrantyOptions,
  warrantyId,
  manufacturer,
  manufacturedAt,
  expiresAt,
  onWarrantyChange,
  onManufacturerChange,
  onManufacturedAtChange,
  onExpiresAtChange,
  disabled,
}: CustomFieldsSectionProps) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F1F5F9]">
        <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#0ac79e]/15 to-[#089e7e]/15 flex items-center justify-center">
          <i className="ti ti-list text-[16px] text-[#0ac79e]" />
        </div>
        <div>
          <h5 className="m-0 text-[15px] font-bold text-[#0F172A]">Custom Fields</h5>
          <p className="m-0 text-[12px] text-[#94A3B8]">Additional product metadata</p>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <SelectField
            label="Warranty"
            options={warrantyOptions}
            value={warrantyOptions.find((o) => o.value === warrantyId) ?? null}
            onChange={(opt) => onWarrantyChange(String(opt?.value ?? ""))}
            isDisabled={disabled}
          />
          <TextField label="Manufacturer" value={manufacturer} onChange={(e) => onManufacturerChange(e.target.value)} disabled={disabled} />
          <div>
            <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">Manufactured Date</label>
            <input type="date" className={ic} value={manufacturedAt} onChange={(e) => onManufacturedAtChange(e.target.value)} disabled={disabled} />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">Expiry On</label>
            <input type="date" className={ic} value={expiresAt} onChange={(e) => onExpiresAtChange(e.target.value)} disabled={disabled} />
          </div>
        </div>
      </div>
    </div>
  );
}

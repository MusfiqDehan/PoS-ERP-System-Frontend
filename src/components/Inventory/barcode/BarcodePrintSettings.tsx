"use client";

import SelectField from "@/core/common/form/SelectField";
import { PaperSize } from "@/core/common/selectOption/selectOption";

const toggles = [
  { id: "user7", label: "Show Store Name" },
  { id: "user8", label: "Show Product Name" },
  { id: "user9", label: "Show Price" },
];

export default function BarcodePrintSettings() {
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
      <div className="lg:max-w-[90%]">
        <SelectField
          label="Paper Size"
          required
          options={PaperSize}
          placeholder="Choose"
          classNamePrefix="react-select"
        />
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-3 lg:pt-7">
        {toggles.map((t) => (
          <div key={t.id} className="flex items-center gap-2">
            <span className="text-[14px] text-[#212B36]">{t.label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id={t.id} defaultChecked className="sr-only peer" />
              <span className="w-10 h-5 bg-gray-200 rounded-full transition-colors peer-checked:bg-[#0ac79e] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

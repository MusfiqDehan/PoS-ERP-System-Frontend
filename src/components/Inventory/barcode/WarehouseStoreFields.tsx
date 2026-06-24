"use client";

import SelectField from "@/core/common/form/SelectField";
import { Store, WareHouse } from "@/core/common/selectOption/selectOption";

export default function WarehouseStoreFields() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-[50%]">
      <SelectField
        label="Warehouse"
        required
        options={WareHouse}
        placeholder="Choose"
        classNamePrefix="react-select"
      />
      <SelectField
        label="Store"
        required
        options={Store}
        placeholder="Choose"
        classNamePrefix="react-select"
      />
    </div>
  );
}

"use client";

import SelectField from "@/core/common/form/SelectField";
import FormCol from "@/core/common/form/FormCol";
import { Store, WareHouse } from "@/core/common/selectOption/selectOption";

export default function WarehouseStoreFields() {
  return (
    <div className="row">
      <div className="col-lg-6 col-12">
        <div className="row seacrh-barcode-item mb-1">
          <FormCol sm={6} className="col-sm-6 mb-3 seacrh-barcode-item-one">
            <SelectField
              label="Warehouse"
              required
              options={WareHouse}
              placeholder="Choose"
              classNamePrefix="react-select"
            />
          </FormCol>
          <FormCol sm={6} className="col-sm-6 mb-3 seacrh-barcode-item-one">
            <SelectField
              label="Store"
              required
              options={Store}
              placeholder="Choose"
              classNamePrefix="react-select"
            />
          </FormCol>
        </div>
      </div>
    </div>
  );
}

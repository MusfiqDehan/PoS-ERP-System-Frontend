"use client";

import DateField from "@/core/common/form/DateField";
import FormCol from "@/core/common/form/FormCol";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import { Calendar, List } from "react-feather";
import { warrantyOptions } from "./selectOptions";

export default function CustomFieldsSection() {
  return (
    <div className="accordion-item border mb-4">
      <h2 className="accordion-header" id="headingSpacingFour">
        <div
          className="accordion-button collapsed bg-white"
          data-bs-toggle="collapse"
          data-bs-target="#SpacingFour"
          aria-expanded="true"
          aria-controls="SpacingFour"
        >
          <div className="d-flex align-items-center justify-content-between flex-fill">
            <h5 className="d-flex align-items-center">
              <List data-feather="list" className="text-primary me-2" />
              <span>Custom Fields</span>
            </h5>
          </div>
        </div>
      </h2>
      <div
        id="SpacingFour"
        className="accordion-collapse collapse show"
        aria-labelledby="headingSpacingFour"
      >
        <div className="accordion-body border-top">
          <div>
            <div className="p-3 bg-light rounded d-flex align-items-center border mb-3">
              <div className=" d-flex align-items-center">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="warranties"
                    defaultValue="option1"
                  />
                  <label className="form-check-label" htmlFor="warranties">
                    Warranties
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="manufacturer"
                    defaultValue="option2"
                  />
                  <label className="form-check-label" htmlFor="manufacturer">
                    Manufacturer
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="expiry"
                    defaultValue="option2"
                  />
                  <label className="form-check-label" htmlFor="expiry">
                    Expiry
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <FormCol>
                <SelectField
                  label="Warranty"
                  required
                  options={warrantyOptions}
                />
              </FormCol>
              <FormCol>
                <TextField
                  label="Manufacturer"
                  required
                  className="mb-3 add-product"
                />
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
    </div>
  );
}

"use client";

import { List } from "react-feather";
import CustomFieldCheckboxes from "./CustomFieldCheckboxes";
import ManufactureExpiryDates from "./ManufactureExpiryDates";
import WarrantyManufacturerFields from "./WarrantyManufacturerFields";

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
                          <List
                            data-feather="list"
                            className="text-primary me-2"
                          />
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
                        <CustomFieldCheckboxes />
                        <WarrantyManufacturerFields />
                        <ManufactureExpiryDates />
                      </div>
                    </div>
                  </div>
                </div>
  );
}

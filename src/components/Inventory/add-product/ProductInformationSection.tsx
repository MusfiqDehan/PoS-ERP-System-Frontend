"use client";

import { Info } from "react-feather";
import BarcodeItemCodeFields from "./BarcodeItemCodeFields";
import BrandUnitFields from "./BrandUnitFields";
import CategorySubcategoryFields from "./CategorySubcategoryFields";
import DescriptionField from "./DescriptionField";
import ProductNameSlugFields from "./ProductNameSlugFields";
import SkuSellingTypeFields from "./SkuSellingTypeFields";
import StoreWarehouseFields from "./StoreWarehouseFields";

export default function ProductInformationSection() {
  return (
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingOne">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingOne"
                      aria-expanded="true"
                      aria-controls="SpacingOne"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <Info className="text-primary me-2" />
                          <span>Product Information</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingOne"
                  >
                    <div className="accordion-body border-top">
                      <StoreWarehouseFields />
                      <ProductNameSlugFields />
                      <SkuSellingTypeFields />
                      <CategorySubcategoryFields />
                      <BrandUnitFields />
                      <BarcodeItemCodeFields />
                      <DescriptionField />
                    </div>
                  </div>
                </div>
  );
}

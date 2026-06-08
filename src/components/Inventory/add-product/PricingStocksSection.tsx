"use client";

import { LifeBuoy } from "react-feather";
import ProductTypeTabs from "./ProductTypeTabs";
import SingleProductFields from "./SingleProductFields";
import VariableProductTab from "./VariableProductTab";

type PricingStocksSectionProps = {
  showVariant: boolean;
  showTags: boolean;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onVariantSelect: () => void;
  onRemoveTags: () => void;
};

export default function PricingStocksSection({
  showVariant,
  showTags,
  tags,
  onTagsChange,
  onVariantSelect,
  onRemoveTags,
}: PricingStocksSectionProps) {
  return (
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingTwo">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingTwo"
                      aria-expanded="true"
                      aria-controls="SpacingTwo"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <LifeBuoy
                            data-feather="life-buoy"
                            className="text-primary me-2"
                          />
                          <span>Pricing &amp; Stocks</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingTwo"
                  >
                    <div className="accordion-body border-top">
                      <ProductTypeTabs />
                      <div className="tab-content" id="pills-tabContent">
                        <SingleProductFields />
                        <VariableProductTab
                          showVariant={showVariant}
                          showTags={showTags}
                          tags={tags}
                          onTagsChange={onTagsChange}
                          onVariantSelect={onVariantSelect}
                          onRemoveTags={onRemoveTags}
                        />
                      </div>
                    </div>
                  </div>
                </div>
  );
}

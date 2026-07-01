"use client";

import { useEffect, useState } from "react";
import CustomFieldsSection from "./CustomFieldsSection";
import FormActions from "./FormActions";
import ImagesSection from "./ImagesSection";
import PricingStocksSection from "./PricingStocksSection";
import ProductInformationSection from "./ProductInformationSection";

type AddProductFormProps = {
  showVariant: boolean;
  showTags: boolean;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onVariantSelect: () => void;
  onRemoveTags: () => void;
  showPrimaryImage: boolean;
  showSecondaryImage: boolean;
  onRemovePrimaryImage: () => void;
  onRemoveSecondaryImage: () => void;
};

export default function AddProductForm({
  showVariant,
  showTags,
  tags,
  onTagsChange,
  onVariantSelect,
  onRemoveTags,
  showPrimaryImage,
  showSecondaryImage,
  onRemovePrimaryImage,
  onRemoveSecondaryImage,
}: AddProductFormProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="py-10 text-center text-[14px] text-[#646B72]">
        Loading form…
      </div>
    );
  }

  return (
    <form className="space-y-5">
      <ProductInformationSection />
      <PricingStocksSection
        showVariant={showVariant}
        showTags={showTags}
        tags={tags}
        onTagsChange={onTagsChange}
        onVariantSelect={onVariantSelect}
        onRemoveTags={onRemoveTags}
      />
      <ImagesSection
        showPrimaryImage={showPrimaryImage}
        showSecondaryImage={showSecondaryImage}
        onRemovePrimaryImage={onRemovePrimaryImage}
        onRemoveSecondaryImage={onRemoveSecondaryImage}
      />
      <CustomFieldsSection />
      <FormActions />
    </form>
  );
}

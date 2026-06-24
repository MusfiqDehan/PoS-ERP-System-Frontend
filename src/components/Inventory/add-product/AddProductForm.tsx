"use client";

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
  return (
    <form>
      <div id="accordionSpacingExample">
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
      </div>
      <FormActions />
    </form>
  );
}

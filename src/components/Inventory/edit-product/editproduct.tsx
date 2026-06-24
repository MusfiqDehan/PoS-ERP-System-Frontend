"use client";

import { useState } from "react";
import AddCategory from "@/core/modals/inventory/addcategory";
import AddVariant from "@/core/modals/inventory/addvariant";
import AddVarientNew from "@/core/modals/inventory/addVarientNew";
import PageHeader from "./PageHeader";
import ProductInformationSection from "./ProductInformationSection";
import PricingStocksSection from "./PricingStocksSection";
import ImagesSection from "./ImagesSection";
import CustomFieldsSection from "./CustomFieldsSection";
import FormActions from "./FormActions";
import EditProductModals from "./EditProductModals";

const EditProductComponent = () => {
  const [tags, setTags] = useState(["Red", "Black"]);
  const [showVariant, setShowVariant] = useState(false);
  const [showTags, setShowTags] = useState(true);
  const [showPrimaryImage, setShowPrimaryImage] = useState(true);
  const [showSecondaryImage, setShowSecondaryImage] = useState(true);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <form>
            <div>
              <ProductInformationSection />
              <PricingStocksSection
                showVariant={showVariant}
                showTags={showTags}
                tags={tags}
                onTagsChange={setTags}
                onVariantSelect={() => setShowVariant(true)}
                onRemoveTags={() => setShowTags(false)}
              />
              <ImagesSection
                showPrimaryImage={showPrimaryImage}
                showSecondaryImage={showSecondaryImage}
                onRemovePrimaryImage={() => setShowPrimaryImage(false)}
                onRemoveSecondaryImage={() => setShowSecondaryImage(false)}
              />
              <CustomFieldsSection />
            </div>
            <FormActions />
          </form>
        </div>
      </div>
      <EditProductModals />
      <AddCategory />
      <AddVariant />
      <AddVarientNew />
    </>
  );
};

export default EditProductComponent;

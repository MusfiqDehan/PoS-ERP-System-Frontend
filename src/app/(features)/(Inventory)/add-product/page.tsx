"use client";

import { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import AddBrand from "@/core/modals/inventory/addbrand";
import AddCategory from "@/core/modals/inventory/addcategory";
import Addunits from "@/core/modals/inventory/addunits";
import AddVariant from "@/core/modals/inventory/addvariant";
import AddVarientNew from "@/core/modals/inventory/addVarientNew";
import AddProductForm from "@/components/Inventory/add-product/AddProductForm";
import DeleteAttributeModal from "@/components/Inventory/add-product/DeleteAttributeModal";
import PageHeader from "@/components/Inventory/add-product/PageHeader";

export default function AddProduct() {
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
          <AddProductForm
            showVariant={showVariant}
            showTags={showTags}
            tags={tags}
            onTagsChange={setTags}
            onVariantSelect={() => setShowVariant(true)}
            onRemoveTags={() => setShowTags(false)}
            showPrimaryImage={showPrimaryImage}
            showSecondaryImage={showSecondaryImage}
            onRemovePrimaryImage={() => setShowPrimaryImage(false)}
            onRemoveSecondaryImage={() => setShowSecondaryImage(false)}
          />
        </div>
        <CommonFooter />
      </div>
      <Addunits />
      <AddCategory />
      <AddVariant />
      <AddBrand />
      <AddVarientNew />
      <DeleteAttributeModal />
    </>
  );
}

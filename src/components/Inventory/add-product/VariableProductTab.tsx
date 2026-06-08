"use client";

import VariantAttributeFields from "./VariantAttributeFields";
import VariantTable from "./VariantTable";

type VariableProductTabProps = {
  showVariant: boolean;
  showTags: boolean;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onVariantSelect: () => void;
  onRemoveTags: () => void;
};

export default function VariableProductTab({
  showVariant,
  showTags,
  tags,
  onTagsChange,
  onVariantSelect,
  onRemoveTags,
}: VariableProductTabProps) {
  return (
                        <div
                          className="tab-pane fade"
                          id="pills-profile"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                        >
                          <VariantAttributeFields
                            showVariant={showVariant}
                            showTags={showTags}
                            tags={tags}
                            onTagsChange={onTagsChange}
                            onVariantSelect={onVariantSelect}
                            onRemoveTags={onRemoveTags}
                          />
                          <VariantTable visible={showVariant} />
                        </div>
  );
}

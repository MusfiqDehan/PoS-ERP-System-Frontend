"use client";

import { Image } from "react-feather";
import ImagePreview from "./ImagePreview";
import ImageUploadDropzone from "./ImageUploadDropzone";

type ImagesSectionProps = {
  showPrimaryImage: boolean;
  showSecondaryImage: boolean;
  onRemovePrimaryImage: () => void;
  onRemoveSecondaryImage: () => void;
};

export default function ImagesSection({
  showPrimaryImage,
  showSecondaryImage,
  onRemovePrimaryImage,
  onRemoveSecondaryImage,
}: ImagesSectionProps) {
  return (
                <div className="accordion-item border mb-4">
                  <h2 className="accordion-header" id="headingSpacingThree">
                    <div
                      className="accordion-button collapsed bg-white"
                      data-bs-toggle="collapse"
                      data-bs-target="#SpacingThree"
                      aria-expanded="true"
                      aria-controls="SpacingThree"
                    >
                      <div className="d-flex align-items-center justify-content-between flex-fill">
                        <h5 className="d-flex align-items-center">
                          <Image
                            data-feather="image"
                            className="text-primary me-2"
                          />
                          <span>Images</span>
                        </h5>
                      </div>
                    </div>
                  </h2>
                  <div
                    id="SpacingThree"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingSpacingThree"
                  >
                    <div className="accordion-body border-top">
                      <div className="text-editor add-list add">
                        <div className="col-lg-12">
                          <div className="add-choosen">
                            <ImageUploadDropzone />
                            <ImagePreview
                              src="assets/img/products/phone-add-2.png"
                              alt="image"
                              visible={showSecondaryImage}
                              onRemove={onRemoveSecondaryImage}
                            />
                            <ImagePreview
                              src="assets/img/products/phone-add-1.png"
                              alt="image"
                              visible={showPrimaryImage}
                              onRemove={onRemovePrimaryImage}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  );
}

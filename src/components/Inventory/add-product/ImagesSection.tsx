"use client";
/* eslint-disable @next/next/no-img-element */

import { Image, PlusCircle, X } from "react-feather";
import Link from "next/link";

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
              <Image data-feather="image" className="text-primary me-2" />
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
                <div className="mb-3">
                  <div className="image-upload">
                    <input type="file" />
                    <div className="image-uploads">
                      <PlusCircle
                        size={14}
                        data-feather="plus-circle"
                        className="plus-down-add me-0"
                      />
                      <h4>Add Images</h4>
                    </div>
                  </div>
                </div>
                {showSecondaryImage && (
                  <div className="phone-img">
                    <img
                      src="assets/img/products/phone-add-2.png"
                      alt="image"
                    />
                    <Link href="#">
                      <X
                        className="x-square-add remove-product"
                        onClick={onRemoveSecondaryImage}
                      />
                    </Link>
                  </div>
                )}
                {showPrimaryImage && (
                  <div className="phone-img">
                    <img
                      src="assets/img/products/phone-add-1.png"
                      alt="image"
                    />
                    <Link href="#">
                      <X
                        className="x-square-add remove-product"
                        onClick={onRemovePrimaryImage}
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

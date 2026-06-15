import ImageWithBasePath from "@/core/common/image-with-base-path";
import { posProductsPanelAssets } from "../posProductsData";
import { POS_MANAGE_CATEGORIES_MODAL_ID } from "../posCategoriesUtils";

export default function ToolbarCategory() {
  return (
    <button
      type="button"
      className="pos-products-panel__action-btn"
      data-bs-toggle="modal"
      data-bs-target={`#${POS_MANAGE_CATEGORIES_MODAL_ID}`}
    >
      <ImageWithBasePath
        src={posProductsPanelAssets.category}
        alt=""
        width={16}
        height={16}
        className="pos-products-panel__action-icon"
      />
      <span>Category</span>
    </button>
  );
}

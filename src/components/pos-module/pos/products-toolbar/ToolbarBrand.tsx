import ImageWithBasePath from "@/core/common/image-with-base-path";
import { posProductsPanelAssets } from "../posProductsData";

export default function ToolbarBrand() {
  return (
    <button type="button" className="pos-products-panel__action-btn">
      <ImageWithBasePath
        src={posProductsPanelAssets.brand}
        alt=""
        width={20}
        height={20}
        className="pos-products-panel__action-icon pos-products-panel__action-icon--brand"
      />
      <span>Brand</span>
    </button>
  );
}

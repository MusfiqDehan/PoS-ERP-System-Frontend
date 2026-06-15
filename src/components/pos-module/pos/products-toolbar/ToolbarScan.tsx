import ImageWithBasePath from "@/core/common/image-with-base-path";
import { posProductsPanelAssets } from "../posProductsData";

export default function ToolbarScan() {
  return (
    <button type="button" className="pos-products-panel__action-btn">
      <ImageWithBasePath
        src={posProductsPanelAssets.scan}
        alt=""
        width={16}
        height={16}
        className="pos-products-panel__action-icon"
      />
      <span>Scan</span>
    </button>
  );
}

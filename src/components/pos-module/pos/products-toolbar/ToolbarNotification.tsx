import ImageWithBasePath from "@/core/common/image-with-base-path";
import { posProductsPanelAssets } from "../posProductsData";

export default function ToolbarNotification() {
  return (
    <button
      type="button"
      className="pos-products-panel__notification-btn"
      aria-label="Notifications"
    >
      <ImageWithBasePath
        src={posProductsPanelAssets.notification}
        alt=""
        width={16}
        height={16}
        className="pos-products-panel__notification-icon"
      />
      <span className="pos-products-panel__notification-dot" />
    </button>
  );
}

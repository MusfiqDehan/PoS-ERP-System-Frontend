"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { posProductsPanelAssets } from "./posProductsData";

type PosProductsToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export default function PosProductsToolbar({
  searchQuery,
  onSearchChange,
}: PosProductsToolbarProps) {
  return (
    <div className="pos-products-panel__toolbar">
      <div className="pos-products-panel__search">
        <ImageWithBasePath
          src={posProductsPanelAssets.search}
          alt=""
          width={16}
          height={16}
          className="pos-products-panel__search-icon"
        />
        <input
          type="text"
          className="pos-products-panel__search-input"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <span className="pos-products-panel__search-shortcut" aria-hidden="true">
          ⌘K
        </span>
      </div>

      <div className="pos-products-panel__toolbar-actions">
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

        <button type="button" className="pos-products-panel__action-btn">
          <ImageWithBasePath
            src={posProductsPanelAssets.category}
            alt=""
            className="pos-products-panel__action-icon"
          />
          <span>Category</span>
        </button>

        <button type="button" className="pos-products-panel__action-btn">
          <ImageWithBasePath
            src={posProductsPanelAssets.brand}
            alt=""
            className="pos-products-panel__action-icon"
          />
          <span>Brand</span>
        </button>

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
      </div>
    </div>
  );
}

import ImageWithBasePath from "@/core/common/image-with-base-path";
import { posProductsPanelAssets } from "../posProductsData";
import type { ToolbarSearchProps } from "./types";

export default function ToolbarSearch({
  searchQuery,
  onSearchChange,
}: ToolbarSearchProps) {
  return (
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
  );
}

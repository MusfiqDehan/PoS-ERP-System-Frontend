import ToolbarBrand from "./ToolbarBrand";
import ToolbarCategory from "./ToolbarCategory";
import ToolbarNotification from "./ToolbarNotification";
import ToolbarScan from "./ToolbarScan";
import ToolbarSearch from "./ToolbarSearch";
import type { ProductsToolbarProps } from "./types";

export default function PosProductsToolbar({
  searchQuery,
  onSearchChange,
}: ProductsToolbarProps) {
  return (
    <div className="pos-products-panel__toolbar">
      <ToolbarSearch
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <div className="pos-products-panel__toolbar-actions">
        <ToolbarScan />
        <ToolbarCategory />
        <ToolbarBrand />
        <ToolbarNotification />
      </div>
    </div>
  );
}

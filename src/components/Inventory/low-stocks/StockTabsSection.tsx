"use client";

import LowStocksFilters from "./LowStocksFilters";
import LowStocksTableCard from "./LowStocksTableCard";
import OutOfStocksFilters from "./OutOfStocksFilters";
import StockTabsToolbar from "./StockTabsToolbar";
import { useLowStocks } from "@/hooks/inventory/useLowStocks";

export default function StockTabsSection() {
  const {
    dataSource,
    loading,
    error,
    activeTab,
    setActiveTab,
    filters,
    updateFilter,
    branches,
    warehouses,
    categories,
    products,
  } = useLowStocks();

  const filterProps = {
    branches,
    warehouses,
    categories,
    products,
    filters,
    onFilterChange: updateFilter,
  };

  return (
    <div>
      <StockTabsToolbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="tab-content" id="pills-tabContent">
        <div
          className={`tab-pane fade ${activeTab === "low" ? "show active" : ""}`}
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <LowStocksTableCard
            filters={<LowStocksFilters {...filterProps} />}
            dataSource={dataSource}
            loading={loading}
            error={error}
            emptyMessage="No low-stock products found."
          />
        </div>
        <div
          className={`tab-pane fade ${activeTab === "out" ? "show active" : ""}`}
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <LowStocksTableCard
            filters={<OutOfStocksFilters {...filterProps} />}
            dataSource={dataSource}
            loading={loading}
            error={error}
            emptyMessage="No out-of-stock products found."
          />
        </div>
      </div>
    </div>
  );
}

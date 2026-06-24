"use client";

import LowStocksFilters from "./LowStocksFilters";
import LowStocksTableCard from "./LowStocksTableCard";
import OutOfStocksFilters from "./OutOfStocksFilters";
import StockTabsToolbar from "./StockTabsToolbar";

export default function StockTabsSection() {
  return (
    <div>
      <StockTabsToolbar />
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <LowStocksTableCard filters={<LowStocksFilters />} />
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <LowStocksTableCard filters={<OutOfStocksFilters />} />
        </div>
      </div>
    </div>
  );
}

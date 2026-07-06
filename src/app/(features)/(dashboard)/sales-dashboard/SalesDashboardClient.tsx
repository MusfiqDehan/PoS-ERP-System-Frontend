"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CommonFooter from "@/core/common/footer/commonFooter";
import BestSeller from "@/components/SalesDashboard/BestSeller";
import PageHeader from "@/components/SalesDashboard/PageHeader";
import RecentTransactions from "@/components/SalesDashboard/RecentTransactions";
import SalesAnalytics from "@/components/SalesDashboard/SalesAnalytics";
import SalesByCountries from "@/components/SalesDashboard/SalesByCountries";
import SalesCards from "@/components/SalesDashboard/SalesCards";
import { SalesDashboardProvider } from "@/hooks/dashboard/useSalesDashboard";

export default function SalesDashboardClient() {
  return (
    <PermissionGuard featureKey="dashboard">
      <SalesDashboardProvider>
        <div className="page-wrapper">
          <div className="content">
            <PageHeader />
            <SalesCards />
            <div className="row">
              <BestSeller />
              <RecentTransactions />
            </div>
            <div className="row sales-board">
              <SalesAnalytics />
              <SalesByCountries />
            </div>
          </div>
          <CommonFooter />
        </div>
      </SalesDashboardProvider>
    </PermissionGuard>
  );
}

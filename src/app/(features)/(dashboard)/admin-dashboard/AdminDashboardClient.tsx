"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CommonFooter from "@/core/common/footer/commonFooter";
import ExpiredProducts from "@/components/NewDashboard/ExpiredProducts";
import LowStockAlert from "@/components/NewDashboard/LowStockAlert";
import LowStockProducts from "@/components/NewDashboard/LowStockProducts";
import OrderStatistics from "@/components/NewDashboard/OrderStatistics";
import OverallInformation from "@/components/NewDashboard/OverallInformation";
import PageHeader from "@/components/NewDashboard/PageHeader";
import RecentSales from "@/components/NewDashboard/RecentSales";
import RecentTransactions from "@/components/NewDashboard/RecentTransactions";
import RevenueWidgets from "@/components/NewDashboard/RevenueWidgets";
import SaleWidgets from "@/components/NewDashboard/SaleWidgets";
import SalesPurchaseChart from "@/components/NewDashboard/SalesPurchaseChart";
import SalesStatistics from "@/components/NewDashboard/SalesStatistics";
import RecentlyAdded from "@/components/NewDashboard/RecentlyAdded";
import TopCategories from "@/components/NewDashboard/TopCategories";
import TopCustomers from "@/components/NewDashboard/TopCustomers";
import TopSellingProducts from "@/components/NewDashboard/TopSellingProducts";
import { SalesDashboardProvider } from "@/hooks/dashboard/useSalesDashboard";

export default function AdminDashboardClient() {
  return (
    <PermissionGuard featureKey="dashboard">
      <SalesDashboardProvider>
        <div className="page-wrapper">
          <div className="content">
            <PageHeader />
            <LowStockAlert />
            <SaleWidgets />
            <RevenueWidgets />
            <div className="row mt-4 align-items-stretch dashboard-chart-row">
              <SalesPurchaseChart />
              <OverallInformation />
            </div>
            <div className="row mt-4">
              <TopSellingProducts />
              <LowStockProducts />
              <RecentSales />
            </div>
            <div className="row align-items-stretch">
              <SalesStatistics />
              <RecentTransactions />
            </div>
            <div className="row mt-4">
              <TopCustomers />
              <TopCategories />
              <OrderStatistics />
            </div>
            <div className="row mt-4">
              <ExpiredProducts />
              <RecentlyAdded />
            </div>
          </div>
          <CommonFooter />
        </div>
      </SalesDashboardProvider>
    </PermissionGuard>
  );
}

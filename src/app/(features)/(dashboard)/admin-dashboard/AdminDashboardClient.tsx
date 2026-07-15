"use client";

import dynamic from "next/dynamic";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import CommonFooter from "@/core/common/footer/commonFooter";
import LowStockAlert from "@/components/NewDashboard/LowStockAlert";
import PageHeader from "@/components/NewDashboard/PageHeader";
import RevenueWidgets from "@/components/NewDashboard/RevenueWidgets";
import SaleWidgets from "@/components/NewDashboard/SaleWidgets";
import { SalesDashboardProvider } from "@/hooks/dashboard/useSalesDashboard";

const SalesPurchaseChart = dynamic(
  () => import("@/components/NewDashboard/SalesPurchaseChart"),
);
const OverallInformation = dynamic(
  () => import("@/components/NewDashboard/OverallInformation"),
);
const TopSellingProducts = dynamic(
  () => import("@/components/NewDashboard/TopSellingProducts"),
);
const LowStockProducts = dynamic(
  () => import("@/components/NewDashboard/LowStockProducts"),
);
const RecentSales = dynamic(() => import("@/components/NewDashboard/RecentSales"));
const SalesStatistics = dynamic(
  () => import("@/components/NewDashboard/SalesStatistics"),
);
const RecentTransactions = dynamic(
  () => import("@/components/NewDashboard/RecentTransactions"),
);
const TopCustomers = dynamic(() => import("@/components/NewDashboard/TopCustomers"));
const TopCategories = dynamic(() => import("@/components/NewDashboard/TopCategories"));
const OrderStatistics = dynamic(
  () => import("@/components/NewDashboard/OrderStatistics"),
);
const ExpiredProducts = dynamic(
  () => import("@/components/NewDashboard/ExpiredProducts"),
);
const RecentlyAdded = dynamic(() => import("@/components/NewDashboard/RecentlyAdded"));

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

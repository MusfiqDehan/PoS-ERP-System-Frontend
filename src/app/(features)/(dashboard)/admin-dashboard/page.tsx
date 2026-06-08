import CommonFooter from "@/core/common/footer/commonFooter";
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
import TopCategories from "@/components/NewDashboard/TopCategories";
import TopCustomers from "@/components/NewDashboard/TopCustomers";
import TopSellingProducts from "@/components/NewDashboard/TopSellingProducts";

export default function Dashboard() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader />
        <LowStockAlert />
        <SaleWidgets />
        <RevenueWidgets />
        <div className="row">
          <SalesPurchaseChart />
          <OverallInformation />
        </div>
        <div className="row">
          <TopSellingProducts />
          <LowStockProducts />
          <RecentSales />
        </div>
        <div className="row">
          <SalesStatistics />
          <RecentTransactions />
        </div>
        <div className="row">
          <TopCustomers />
          <TopCategories />
          <OrderStatistics />
        </div>
      </div>
      <CommonFooter />
    </div>
  );
}

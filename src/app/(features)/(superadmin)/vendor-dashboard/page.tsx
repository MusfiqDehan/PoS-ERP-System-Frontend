import CommonFooter from "@/core/common/footer/commonFooter";
import VendorPageHeader from "@/components/VendorDashboard/VendorPageHeader";
import VendorStatCards from "@/components/VendorDashboard/VendorStatCards";
import VendorCompaniesChart from "@/components/VendorDashboard/VendorCompaniesChart";
import VendorRevenueChart from "@/components/VendorDashboard/VendorRevenueChart";
import VendorTopPlans from "@/components/VendorDashboard/VendorTopPlans";
import VendorRecentlyRegistered from "@/components/VendorDashboard/VendorRecentlyRegistered";
import VendorRecentPlanExpired from "@/components/VendorDashboard/VendorRecentPlanExpired";
import VendorRecentTransactions from "@/components/VendorDashboard/VendorRecentTransactions";
import DashboardDateRange from "@/components/NewDashboard/DashboardDateRange";

export default function VendorDashboard() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="m-0 text-[22px] font-bold text-[#101828]">
              Overview Dashboard
            </h2>
            <p className="m-0 mt-0.5 text-[14px] text-[#667085]">
              Real-time platform performance &amp; metrics
            </p>
          </div>
          <div className="shrink-0">
            <DashboardDateRange />
          </div>
        </div>

        <VendorPageHeader />
        <VendorStatCards />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-4 items-stretch">
          <div className="xl:col-span-3 flex">
            <VendorCompaniesChart />
          </div>
          <div className="xl:col-span-6 flex">
            <VendorRevenueChart />
          </div>
          <div className="xl:col-span-3 flex">
            <VendorTopPlans />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
          <VendorRecentlyRegistered />
          <VendorRecentPlanExpired />
          <div className="lg:col-span-2 xl:col-span-1">
            <VendorRecentTransactions />
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
}

import CommonFooter from "@/core/common/footer/commonFooter";
import CompaniesChart from "@/components/SuperAdmin/dashboard/CompaniesChart";
import PageHeader from "@/components/SuperAdmin/dashboard/PageHeader";
import RecentPlanExpired from "@/components/SuperAdmin/dashboard/RecentPlanExpired";
import RecentTransactions from "@/components/SuperAdmin/dashboard/RecentTransactions";
import RecentlyRegistered from "@/components/SuperAdmin/dashboard/RecentlyRegistered";
import RevenueChart from "@/components/SuperAdmin/dashboard/RevenueChart";
import StatsCards from "@/components/SuperAdmin/dashboard/StatsCards";
import TopPlans from "@/components/SuperAdmin/dashboard/TopPlans";
import WelcomeBanner from "@/components/SuperAdmin/dashboard/WelcomeBanner";

export default function SuperAdminDashboard() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader />
        <WelcomeBanner />
        <StatsCards />
        <div className="row">
          <CompaniesChart />
          <RevenueChart />
          <TopPlans />
        </div>
        <div className="row">
          <RecentTransactions />
          <RecentlyRegistered />
          <RecentPlanExpired />
        </div>
      </div>
      <CommonFooter />
    </div>
  );
}

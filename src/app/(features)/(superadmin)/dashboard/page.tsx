import CommonFooter from "@/core/common/footer/commonFooter";
import DashboardWelcome from "@/components/SuperAdmin/dashboard/DashboardWelcome";
import KpiCards from "@/components/SuperAdmin/dashboard/KpiCards";
import StatStrip from "@/components/SuperAdmin/dashboard/StatStrip";
import BranchPerformance from "@/components/SuperAdmin/dashboard/BranchPerformance";
import ProfitLossChart from "@/components/SuperAdmin/dashboard/ProfitLossChart";
import CustomersHeatmap from "@/components/SuperAdmin/dashboard/CustomersHeatmap";
import BranchAttendance from "@/components/SuperAdmin/dashboard/BranchAttendance";
import OverallAttendance from "@/components/SuperAdmin/dashboard/OverallAttendance";

export default function SuperAdminDashboard() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <DashboardWelcome />
        <KpiCards />
        <StatStrip />
        <BranchPerformance />
        <div className="row g-3 mb-3">
          <div className="col-xl-8 d-flex">
            <ProfitLossChart />
          </div>
          <div className="col-xl-4 d-flex">
            <CustomersHeatmap />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-xl-8 d-flex">
            <BranchAttendance />
          </div>
          <div className="col-xl-4 d-flex">
            <OverallAttendance />
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
}

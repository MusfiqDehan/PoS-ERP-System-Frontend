import IncomeReportComponent from "@/components/Reports/incomereport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function IncomeReport() {
  return (
    <PermissionGuard featureKey="income_report">
      <IncomeReportComponent />
    </PermissionGuard>
  );
}

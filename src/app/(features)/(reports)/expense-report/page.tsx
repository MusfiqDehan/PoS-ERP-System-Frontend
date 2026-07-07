import ExpenseReportComponent from "@/components/Reports/expensereport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function ExpenseReport() {
  return (
    <PermissionGuard featureKey="expense_report">
      <ExpenseReportComponent />
    </PermissionGuard>
  );
}
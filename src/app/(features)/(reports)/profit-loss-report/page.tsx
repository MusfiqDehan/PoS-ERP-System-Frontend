import ProfitLossComponent from "@/components/Reports/profitloss";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function ProfitLossReport() {
  return (
    <PermissionGuard featureKey="profit_loss">
      <ProfitLossComponent />
    </PermissionGuard>
  );
}

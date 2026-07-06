import StockhistoryComponent from "@/components/Reports/stockhistory";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function StockHistory() {
  return (
    <PermissionGuard featureKey="inventory_report">
      <StockhistoryComponent />
    </PermissionGuard>
  );
}

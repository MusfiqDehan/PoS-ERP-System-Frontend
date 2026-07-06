import InventoryReportComponent from "@/components/Reports/inventoryreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function InventoryReport() {
  return (
    <PermissionGuard featureKey="inventory_report">
      <InventoryReportComponent />
    </PermissionGuard>
  );
}

import BestSellerComponent from "@/components/Reports/bestseller";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function BestSeller() {
  return (
    <PermissionGuard featureKey="sales_report">
      <BestSellerComponent />
    </PermissionGuard>
  );
}

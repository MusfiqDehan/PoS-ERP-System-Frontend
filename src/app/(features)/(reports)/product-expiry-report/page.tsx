import ProductExpiredreportComponent from "@/components/Reports/products-report/productexpiredreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function ProductExpiryReport() {
  return (
    <PermissionGuard featureKey="product_report">
      <ProductExpiredreportComponent />
    </PermissionGuard>
  );
}
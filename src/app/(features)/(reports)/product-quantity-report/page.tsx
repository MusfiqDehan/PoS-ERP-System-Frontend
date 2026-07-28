import ProductQualityreportComponent from "@/components/Reports/products-report/productqualityreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function ProductQualityReport() {
  return (
    <PermissionGuard featureKey="product_report">
      <ProductQualityreportComponent />
    </PermissionGuard>
  );
}

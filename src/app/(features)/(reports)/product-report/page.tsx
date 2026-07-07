import ProductreportComponent from "@/components/Reports/products-report/productreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function ProductReport() {
  return (
    <PermissionGuard featureKey="product_report">
      <ProductreportComponent />
    </PermissionGuard>
  );
}

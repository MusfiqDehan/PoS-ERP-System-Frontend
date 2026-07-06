import SupplierDueReportComponent from "@/components/Reports/supplierduereport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function SupplierDueReport(){
    return(
        <PermissionGuard featureKey="supplier_report"><SupplierDueReportComponent /></PermissionGuard>
    )
}
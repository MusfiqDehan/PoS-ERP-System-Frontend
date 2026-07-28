import SupplierReportComponent from "@/components/Reports/supplierreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function SupplierReport(){
    return(
        <PermissionGuard featureKey="supplier_report"><SupplierReportComponent /></PermissionGuard>
    )
}
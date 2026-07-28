import CustomerReportComponent from "@/components/Reports/customerreport";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function CustomerReport(){
    return(
        <PermissionGuard featureKey="customer_report"><CustomerReportComponent /></PermissionGuard>
    )
}
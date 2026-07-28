import InvoiceTemplateComponent from "@/components/settings/appsetting/invoicetemplate";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function InvoiceTemplate(){
    return(
        <PermissionGuard featureKey="app_settings"><InvoiceTemplateComponent /></PermissionGuard>
    )
}
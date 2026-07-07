import InvoicereportnewCOmponent from "@/components/Reports/invoicereportnew";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function InvoiceReport(){
    return(
        <PermissionGuard featureKey="invoice_report"><InvoicereportnewCOmponent /></PermissionGuard>
    )
}
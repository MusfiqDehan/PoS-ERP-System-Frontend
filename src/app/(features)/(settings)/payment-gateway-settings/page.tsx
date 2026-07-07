import PaymentGatewayComponent from "@/components/settings/financialsettings/paymentgateway";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function PaymentGateWaySettings(){
    return(
        <PermissionGuard featureKey="financial_settings"><PaymentGatewayComponent /></PermissionGuard>
    )
}
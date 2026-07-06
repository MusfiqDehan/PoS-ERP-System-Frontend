import SmsGatewayComponent from "@/components/settings/systemsettings/smsgateway";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function SmsGatway(){
    return(
        <PermissionGuard featureKey="system_settings"><SmsGatewayComponent /></PermissionGuard>
    )
}
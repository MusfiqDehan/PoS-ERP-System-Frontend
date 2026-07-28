import BanIpaddressComponent from "@/components/settings/othersettings/ban-ipaddress";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function BanIpAddress(){
    return(
        <PermissionGuard featureKey="general_settings"><BanIpaddressComponent /></PermissionGuard>
    )
}
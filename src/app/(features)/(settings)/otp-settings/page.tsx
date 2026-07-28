import OtpSettingsComponent from "@/components/settings/systemsettings/otpsettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function OtpSettings(){
    return(
        <PermissionGuard featureKey="system_settings"><OtpSettingsComponent /></PermissionGuard>
    )
}
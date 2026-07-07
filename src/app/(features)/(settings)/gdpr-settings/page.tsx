import GdprSettingsComponent from "@/components/settings/systemsettings/gdprsettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function GDPRSettings(){
    return(
        <PermissionGuard featureKey="system_settings"><GdprSettingsComponent /></PermissionGuard>
    )
}
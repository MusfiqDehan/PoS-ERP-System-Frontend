import PrinterSettingsCoponent from "@/components/settings/appsetting/printersettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function PrinterSettings(){
    return(
        <PermissionGuard featureKey="app_settings"><PrinterSettingsCoponent /></PermissionGuard>
    )
}
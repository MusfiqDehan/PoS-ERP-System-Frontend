import BankSettingComponent from "@/components/settings/financialsettings/banksetting";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function BankSettingsComponent(){
    return(
        <PermissionGuard featureKey="financial_settings"><BankSettingComponent /></PermissionGuard>
    )
}
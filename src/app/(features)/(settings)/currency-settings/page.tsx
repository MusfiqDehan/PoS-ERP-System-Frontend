import CurrencySettingsComponent from "@/components/settings/financialsettings/currencysettings";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function CurrencySettings(){
    return(
        <PermissionGuard featureKey="financial_settings"><CurrencySettingsComponent /></PermissionGuard>
    )
}
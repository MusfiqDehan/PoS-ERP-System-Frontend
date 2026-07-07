import SoldStockComponent from "@/components/Reports/soldstock";
import { PermissionGuard } from "@/components/auth/PermissionGuard";

export default function SoldStock(){
    return(
        <PermissionGuard featureKey="inventory_report"><SoldStockComponent /></PermissionGuard>
    )
}
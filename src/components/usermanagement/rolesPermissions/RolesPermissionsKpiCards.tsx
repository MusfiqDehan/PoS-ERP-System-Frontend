import RolesPermissionsKpiCard from "./RolesPermissionsKpiCard";
import type { RolesPermissionsKpiCardData } from "./rolesPermissionsKpiData";
import { rolesPermissionsKpiData } from "./rolesPermissionsKpiData";

const kpiGridClassName =
  "mb-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4";

function renderKpiCard(card: RolesPermissionsKpiCardData) {
  return <RolesPermissionsKpiCard key={card.id} card={card} />;
}

export default function RolesPermissionsKpiCards() {
  return (
    <div className={kpiGridClassName}>{rolesPermissionsKpiData.map(renderKpiCard)}</div>
  );
}

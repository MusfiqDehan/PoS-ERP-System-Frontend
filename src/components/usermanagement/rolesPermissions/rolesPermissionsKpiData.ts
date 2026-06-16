export type RolesPermissionsKpiBadgeVariant = "success" | "danger";

export type RolesPermissionsKpiCardData = {
  id: string;
  label: string;
  value: string;
  badgeText: string;
  badgeVariant: RolesPermissionsKpiBadgeVariant;
  iconClass: string;
};

export const rolesPermissionsKpiData: RolesPermissionsKpiCardData[] = [
  {
    id: "total-roles",
    label: "Total Roles",
    value: "5",
    badgeText: "System + Custom",
    badgeVariant: "success",
    iconClass: "ti ti-shield",
  },
  {
    id: "team-members",
    label: "Team Members",
    value: "0",
    badgeText: "No assignments yet",
    badgeVariant: "danger",
    iconClass: "ti ti-users",
  },
  {
    id: "permissions",
    label: "Permissions",
    value: "48",
    badgeText: "Across 16 feature",
    badgeVariant: "success",
    iconClass: "ti ti-shield-check",
  },
  {
    id: "editable",
    label: "Editable",
    value: "Yes",
    badgeText: "You can change roles",
    badgeVariant: "success",
    iconClass: "ti ti-user-edit",
  },
];

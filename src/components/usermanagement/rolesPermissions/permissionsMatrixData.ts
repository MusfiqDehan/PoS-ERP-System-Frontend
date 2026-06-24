/**
 * Single source of truth for access levels (order = dropdown order).
 * `AccessLevel` is derived from this tuple, so the type and the runtime key
 * list can never drift apart — no unchecked `as AccessLevel[]` casts needed.
 */
export const ACCESS_LEVEL_KEYS = ["full", "edit", "view", "none"] as const;

export type AccessLevel = (typeof ACCESS_LEVEL_KEYS)[number];

export type AccessLevelConfig = {
  label: string;
  /** Tailwind background for the badge chip. */
  bgClass: string;
  /** Tailwind text colour for label + icon. */
  textClass: string;
  /** Tabler icon class. */
  iconClass: string;
};

export const ACCESS_LEVELS: Record<AccessLevel, AccessLevelConfig> = {
  full: {
    label: "Full",
    bgClass: "bg-[#f1fcf5]",
    textClass: "text-[#237e46]",
    iconClass: "ti ti-check",
  },
  edit: {
    label: "Edit",
    bgClass: "bg-[#fef9e8]",
    textClass: "text-[#e5950d]",
    iconClass: "ti ti-edit",
  },
  view: {
    label: "View",
    bgClass: "bg-[#f6f6f6]",
    textClass: "text-[#666666]",
    iconClass: "ti ti-eye",
  },
  none: {
    label: "None",
    bgClass: "bg-[#fff0f0]",
    textClass: "text-[#c80000]",
    iconClass: "ti ti-minus",
  },
};

export type RoleColumn = {
  key: string;
  label: string;
  /** "badge" = read-only status chip, "select" = editable dropdown. */
  variant: "badge" | "select";
};

export const roleColumns: RoleColumn[] = [
  { key: "admin", label: "Admin", variant: "badge" },
  { key: "manager", label: "Manager", variant: "badge" },
  { key: "cashier", label: "Cashier", variant: "badge" },
  { key: "accountant", label: "Accountant", variant: "select" },
  { key: "auditor", label: "Auditor", variant: "select" },
  { key: "supervisor", label: "Supervisor", variant: "select" },
  { key: "storekeeper", label: "Storekeeper", variant: "select" },
];

export type PermissionRow = {
  id: string;
  feature: string;
  module: string;
  access: Record<string, AccessLevel>;
};

export const permissionsMatrixData: PermissionRow[] = [
  {
    id: "admin-dashboard",
    feature: "Admin Dashboard",
    module: "Dashboard",
    access: {
      admin: "full",
      manager: "view",
      cashier: "none",
      accountant: "view",
      auditor: "view",
      supervisor: "view",
      storekeeper: "none",
    },
  },
  {
    id: "pos",
    feature: "POS",
    module: "Sales",
    access: {
      admin: "full",
      manager: "edit",
      cashier: "full",
      accountant: "view",
      auditor: "view",
      supervisor: "edit",
      storekeeper: "view",
    },
  },
  {
    id: "products",
    feature: "Products",
    module: "Inventory",
    access: {
      admin: "full",
      manager: "edit",
      cashier: "full",
      accountant: "view",
      auditor: "view",
      supervisor: "edit",
      storekeeper: "full",
    },
  },
  {
    id: "manage-stock",
    feature: "Manage Stock",
    module: "Stock",
    access: {
      admin: "full",
      manager: "full",
      cashier: "none",
      accountant: "view",
      auditor: "view",
      supervisor: "full",
      storekeeper: "full",
    },
  },
  {
    id: "purchases",
    feature: "Purchases",
    module: "Purchases",
    access: {
      admin: "full",
      manager: "view",
      cashier: "view",
      accountant: "view",
      auditor: "view",
      supervisor: "edit",
      storekeeper: "view",
    },
  },
  {
    id: "customers",
    feature: "Customers",
    module: "Peoples",
    access: {
      admin: "full",
      manager: "full",
      cashier: "none",
      accountant: "view",
      auditor: "view",
      supervisor: "view",
      storekeeper: "none",
    },
  },
  {
    id: "hrm",
    feature: "HRM",
    module: "Employees",
    access: {
      admin: "full",
      manager: "edit",
      cashier: "none",
      accountant: "view",
      auditor: "view",
      supervisor: "view",
      storekeeper: "none",
    },
  },
  {
    id: "website-settings",
    feature: "Website Settings",
    module: "Settings",
    access: {
      admin: "full",
      manager: "view",
      cashier: "none",
      accountant: "view",
      auditor: "view",
      supervisor: "view",
      storekeeper: "none",
    },
  },
];

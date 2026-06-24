export type RoleCardData = {
  id: string;
  name: string;
  description: string;
  iconClass: string;
  /** Highlighted icon chip (e.g. the privileged Admin role). */
  highlight: boolean;
  members: number;
};

export const rolesData: RoleCardData[] = [
  {
    id: "admin",
    name: "Admin",
    description: "Full access to everything in this store.",
    iconClass: "ti ti-crown",
    highlight: true,
    members: 0,
  },
  {
    id: "manager",
    name: "Manager",
    description: "Manages members, sales, and payments.",
    iconClass: "ti ti-user",
    highlight: false,
    members: 0,
  },
  {
    id: "cashier",
    name: "Cashier",
    description: "Handles POS, sales, and daily transactions.",
    iconClass: "ti ti-cash",
    highlight: false,
    members: 0,
  },
  {
    id: "accountant",
    name: "Accountant",
    description: "Manages finances and transactions.",
    iconClass: "ti ti-calculator",
    highlight: false,
    members: 0,
  },
  {
    id: "auditor",
    name: "Auditor",
    description: "Read-only access for reports and oversight.",
    iconClass: "ti ti-user-search",
    highlight: false,
    members: 0,
  },
  {
    id: "supervisor",
    name: "Supervisor",
    description: "Oversees daily operations and staff.",
    iconClass: "ti ti-user-shield",
    highlight: false,
    members: 0,
  },
  {
    id: "storekeeper",
    name: "Storekeeper",
    description: "Manages stock, inventory, and warehouse.",
    iconClass: "ti ti-building-warehouse",
    highlight: false,
    members: 0,
  },
];

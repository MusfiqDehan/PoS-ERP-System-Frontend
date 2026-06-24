export const roleAssignmentFilters = [
  "All",
  "Admin",
  "Manager",
  "Cashier",
  "Inventory",
  "Viewer",
] as const;

export type RoleAssignment = {
  id: string;
  email: string;
  role: string;
  branch: string;
  assignedAt: string;
  assignedBy: string;
};

export const roleAssignmentsData: RoleAssignment[] = [
  {
    id: "ra-1",
    email: "rifatulsaif@gmail.com",
    role: "Manager",
    branch: "Mirpur-12",
    assignedAt: "12-02-2026",
    assignedBy: "Jamiuddin Saif",
  },
  {
    id: "ra-2",
    email: "rifatulsaif@gmail.com",
    role: "Manager",
    branch: "Mirpur-12",
    assignedAt: "12-02-2026",
    assignedBy: "Jamiuddin Saif",
  },
  {
    id: "ra-3",
    email: "rifatulsaif@gmail.com",
    role: "Manager",
    branch: "Mirpur-12",
    assignedAt: "12-02-2026",
    assignedBy: "Jamiuddin Saif",
  },
  {
    id: "ra-4",
    email: "rifatulsaif@gmail.com",
    role: "Manager",
    branch: "Mirpur-12",
    assignedAt: "12-02-2026",
    assignedBy: "Jamiuddin Saif",
  },
];

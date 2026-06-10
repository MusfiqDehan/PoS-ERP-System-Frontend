export type ExpenseListRecord = {
  id: string;
  categoryName: string;
  reference: string;
  date: string;
  status: string;
  amount: string;
  description: string;
  action: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export const expenseStatusOptions: SelectOption[] = [
  { value: "Active", label: "Approved" },
  { value: "InActive", label: "Pending" },
];

export const expenseCategoryOptions: SelectOption[] = [
  { value: "choose", label: "Choose" },
  { value: "foodsSnacks", label: "Foods & Snacks" },
  { value: "employeeBenefits", label: "Employee Benefits" },
];

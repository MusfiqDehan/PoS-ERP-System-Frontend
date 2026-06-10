export type IncomeRecord = {
  id: number;
  Date: string;
  Reference: string;
  Store: string;
  Category: string;
  Notes: string;
  Amount: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export const incomeCategoryOptions: SelectOption[] = [
  { label: "Foreign investment", value: "1" },
  { label: "Product Export", value: "2" },
];

export const incomeStoreOptions: SelectOption[] = [
  { label: "Foreign investment", value: "1" },
  { label: "Product Export", value: "2" },
];

export const incomeAccountOptions: SelectOption[] = [
  { label: "Approved", value: "1" },
  { label: "Approved", value: "2" },
];

export type SalesStatisticsMonth = {
  month: string;
  /** Revenue bar height in px (Figma). */
  revenue: number;
  /** Expense bar height in px (Figma). */
  expense: number;
};

export const salesStatisticsFilterOptions = ["Today", "Weekly", "Monthly"];

export const salesStatisticsAssets = {
  calendar: "assets/img/dashboard/top-selling-products/calendar.png",
  chevronDown: "assets/img/dashboard/top-selling-products/chevron-down.png",
  legendRevenue: "assets/img/dashboard/sales-statistics/legend-revenue.png",
  legendExpense: "assets/img/dashboard/sales-statistics/legend-expense.png",
  arrowUp: "assets/img/dashboard/sales-statistics/arrow-up.png",
  arrowDown: "assets/img/dashboard/sales-statistics/arrow-down.png",
};

export const salesStatisticsYAxisLabels = [
  "30K",
  "20K",
  "10K",
  "0",
  "-10K",
  "-20K",
  "-30K",
];

/** Bar heights from Figma node 253:3367–253:3451. */
export const salesStatisticsMonths: SalesStatisticsMonth[] = [
  { month: "Jan", revenue: 22, expense: 42 },
  { month: "Feb", revenue: 101, expense: 63 },
  { month: "Mar", revenue: 83, expense: 32 },
  { month: "Apr", revenue: 70, expense: 63 },
  { month: "May", revenue: 70, expense: 63 },
  { month: "Jun", revenue: 65, expense: 32 },
  { month: "Jul", revenue: 101, expense: 63 },
  { month: "Aug", revenue: 57, expense: 63 },
  { month: "Sep", revenue: 83, expense: 32 },
  { month: "Oct", revenue: 44, expense: 42 },
  { month: "Nov", revenue: 22, expense: 51 },
  { month: "Dec", revenue: 70, expense: 63 },
];

export const salesStatisticsLegend = {
  revenue: {
    label: "Revenue",
    value: "$48,988,078",
    valueColor: "#089b7c",
    change: "25%",
    trend: "up" as const,
  },
  expense: {
    label: "Expense",
    value: "$12,189",
    valueColor: "#c80000",
    change: "59%",
    trend: "down" as const,
  },
};

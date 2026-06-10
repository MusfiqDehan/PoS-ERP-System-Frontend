export const salesPurchasePeriods = [
  "1D",
  "1W",
  "1M",
  "3M",
  "6M",
  "1Y",
] as const;

export type SalesPurchasePeriod = (typeof salesPurchasePeriods)[number];

export type SalesPurchaseMonthData = {
  month: string;
  purchase: number;
  sales: number;
};

/** Values in K; max axis = 60K (matches Figma bar scale). */
export const salesPurchaseMonths: SalesPurchaseMonthData[] = [
  { month: "Jan", purchase: 60, sales: 16 },
  { month: "Feb", purchase: 43, sales: 26 },
  { month: "Mar", purchase: 27, sales: 10 },
  { month: "Apr", purchase: 60, sales: 16 },
  { month: "May", purchase: 48, sales: 29 },
  { month: "Jun", purchase: 60, sales: 16 },
  { month: "July", purchase: 27, sales: 10 },
  { month: "Aug", purchase: 33, sales: 19 },
  { month: "Sep", purchase: 60, sales: 48 },
  { month: "Oct", purchase: 38, sales: 5 },
  { month: "Nov", purchase: 51, sales: 33 },
  { month: "Dec", purchase: 35, sales: 16 },
];

export const salesPurchaseLegend = {
  purchase: {
    label: "Total Purchase",
    value: "49K",
    iconSrc: "assets/img/dashboard/sales-purchase/legend-purchase.png",
  },
  sales: {
    label: "Total Sales",
    value: "38K",
    iconSrc: "assets/img/dashboard/sales-purchase/legend-sales.png",
  },
};

export const salesPurchaseChartMax = 60;

export const salesPurchaseYAxisLabels = [
  "60K",
  "50K",
  "40K",
  "30K",
  "20K",
  "10K",
  "0",
];

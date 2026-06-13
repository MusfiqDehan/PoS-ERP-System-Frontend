export type SalesAnalyticsMonth = {
  month: string;
  /** Bar height in px (Figma, max 158). */
  height: number;
  tooltipValue: string;
};

export const salesAnalyticsFilterOptions = ["2025", "2024", "2023"];

export const salesAnalyticsAssets = {
  calendar: "assets/img/dashboard/top-selling-products/calendar.png",
  chevronDown: "assets/img/dashboard/top-selling-products/chevron-down.png",
};

/** Figma max bar height — used as the scale for relative bar sizes. */
export const salesAnalyticsChartMax = 158;

export const salesAnalyticsYAxisLabels = [
  "60K",
  "50K",
  "40K",
  "30K",
  "20K",
  "10K",
  "0",
];

/** Bar heights from Figma node 288:10704–288:10774. */
export const salesAnalyticsMonths: SalesAnalyticsMonth[] = [
  { month: "Jan", height: 158, tooltipValue: "$5320" },
  { month: "Feb", height: 112, tooltipValue: "$4210" },
  { month: "Mar", height: 70, tooltipValue: "$2890" },
  { month: "Apr", height: 158, tooltipValue: "$5480" },
  { month: "May", height: 126, tooltipValue: "$4675" },
  { month: "Jun", height: 158, tooltipValue: "$5320" },
  { month: "July", height: 70, tooltipValue: "$3015" },
  { month: "Aug", height: 88, tooltipValue: "$3640" },
  { month: "Sep", height: 158, tooltipValue: "$5190" },
  { month: "Oct", height: 100, tooltipValue: "$3980" },
  { month: "Nov", height: 133, tooltipValue: "$4850" },
  { month: "Dec", height: 92, tooltipValue: "$3725" },
];

export const salesAnalyticsFeaturedMonthIndex = 5;

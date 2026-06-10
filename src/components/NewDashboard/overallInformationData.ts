export type OverallStatData = {
  id: string;
  label: string;
  value: string;
  borderColor: string;
  labelColor: string;
  iconSrc: string;
  width?: number;
};

export const overallStatsData: OverallStatData[] = [
  {
    id: "suppliers",
    label: "Suppliers",
    value: "6987",
    borderColor: "#0c54b4",
    labelColor: "#214798",
    iconSrc: "assets/img/dashboard/overall-information/suppliers.png",
    width: 104,
  },
  {
    id: "customer",
    label: "Customer",
    value: "4896",
    borderColor: "#a34b17",
    labelColor: "#a34b17",
    iconSrc: "assets/img/dashboard/overall-information/customer.png",
    width: 102,
  },
  {
    id: "orders",
    label: "Orders",
    value: "487",
    borderColor: "#067860",
    labelColor: "#067860",
    iconSrc: "assets/img/dashboard/overall-information/orders.png",
    width: 104,
  },
];

/** Share of 5.5k first-time vs 3.5k return (9k total). */
export const customerOverviewChartSeries = {
  firstTimePercent: 61,
  returnPercent: 39,
  colors: {
    firstTime: "#9bc167",
    returning: "#fe9f43",
    track: "#e6eaed",
  },
};

export const customerOverviewMetrics = [
  {
    id: "first-time",
    value: "5.5k",
    label: "First Time",
    labelColor: "#9bc167",
    borderColor: "#9bc167",
    change: "25%",
  },
  {
    id: "return",
    value: "3.5k",
    label: "Return",
    labelColor: "#fe9f43",
    borderColor: "#fe9f43",
    change: "21%",
  },
];

export const customerOverviewFilterOptions = ["Today", "Weekly", "Monthly"];

export const overallInformationAssets = {
  calendar: "assets/img/dashboard/overall-information/calendar.png",
  chevronDown: "assets/img/dashboard/overall-information/chevron-down.png",
  arrowUp: "assets/img/dashboard/overall-information/arrow-up.png",
};

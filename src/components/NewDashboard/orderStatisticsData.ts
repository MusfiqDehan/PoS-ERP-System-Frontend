export type OrderStatisticsCell = {
  active: boolean;
  orders?: number;
};

export type OrderStatisticsDay = {
  id: string;
  label: string;
  cells: OrderStatisticsCell[];
};

export const orderStatisticsFilterOptions = ["Today", "Weekly", "Monthly"];

export const orderStatisticsAssets = {
  calendar: "assets/img/dashboard/top-selling-products/calendar.png",
  chevronDown: "assets/img/dashboard/top-selling-products/chevron-down.png",
};

export const orderStatisticsTimeLabels = [
  "12 PM",
  "12 PM",
  "02 PM",
  "12 AM",
  "10 AM",
  "8 AM",
  "6 AM",
  "4 AM",
  "2 AM",
];

export const orderStatisticsDays: OrderStatisticsDay[] = [
  {
    id: "mon",
    label: "Mon",
    cells: [
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: true, orders: 297 },
      { active: false },
      { active: false },
      { active: true, orders: 214 },
      { active: true, orders: 186 },
    ],
  },
  {
    id: "tue",
    label: "Tue",
    cells: [
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: true, orders: 265 },
      { active: false },
      { active: false },
      { active: true, orders: 198 },
      { active: true, orders: 172 },
    ],
  },
  {
    id: "wed",
    label: "Wed",
    cells: [
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: true, orders: 297 },
      { active: false },
      { active: false },
      { active: true, orders: 221 },
      { active: true, orders: 189 },
    ],
  },
  {
    id: "thu",
    label: "Thu",
    cells: [
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: true, orders: 156 },
      { active: false },
    ],
  },
  {
    id: "fri",
    label: "Fri",
    cells: [
      { active: false },
      { active: true, orders: 143 },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
    ],
  },
  {
    id: "sat",
    label: "Sat",
    cells: [
      { active: true, orders: 178 },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: true, orders: 132 },
      { active: false },
      { active: false },
      { active: false },
    ],
  },
  {
    id: "sun",
    label: "Sun",
    cells: [
      { active: true, orders: 165 },
      { active: false },
      { active: false },
      { active: false },
      { active: false },
      { active: true, orders: 128 },
      { active: false },
      { active: false },
      { active: false },
    ],
  },
];

export const orderStatisticsFeaturedTooltip = {
  dayIndex: 2,
  rowIndex: 4,
  orders: 297,
};

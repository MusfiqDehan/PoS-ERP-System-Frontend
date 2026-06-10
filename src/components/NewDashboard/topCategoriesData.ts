export type TopCategoryLegendItem = {
  id: string;
  label: string;
  sales: number;
  color: string;
};

export type TopCategoryStat = {
  id: string;
  label: string;
  value: string;
  borderColor: string;
};

export const topCategoriesFilterOptions = ["Today", "Weekly", "Monthly"];

export const topCategoriesAssets = {
  calendar: "assets/img/dashboard/top-selling-products/calendar.png",
  chevronDown: "assets/img/dashboard/top-selling-products/chevron-down.png",
  chart: "assets/img/dashboard/top-categories/chart.png",
};

export const topCategoriesLegend: TopCategoryLegendItem[] = [
  {
    id: "electronics",
    label: "Electronics",
    sales: 698,
    color: "#9bc163",
  },
  {
    id: "sports",
    label: "Sports",
    sales: 545,
    color: "#092c4c",
  },
  {
    id: "lifestyles",
    label: "Lifestyles",
    sales: 498,
    color: "#7364c2",
  },
  {
    id: "health",
    label: "Health",
    sales: 369,
    color: "#1eaaff",
  },
];

export const topCategoriesStats: TopCategoryStat[] = [
  {
    id: "categories",
    label: "Total Number Of Categories",
    value: "698",
    borderColor: "#3ce2be",
  },
  {
    id: "products",
    label: "Total Number Of Products",
    value: "7899",
    borderColor: "#089b7c",
  },
];

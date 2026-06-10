export type TopSellingProduct = {
  id: string;
  name: string;
  price: string;
  sales: string;
  change: string;
  trend: "up" | "down";
  imageSrc: string;
};

export const topSellingFilterOptions = ["Today", "Weekly", "Monthly"];

export const topSellingProductsAssets = {
  calendar: "assets/img/dashboard/top-selling-products/calendar.png",
  chevronDown: "assets/img/dashboard/top-selling-products/chevron-down.png",
  arrowUp: "assets/img/dashboard/top-selling-products/arrow-up.png",
  arrowDown: "assets/img/dashboard/top-selling-products/arrow-down.png",
};

export const topSellingProductsData: TopSellingProduct[] = [
  {
    id: "product-1",
    name: "Charger Cable - Lighting",
    price: "$187",
    sales: "247+ Sales",
    change: "22%",
    trend: "up",
    imageSrc: "assets/img/products/product-01.jpg",
  },
  {
    id: "product-2",
    name: "Yves Saint Eau De Parfum",
    price: "$145",
    sales: "289+ Sales",
    change: "22%",
    trend: "up",
    imageSrc: "assets/img/products/product-16.jpg",
  },
  {
    id: "product-3",
    name: "Apple Airpods 2",
    price: "$17",
    sales: "450+ Sales",
    change: "22%",
    trend: "up",
    imageSrc: "assets/img/products/product-03.jpg",
  },
  {
    id: "product-4",
    name: "Vacuum Cleaner",
    price: "$899",
    sales: "225+ Sales",
    change: "21%",
    trend: "down",
    imageSrc: "assets/img/products/product-04.jpg",
  },
  {
    id: "product-5",
    name: "Samsung Galaxy S21 Fe 5g",
    price: "$345",
    sales: "247+ Sales",
    change: "22%",
    trend: "up",
    imageSrc: "assets/img/products/product-05.jpg",
  },
];

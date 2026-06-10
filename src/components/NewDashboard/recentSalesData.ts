export type RecentSaleStatus =
  | "processing"
  | "cancelled"
  | "on-hold"
  | "completed";

export type RecentSale = {
  id: string;
  name: string;
  price: string;
  category: string;
  date: string;
  status: RecentSaleStatus;
  statusLabel: string;
  imageSrc: string;
};

export const recentSalesFilterOptions = ["Today", "Weekly", "Monthly"];

export const recentSalesAssets = {
  calendar: "assets/img/dashboard/top-selling-products/calendar.png",
  chevronDown: "assets/img/dashboard/top-selling-products/chevron-down.png",
};

export const recentSaleStatusStyles: Record<
  RecentSaleStatus,
  { background: string; color: string }
> = {
  processing: { background: "#f2f3fb", color: "#7364c2" },
  cancelled: { background: "#fff0f0", color: "#c80000" },
  "on-hold": { background: "rgba(201, 151, 0, 0.1)", color: "#c99700" },
  completed: { background: "#f1fcf5", color: "#237e46" },
};

export const recentSalesData: RecentSale[] = [
  {
    id: "sale-1",
    name: "Apple Watch Series 9",
    price: "$187",
    category: "Electronics",
    date: "Today",
    status: "processing",
    statusLabel: "Processing",
    imageSrc: "assets/img/products/product-11.jpg",
  },
  {
    id: "sale-2",
    name: "Gold Bracelet",
    price: "$887",
    category: "Fashion",
    date: "Today",
    status: "cancelled",
    statusLabel: "Cancelled",
    imageSrc: "assets/img/products/product-12.jpg",
  },
  {
    id: "sale-3",
    name: "Parachute Down Duvet",
    price: "$357",
    category: "Health",
    date: "15 Jan 2025",
    status: "on-hold",
    statusLabel: "On Hold",
    imageSrc: "assets/img/products/product-13.jpg",
  },
  {
    id: "sale-4",
    name: "YETI Rambler Tumbler",
    price: "$287",
    category: "Sports",
    date: "12 Jan 2025",
    status: "processing",
    statusLabel: "Processing",
    imageSrc: "assets/img/products/product-14.jpg",
  },
  {
    id: "sale-5",
    name: "Osmo Genius Starter Kit",
    price: "$137",
    category: "Lifestyles",
    date: "11 Jan 2025",
    status: "completed",
    statusLabel: "Completed",
    imageSrc: "assets/img/products/product-15.jpg",
  },
];

export type TopCustomer = {
  id: string;
  name: string;
  country: string;
  orders: string;
  total: string;
  imageSrc: string;
};

export const topCustomersFilterOptions = ["Today", "Weekly", "Monthly"];

export const topCustomersAssets = {
  calendar: "assets/img/dashboard/top-selling-products/calendar.png",
  chevronDown: "assets/img/dashboard/top-selling-products/chevron-down.png",
  location: "assets/img/dashboard/top-customers/location.png",
};

export const topCustomersData: TopCustomer[] = [
  {
    id: "customer-1",
    name: "Marilyn Geidt",
    country: "USA",
    orders: "21 Orders",
    total: "$8965",
    imageSrc: "assets/img/customer/customer11.jpg",
  },
  {
    id: "customer-2",
    name: "Martin Schleifer",
    country: "UAE",
    orders: "22 Orders",
    total: "$6985",
    imageSrc: "assets/img/customer/customer12.jpg",
  },
  {
    id: "customer-3",
    name: "James Dorwart",
    country: "Germany",
    orders: "14 Orders",
    total: "$5375",
    imageSrc: "assets/img/customer/customer13.jpg",
  },
  {
    id: "customer-4",
    name: "Jordyn Gouse",
    country: "Belgium",
    orders: "24 Orders",
    total: "$4995",
    imageSrc: "assets/img/customer/customer14.jpg",
  },
  {
    id: "customer-5",
    name: "Adison Franci",
    country: "Greenland",
    orders: "24 Orders",
    total: "$3665",
    imageSrc: "assets/img/customer/customer15.jpg",
  },
];

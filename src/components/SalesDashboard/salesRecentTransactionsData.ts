export type SalesTransactionStatus = "successful" | "cancelled" | "on-hold";

export type SalesRecentTransaction = {
  id: string;
  sn: number;
  productName: string;
  timeLabel: string;
  imageSrc: string;
  paymentMethod: string;
  paymentRef: string;
  status: SalesTransactionStatus;
  statusLabel: string;
  amount: string;
};

export const salesTransactionStatusStyles: Record<
  SalesTransactionStatus,
  { background: string; color: string }
> = {
  successful: {
    background: "#f1fcf5",
    color: "#237e46",
  },
  cancelled: {
    background: "#fff0f0",
    color: "#c80000",
  },
  "on-hold": {
    background: "rgba(201, 151, 0, 0.1)",
    color: "#c99700",
  },
};

export const salesRecentTransactionsData: SalesRecentTransaction[] = [
  {
    id: "sales-tx-1",
    sn: 1,
    productName: "Wireless Headphones pro",
    timeLabel: "Time : 15Mins",
    imageSrc: "assets/img/products/stock-img-02.png",
    paymentMethod: "Paypal",
    paymentRef: "#416645453773",
    status: "successful",
    statusLabel: "Successful",
    amount: "$1099.00",
  },
  {
    id: "sales-tx-2",
    sn: 2,
    productName: "Mechanical Keyboard",
    timeLabel: "Time : 15Mins",
    imageSrc: "assets/img/products/stock-img-06.png",
    paymentMethod: "Apple Pay",
    paymentRef: "#147784454554",
    status: "cancelled",
    statusLabel: "Cancelled",
    amount: "$600.55",
  },
  {
    id: "sales-tx-3",
    sn: 3,
    productName: "Phone Stand MagSafe",
    timeLabel: "Time : 15Mins",
    imageSrc: "assets/img/products/stock-img-03.png",
    paymentMethod: "Stripe",
    paymentRef: "#147784454554",
    status: "on-hold",
    statusLabel: "On Hold",
    amount: "$309.00",
  },
  {
    id: "sales-tx-4",
    sn: 4,
    productName: "Wireless Headphones pro",
    timeLabel: "Time : 15Mins",
    imageSrc: "assets/img/products/stock-img-02.png",
    paymentMethod: "Paypal",
    paymentRef: "#416645453773",
    status: "successful",
    statusLabel: "Successful",
    amount: "$1099.00",
  },
  {
    id: "sales-tx-5",
    sn: 5,
    productName: "Wireless Headphones pro",
    timeLabel: "Time : 15Mins",
    imageSrc: "assets/img/products/stock-img-02.png",
    paymentMethod: "Paypal",
    paymentRef: "#416645453773",
    status: "successful",
    statusLabel: "Successful",
    amount: "$1099.00",
  },
  {
    id: "sales-tx-6",
    sn: 6,
    productName: "Cold-Pressed Olive Oil",
    timeLabel: "Time : 22Mins",
    imageSrc: "assets/img/products/stock-img-01.png",
    paymentMethod: "Stripe",
    paymentRef: "#982341556721",
    status: "successful",
    statusLabel: "Successful",
    amount: "$45.99",
  },
];

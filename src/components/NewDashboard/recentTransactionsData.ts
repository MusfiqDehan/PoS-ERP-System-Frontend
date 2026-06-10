export type TransactionTabId =
  | "sale"
  | "purchase"
  | "quotation"
  | "expenses"
  | "invoices";

export type TransactionStatus = "completed" | "draft";

export type RecentTransaction = {
  id: string;
  date: string;
  name: string;
  referenceId: string;
  imageSrc?: string;
  status: TransactionStatus;
  statusLabel: string;
  total: string;
};

export const recentTransactionTabs: { id: TransactionTabId; label: string }[] =
  [
    { id: "sale", label: "Sale" },
    { id: "purchase", label: "Purchase" },
    { id: "quotation", label: "Quotation" },
    { id: "expenses", label: "Expenses" },
    { id: "invoices", label: "Invoices" },
  ];

export const recentTransactionStatusStyles: Record<
  TransactionStatus,
  { background: string; color: string }
> = {
  completed: { background: "#f1fcf5", color: "#237e46" },
  draft: { background: "rgba(201, 151, 0, 0.1)", color: "#c99700" },
};

const saleTransactions: RecentTransaction[] = [
  {
    id: "sale-1",
    date: "26 May 2026",
    name: "Tiana Torff",
    referenceId: "12546789",
    imageSrc: "assets/img/customer/customer16.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$4560",
  },
  {
    id: "sale-2",
    date: "26 May 2026",
    name: "Maria Torff",
    referenceId: "12546789",
    imageSrc: "assets/img/customer/customer17.jpg",
    status: "draft",
    statusLabel: "Draft",
    total: "$4560",
  },
  {
    id: "sale-3",
    date: "26 May 2026",
    name: "Madelyn George",
    referenceId: "12546789",
    imageSrc: "assets/img/customer/customer18.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$4560",
  },
  {
    id: "sale-4",
    date: "26 May 2026",
    name: "Jaydon Saris",
    referenceId: "12546789",
    imageSrc: "assets/img/customer/customer15.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$4560",
  },
];

const purchaseTransactions: RecentTransaction[] = [
  {
    id: "purchase-1",
    date: "24 May 2025",
    name: "Electro Mart",
    referenceId: "88451230",
    status: "completed",
    statusLabel: "Completed",
    total: "$1000",
  },
  {
    id: "purchase-2",
    date: "23 May 2025",
    name: "Best Accessories",
    referenceId: "77441122",
    status: "draft",
    statusLabel: "Draft",
    total: "$2300",
  },
  {
    id: "purchase-3",
    date: "22 May 2025",
    name: "A-Z Store",
    referenceId: "66330011",
    status: "completed",
    statusLabel: "Completed",
    total: "$1580",
  },
  {
    id: "purchase-4",
    date: "21 May 2025",
    name: "Hatimi Hardware",
    referenceId: "55229900",
    status: "completed",
    statusLabel: "Completed",
    total: "$4560",
  },
];

const quotationTransactions: RecentTransaction[] = [
  {
    id: "quote-1",
    date: "26 May 2026",
    name: "Andrea Willer",
    referenceId: "11458901",
    imageSrc: "assets/img/customer/customer16.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$4,560",
  },
  {
    id: "quote-2",
    date: "25 May 2026",
    name: "Timothy Sandsr",
    referenceId: "11458902",
    imageSrc: "assets/img/customer/customer17.jpg",
    status: "draft",
    statusLabel: "Draft",
    total: "$3,569",
  },
  {
    id: "quote-3",
    date: "24 May 2026",
    name: "Bonnie Rodrigues",
    referenceId: "11458903",
    imageSrc: "assets/img/customer/customer18.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$4,560",
  },
  {
    id: "quote-4",
    date: "23 May 2026",
    name: "Randy McCree",
    referenceId: "11458904",
    imageSrc: "assets/img/customer/customer15.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$2,155",
  },
];

const expenseTransactions: RecentTransaction[] = [
  {
    id: "expense-1",
    date: "26 May 2026",
    name: "Office Supplies",
    referenceId: "EXP-2201",
    status: "completed",
    statusLabel: "Completed",
    total: "$320",
  },
  {
    id: "expense-2",
    date: "25 May 2026",
    name: "Warehouse Rent",
    referenceId: "EXP-2202",
    status: "completed",
    statusLabel: "Completed",
    total: "$1,200",
  },
  {
    id: "expense-3",
    date: "24 May 2026",
    name: "Staff Travel",
    referenceId: "EXP-2203",
    status: "draft",
    statusLabel: "Draft",
    total: "$890",
  },
  {
    id: "expense-4",
    date: "23 May 2026",
    name: "Utilities",
    referenceId: "EXP-2204",
    status: "completed",
    statusLabel: "Completed",
    total: "$456",
  },
];

const invoiceTransactions: RecentTransaction[] = [
  {
    id: "invoice-1",
    date: "26 May 2026",
    name: "Tiana Torff",
    referenceId: "INV-7781",
    imageSrc: "assets/img/customer/customer16.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$4560",
  },
  {
    id: "invoice-2",
    date: "26 May 2026",
    name: "Maria Torff",
    referenceId: "INV-7782",
    imageSrc: "assets/img/customer/customer17.jpg",
    status: "draft",
    statusLabel: "Draft",
    total: "$4560",
  },
  {
    id: "invoice-3",
    date: "26 May 2026",
    name: "Madelyn George",
    referenceId: "INV-7783",
    imageSrc: "assets/img/customer/customer18.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$4560",
  },
  {
    id: "invoice-4",
    date: "26 May 2026",
    name: "Jaydon Saris",
    referenceId: "INV-7784",
    imageSrc: "assets/img/customer/customer15.jpg",
    status: "completed",
    statusLabel: "Completed",
    total: "$4560",
  },
];

export const recentTransactionsByTab: Record<
  TransactionTabId,
  RecentTransaction[]
> = {
  sale: saleTransactions,
  purchase: purchaseTransactions,
  quotation: quotationTransactions,
  expenses: expenseTransactions,
  invoices: invoiceTransactions,
};

export const recentTransactionColumnLabels: Record<
  TransactionTabId,
  { party: string }
> = {
  sale: { party: "Customer" },
  purchase: { party: "Supplier" },
  quotation: { party: "Customer" },
  expenses: { party: "Category" },
  invoices: { party: "Customer" },
};

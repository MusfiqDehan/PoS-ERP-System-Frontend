export type TransactionCustomer = {
  id: string;
  name: string;
  phone: string;
  /** Loyalty points balance — discount % = floor(points / 100) in posLoyaltyConfig. */
  points: number;
};

export type TransactionSaleType = {
  value: string;
  label: string;
};

export type TransactionPaymentMethod = {
  id: string;
  label: string;
  iconSrc: string;
  bgColor: string;
  modalTarget?: string;
  width?: "full" | "half";
};

export type TransactionSummaryLine = {
  id: string;
  label: string;
  value: string;
  variant?: "default" | "discount";
};

const PANEL_IMG = "assets/img/pos/transaction-details";

export const transactionDetailsAssets = {
  chevronDown: `${PANEL_IMG}/chevron-down.svg`,
  userPlus: `${PANEL_IMG}/user-plus.svg`,
  scan: `${PANEL_IMG}/scan.svg`,
  search: "assets/img/pos/products-panel/search.svg",
};

export const defaultTransactionCustomer: TransactionCustomer = {
  id: "walk-in",
  name: "Walk-in Customer",
  phone: "",
  points: 0,
};

export const transactionCustomers: TransactionCustomer[] = [
  defaultTransactionCustomer,
  {
    id: "1",
    name: "Miraz Hossian",
    phone: "01700000000",
    points: 220,
  },
  {
    id: "2",
    name: "John Smith",
    phone: "01711223344",
    points: 85,
  },
  {
    id: "3",
    name: "Ana Williams",
    phone: "01822334455",
    points: 140,
  },
  {
    id: "4",
    name: "Elza Karim",
    phone: "01933445566",
    points: 310,
  },
  {
    id: "5",
    name: "Mirazul Islam",
    phone: "01755667788",
    points: 95,
  },
  {
    id: "6",
    name: "James Anderson",
    phone: "01666778899",
    points: 148,
  },
];

export function filterTransactionCustomers(
  query: string,
  customers: TransactionCustomer[] = transactionCustomers,
): TransactionCustomer[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return customers;
  }

  return customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(normalizedQuery) ||
      customer.phone.toLowerCase().includes(normalizedQuery),
  );
}

export const transactionSaleTypes: TransactionSaleType[] = [
  { value: "retails", label: "Retails" },
  { value: "wholesale", label: "Wholesale" },
];

export const transactionPaymentMethods: TransactionPaymentMethod[] = [
  {
    id: "card",
    label: "Card",
    iconSrc: `${PANEL_IMG}/card.svg`,
    bgColor: "#4687f4",
    modalTarget: "#pos-finalize-sale",
  },
  {
    id: "giftcard",
    label: "Giftcard",
    iconSrc: `${PANEL_IMG}/giftcard.svg`,
    bgColor: "#fe9f43",
    modalTarget: "#pos-finalize-sale",
  },
  {
    id: "cheque",
    label: "Cheque",
    iconSrc: `${PANEL_IMG}/cheque.png`,
    bgColor: "#0bdbae",
    modalTarget: "#pos-finalize-sale",
  },
  {
    id: "cash",
    label: "Cash",
    iconSrc: `${PANEL_IMG}/cash.png`,
    bgColor: "#f5805a",
    modalTarget: "#pos-finalize-sale",
    width: "half",
  },
  {
    id: "mobile-banking",
    label: "Mobile Banking",
    iconSrc: `${PANEL_IMG}/mobile-banking.png`,
    bgColor: "#d8526e",
    modalTarget: "#pos-finalize-sale",
    width: "half",
  },
];

import { formatCurrency } from "@/lib/currency";

export type PosCustomerOption = {
  value: string;
  label: string;
};

export type PosCartItem = {
  id: string;
  name: string;
  price: string;
};

export type PosPaymentMethod = {
  id: string;
  label: string;
  iconSrc: string;
  modalTarget?: string;
};

export type PosFooterAction = {
  id: string;
  label: string;
  iconClass: string;
  buttonClass: string;
  modalTarget?: string;
};

export const posCustomerOptions: PosCustomerOption[] = [
  { value: "1", label: "Walk in Customer" },
  { value: "2", label: "John" },
  { value: "3", label: "Smith" },
  { value: "4", label: "Ana" },
  { value: "5", label: "Elza" },
];

export const posCartItems: PosCartItem[] = [
  { id: "1", name: "iPhone 14 64GB", price: formatCurrency(158000) },
  { id: "2", name: "Red Nike Angelo", price: formatCurrency(3980) },
  { id: "3", name: "Tablet 1.02 inch", price: formatCurrency(30000) },
  { id: "4", name: "IdeaPad Slim 3i", price: formatCurrency(30000) },
];

export const posPaymentMethods: PosPaymentMethod[] = [
  {
    id: "cash",
    label: "Cash",
    iconSrc: "assets/img/icons/cash-icon.svg",
    modalTarget: "#payment-cash",
  },
  {
    id: "card",
    label: "Card",
    iconSrc: "assets/img/icons/card.svg",
    modalTarget: "#payment-card",
  },
  {
    id: "points",
    label: "Points",
    iconSrc: "assets/img/icons/points.svg",
    modalTarget: "#payment-points",
  },
  {
    id: "deposit",
    label: "Deposit",
    iconSrc: "assets/img/icons/deposit.svg",
    modalTarget: "#payment-deposit",
  },
  {
    id: "cheque",
    label: "Cheque",
    iconSrc: "assets/img/icons/cheque.svg",
    modalTarget: "#payment-cheque",
  },
  {
    id: "gift-card",
    label: "Gift Card",
    iconSrc: "assets/img/icons/giftcard.svg",
    modalTarget: "#gift-payment",
  },
  {
    id: "scan",
    label: "Scan",
    iconSrc: "assets/img/icons/scan-icon.svg",
    modalTarget: "#scan-payment",
  },
  { id: "pay-later", label: "Pay Later", iconSrc: "assets/img/icons/paylater.svg" },
  { id: "external", label: "External", iconSrc: "assets/img/icons/external.svg" },
  {
    id: "split-bill",
    label: "Split Bill",
    iconSrc: "assets/img/icons/split-bill.svg",
    modalTarget: "#split-payment",
  },
];

export const posFooterActions: PosFooterAction[] = [
  {
    id: "hold",
    label: "Hold",
    iconClass: "ti ti-player-pause",
    buttonClass: "btn btn-orange",
    modalTarget: "#hold-order",
  },
  {
    id: "void",
    label: "Void",
    iconClass: "ti ti-trash",
    buttonClass: "btn btn-info",
  },
  {
    id: "payment",
    label: "Payment",
    iconClass: "ti ti-cash-banknote",
    buttonClass: "btn btn-cyan",
    modalTarget: "#payment-completed",
  },
  {
    id: "view-orders",
    label: "View Orders",
    iconClass: "ti ti-shopping-cart",
    buttonClass: "btn btn-secondary",
    modalTarget: "#orders",
  },
  {
    id: "reset",
    label: "Reset",
    iconClass: "ti ti-reload",
    buttonClass: "btn btn-indigo",
    modalTarget: "#reset",
  },
  {
    id: "transaction",
    label: "Transaction",
    iconClass: "ti ti-refresh-dot",
    buttonClass: "btn btn-danger",
    modalTarget: "#recents",
  },
];

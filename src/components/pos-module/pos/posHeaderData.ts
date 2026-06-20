import { brandAssets } from "@/lib/branding";

export type PosHeaderAction = {
  id: string;
  iconSrc: string;
  width: number;
  height: number;
  label: string;
  href?: string;
  modalTarget?: string;
};

export type PosHeaderStore = {
  id: string;
  name: string;
  imageSrc: string;
};

export const posHeaderAssets = {
  companyLogo: brandAssets.logo,
  keyboard: "assets/img/pos/header/keyboard.svg",
  cash: "assets/img/pos/header/cash.svg",
  printer: "assets/img/pos/header/printer.svg",
  clock: "assets/img/pos/header/clock.svg",
  chart: "assets/img/pos/header/chart.svg",
  calculator: "assets/img/pos/header/calculator.svg",
  settings: "assets/img/pos/header/settings.svg",
  store: "assets/img/pos/header/store.png",
  chevronDown: "assets/img/pos/header/chevron-down.svg",
  avatar: "assets/img/pos/header/avatar.png",
};

export const posHeaderUser = {
  name: "Jamiuddin Saif",
  avatarSrc: posHeaderAssets.avatar,
  role: "Super Admin",
};

export const posHeaderStores: PosHeaderStore[] = [
  {
    id: "mirpur-12",
    name: "Mirpur-12",
    imageSrc: posHeaderAssets.store,
  },
  {
    id: "freshmart",
    name: "Freshmart",
    imageSrc: "assets/img/store/store-01.png",
  },
  {
    id: "grocery-apex",
    name: "Grocery Apex",
    imageSrc: "assets/img/store/store-02.png",
  },
  {
    id: "grocery-bevy",
    name: "Grocery Bevy",
    imageSrc: "assets/img/store/store-03.png",
  },
];

export const posHeaderActions: PosHeaderAction[] = [
  {
    id: "keyboard",
    iconSrc: posHeaderAssets.keyboard,
    width: 24,
    height: 24,
    label: "Keyboard shortcuts",
    modalTarget: "#pos-keyboard-shortcuts",
  },
  {
    id: "cash",
    iconSrc: posHeaderAssets.cash,
    width: 28,
    height: 28,
    label: "Cash register",
    modalTarget: "#pos-cash-register",
  },
  {
    id: "printer",
    iconSrc: posHeaderAssets.printer,
    width: 20,
    height: 20,
    label: "Print last receipt",
    modalTarget: "#pos-print-receipt",
  },
  {
    id: "clock",
    iconSrc: posHeaderAssets.clock,
    width: 20,
    height: 20,
    label: "Today's sale",
    modalTarget: "#pos-today-sale",
  },
  {
    id: "chart",
    iconSrc: posHeaderAssets.chart,
    width: 20,
    height: 20,
    label: "Today's profit",
    modalTarget: "#pos-today-profit",
  },
  {
    id: "calculator",
    iconSrc: posHeaderAssets.calculator,
    width: 20,
    height: 20,
    label: "Calculator",
    modalTarget: "#pos-calculator",
  },
  {
    id: "settings",
    iconSrc: posHeaderAssets.settings,
    width: 20,
    height: 20,
    label: "POS settings",
  },
];

export type PosTodayStat = {
  label: string;
  value: string;
};

export const posTodaySaleStats: PosTodayStat[] = [
  { label: "Total Sales", value: "$12,480.00" },
  { label: "Transactions", value: "86" },
  { label: "Items Sold", value: "342" },
  { label: "Avg. Order Value", value: "$145.12" },
];

export const posTodayProfitStats: PosTodayStat[] = [
  { label: "Gross Profit", value: "$3,920.00" },
  { label: "Net Profit", value: "$3,145.00" },
  { label: "Profit Margin", value: "25.2%" },
  { label: "Expenses", value: "$775.00" },
];

export type PosKeyboardShortcut = {
  keys: string;
  description: string;
};

export const posKeyboardShortcuts: PosKeyboardShortcut[] = [
  { keys: "F1", description: "Open keyboard shortcuts" },
  { keys: "F2", description: "Focus product search" },
  { keys: "F4", description: "Open cash register" },
  { keys: "F8", description: "Hold current order" },
  { keys: "F9", description: "Start new order" },
  { keys: "Ctrl + P", description: "Print last receipt" },
  { keys: "Ctrl + Enter", description: "Complete sale" },
];

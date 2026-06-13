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
  companyLogo: "assets/img/pos/header/company-logo.png",
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
    href: "#",
  },
  {
    id: "cash",
    iconSrc: posHeaderAssets.cash,
    width: 28,
    height: 28,
    label: "Cash register",
    modalTarget: "#cash-register",
  },
  {
    id: "printer",
    iconSrc: posHeaderAssets.printer,
    width: 20,
    height: 20,
    label: "Print last receipt",
    href: "#",
  },
  {
    id: "clock",
    iconSrc: posHeaderAssets.clock,
    width: 20,
    height: 20,
    label: "Today's sale",
    modalTarget: "#today-sale",
  },
  {
    id: "chart",
    iconSrc: posHeaderAssets.chart,
    width: 20,
    height: 20,
    label: "Today's profit",
    modalTarget: "#today-profit",
  },
  {
    id: "calculator",
    iconSrc: posHeaderAssets.calculator,
    width: 20,
    height: 20,
    label: "Calculator",
    modalTarget: "#calculator",
  },
  {
    id: "settings",
    iconSrc: posHeaderAssets.settings,
    width: 20,
    height: 20,
    label: "POS settings",
  },
];

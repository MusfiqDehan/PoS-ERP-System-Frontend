import { formatCurrency } from "@/lib/currency";

export type PosStockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type PosProduct = {
  id: string;
  /** Base catalog product id; defaults to `id` when omitted (mock/static data). */
  productId?: string;
  variantId?: string | null;
  packageId?: string | null;
  entityType?: "product" | "variant" | "package";
  name: string;
  sku: string;
  price: string;
  stockLabel: string;
  stockStatus: PosStockStatus;
  imageSrc: string;
  categoryId: string;
};

export type PosProductFilter = {
  id: string;
  label: string;
  count: string;
};

const PANEL_IMG = "assets/img/pos/products-panel";

export const posProductFilters: PosProductFilter[] = [
  { id: "all", label: "All Products", count: "1012" },
  { id: "electronics", label: "Electronics", count: "78" },
  { id: "grocery", label: "Grocery", count: "213" },
  { id: "health", label: "Health", count: "101" },
  { id: "clothing", label: "Clothing", count: "76" },
  { id: "household", label: "Household", count: "53" },
  { id: "baby-care", label: "Baby & Care", count: "42" },
];

export const posProducts: PosProduct[] = [
  {
    id: "p-01",
    name: "Wireless Headphones pro",
    sku: "98765478",
    price: formatCurrency(4233),
    stockLabel: "18 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-01.png`,
    categoryId: "electronics",
  },
  {
    id: "p-02",
    name: "USB-C Hub 7-Port",
    sku: "12567898",
    price: formatCurrency(2999),
    stockLabel: "12 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-02.png`,
    categoryId: "electronics",
  },
  {
    id: "p-03",
    name: "Mechanical Keyboard",
    sku: "98765478",
    price: formatCurrency(8999),
    stockLabel: "3 left",
    stockStatus: "low-stock",
    imageSrc: `${PANEL_IMG}/product-03.png`,
    categoryId: "electronics",
  },
  {
    id: "p-04",
    name: "Phone Stand MagSafe",
    sku: "34567890",
    price: formatCurrency(1499),
    stockLabel: "30 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-04.png`,
    categoryId: "electronics",
  },
  {
    id: "p-05",
    name: "Organic Oats 1kg",
    sku: "65783423",
    price: formatCurrency(449),
    stockLabel: "30 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-05.png`,
    categoryId: "grocery",
  },
  {
    id: "p-06",
    name: "Cold-Pressed Olive Oil",
    sku: "12349804",
    price: formatCurrency(1233),
    stockLabel: "5 left",
    stockStatus: "low-stock",
    imageSrc: `${PANEL_IMG}/product-06.png`,
    categoryId: "grocery",
  },
  {
    id: "p-07",
    name: "Greek Yogurt 500g",
    sku: "45678978",
    price: formatCurrency(533),
    stockLabel: "21 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-07.png`,
    categoryId: "grocery",
  },
  {
    id: "p-08",
    name: "Artisanal Coffee Beans 500g",
    sku: "23456703",
    price: formatCurrency(4800),
    stockLabel: "84 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-08.png`,
    categoryId: "grocery",
  },
  {
    id: "p-09",
    name: "Vitamin C 1000mg",
    sku: "78902312",
    price: formatCurrency(1299),
    stockLabel: "2 left",
    stockStatus: "low-stock",
    imageSrc: `${PANEL_IMG}/product-09.png`,
    categoryId: "health",
  },
  {
    id: "p-10",
    name: "Hand Sanitizer 250ml",
    sku: "98765478",
    price: formatCurrency(4233),
    stockLabel: "18 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-10.png`,
    categoryId: "health",
  },
  {
    id: "p-11",
    name: "Omega-3 Fish Oil",
    sku: "09654788",
    price: formatCurrency(1499),
    stockLabel: "25 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-11.png`,
    categoryId: "health",
  },
  {
    id: "p-12",
    name: "Digital Thermometer",
    sku: "89076543",
    price: formatCurrency(899),
    stockLabel: "No Stock",
    stockStatus: "out-of-stock",
    imageSrc: `${PANEL_IMG}/product-12.png`,
    categoryId: "health",
  },
  {
    id: "p-13",
    name: "Canvas Sneakers",
    sku: "33445566",
    price: formatCurrency(6999),
    stockLabel: "12 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-13.png`,
    categoryId: "clothing",
  },
  {
    id: "p-14",
    name: "Merino Wool Scarf",
    sku: "55667788",
    price: formatCurrency(3490),
    stockLabel: "17 in stock",
    stockStatus: "in-stock",
    imageSrc: `${PANEL_IMG}/product-14.png`,
    categoryId: "clothing",
  },
  {
    id: "p-15",
    name: "Cotton Linen Shirt",
    sku: "11223344",
    price: formatCurrency(4999),
    stockLabel: "No Stock",
    stockStatus: "out-of-stock",
    imageSrc: `${PANEL_IMG}/product-15.png`,
    categoryId: "clothing",
  },
];

export const posProductsPanelAssets = {
  search: `${PANEL_IMG}/search.svg`,
  scan: `${PANEL_IMG}/scan.svg`,
  category: `${PANEL_IMG}/category.png`,
  brand: `${PANEL_IMG}/brand.png`,
  notification: `${PANEL_IMG}/notification.svg`,
  chevronRight: `${PANEL_IMG}/chevron-right.svg`,
};

export function getFilteredPosProducts(
  activeTab: string,
  searchQuery: string,
): PosProduct[] {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  return posProducts.filter((product) => {
    const matchesCategory =
      activeTab === "all" || product.categoryId === activeTab;
    const matchesSearch =
      !normalizedSearch ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.sku.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

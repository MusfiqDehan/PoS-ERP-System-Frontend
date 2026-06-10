export type LowStockProduct = {
  id: string;
  name: string;
  productId: string;
  stock: number;
  imageSrc: string;
};

export const lowStockProductsData: LowStockProduct[] = [
  {
    id: "low-stock-1",
    name: "Vacuum Cleaner Robot",
    productId: "9400047",
    stock: 10,
    imageSrc: "assets/img/products/product-07.jpg",
  },
  {
    id: "low-stock-2",
    name: "Dell XPS 13",
    productId: "66581478",
    stock: 3,
    imageSrc: "assets/img/products/product-06.jpg",
  },
  {
    id: "low-stock-3",
    name: "KitchenAid Stand Mixer",
    productId: "3255699",
    stock: 5,
    imageSrc: "assets/img/products/product-08.jpg",
  },
  {
    id: "low-stock-4",
    name: "Levi's Trucker Jacket",
    productId: "1245886",
    stock: 2,
    imageSrc: "assets/img/products/product-09.jpg",
  },
  {
    id: "low-stock-5",
    name: "Lay's Classic",
    productId: "3655867",
    stock: 9,
    imageSrc: "assets/img/products/product-10.jpg",
  },
];

export const formatLowStockCount = (stock: number) =>
  String(stock).padStart(2, "0");

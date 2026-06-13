export type BestSellerProduct = {
  id: string;
  name: string;
  price: string;
  sales: number;
  imageSrc: string;
};

export const bestSellerData: BestSellerProduct[] = [
  {
    id: "best-seller-1",
    name: "Cold-Pressed Olive Oil",
    price: "$12.33",
    sales: 345,
    imageSrc: "assets/img/products/stock-img-01.png",
  },
  {
    id: "best-seller-2",
    name: "Wireless Headphones pro",
    price: "$43.33",
    sales: 234,
    imageSrc: "assets/img/products/stock-img-02.png",
  },
  {
    id: "best-seller-3",
    name: "Mechanical Keyboard",
    price: "$89.99",
    sales: 657,
    imageSrc: "assets/img/products/stock-img-06.png",
  },
  {
    id: "best-seller-4",
    name: "Phone Stand MagSafe",
    price: "$14.99",
    sales: 765,
    imageSrc: "assets/img/products/stock-img-03.png",
  },
  {
    id: "best-seller-5",
    name: "Greek Yogurt 500g",
    price: "$5.33",
    sales: 123,
    imageSrc: "assets/img/products/stock-img-04.png",
  },
];

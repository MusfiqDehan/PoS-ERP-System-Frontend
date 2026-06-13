export const salesCardsAssets = {
  weeklyEarningDeco:
    "assets/img/dashboard/sales-cards/weekly-earning-deco.png",
  totalSalesDeco: "assets/img/dashboard/sales-cards/total-sales-deco.png",
  purchasedGoodsDeco:
    "assets/img/dashboard/sales-cards/purchased-goods-deco.png",
  avgOrderDeco: "assets/img/dashboard/sales-cards/avg-order-deco.svg",
  arrowUp: "assets/img/dashboard/sales-cards/arrow-up.svg",
  mastercard: "assets/img/dashboard/sales-cards/mastercard.svg",
  refresh: "assets/img/dashboard/sales-cards/refresh.svg",
};

export const weeklyEarningCard = {
  title: "Weekly Earning",
  value: "$48,988,078",
  changeLabel: "+48% vs Last Week",
};

export type SalesStatCard = {
  id: string;
  title: string;
  value: string;
  badge: string;
  variant: "sales" | "purchased" | "avg-order";
  decoSrc: string;
  trendBadge?: boolean;
};

export const salesStatCards: SalesStatCard[] = [
  {
    id: "total-sales",
    title: "Total Sales",
    value: "100000+",
    badge: "No Of Total Sales",
    variant: "sales",
    decoSrc: salesCardsAssets.totalSalesDeco,
  },
  {
    id: "purchased-goods",
    title: "Purchased Goods",
    value: "800+",
    badge: "No Of Purchased Goods",
    variant: "purchased",
    decoSrc: salesCardsAssets.purchasedGoodsDeco,
  },
  {
    id: "avg-order-value",
    title: "Avg Order Value",
    value: "$489.88",
    badge: "+12% vs Last Month",
    variant: "avg-order",
    decoSrc: salesCardsAssets.avgOrderDeco,
    trendBadge: true,
  },
];

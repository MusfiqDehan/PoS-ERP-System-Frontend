import { all_routes } from "@/data/all_routes";

export type RevenueStatData = {
  id: string;
  value: string;
  label: string;
  change: string;
  trend: "up" | "down";
  borderColor: string;
  iconBg: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  viewAllHref: string;
};

export const revenueStatsData: RevenueStatData[] = [
  {
    id: "profit",
    value: "$8,458,798",
    label: "Profit",
    change: "+35%",
    trend: "up",
    borderColor: "#c1f1d2",
    iconBg: "#089b7c",
    iconSrc: "assets/img/dashboard/revenue-stats/profit.png",
    iconWidth: 18,
    iconHeight: 18,
    viewAllHref: all_routes.profitloss,
  },
  {
    id: "invoice-due",
    value: "$48,988,78",
    label: "Invoice Due",
    change: "-19%",
    trend: "down",
    borderColor: "#ffdddd",
    iconBg: "#c80000",
    iconSrc: "assets/img/dashboard/revenue-stats/invoice-due.png",
    iconWidth: 18,
    iconHeight: 18,
    viewAllHref: all_routes.invoicereport,
  },
  {
    id: "total-expenses",
    value: "$8,980,097",
    label: "Total Expenses",
    change: "+41%",
    trend: "up",
    borderColor: "#dbeafe",
    iconBg: "#4687f4",
    iconSrc: "assets/img/dashboard/revenue-stats/total-expenses.png",
    iconWidth: 22,
    iconHeight: 22,
    viewAllHref: all_routes.expenselist,
  },
  {
    id: "payment-returns",
    value: "$8,458,798",
    label: "Total Payment Returns",
    change: "-19%",
    trend: "down",
    borderColor: "#fde3d7",
    iconBg: "#f5845f",
    iconSrc: "assets/img/dashboard/revenue-stats/payment-returns.png",
    iconWidth: 18,
    iconHeight: 18,
    viewAllHref: all_routes.salesreport,
  },
];

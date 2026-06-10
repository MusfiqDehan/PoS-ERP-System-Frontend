export type KpiCardData = {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  accentColor: string;
  iconBg: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  iconCircleInset?: boolean;
  iconPadLeft?: number;
  titleMuted?: boolean;
};

export const kpiCardsData: KpiCardData[] = [
  {
    id: "total-sales",
    title: "Total Sales",
    value: "$48,988,078",
    change: "+22%",
    trend: "up",
    accentColor: "#9bc163",
    iconBg: "#f5f9ec",
    iconSrc: "assets/img/dashboard/kpi/total-sales.png",
    iconWidth: 24,
    iconHeight: 24,
  },
  {
    id: "total-sales-return",
    title: "Total Sales Return",
    value: "$16,478,145",
    change: "-22%",
    trend: "down",
    accentColor: "#fe9f43",
    iconBg: "#ffedd4",
    iconSrc: "assets/img/dashboard/kpi/total-sales-return.png",
    iconWidth: 28,
    iconHeight: 28,
    iconPadLeft: 15,
    titleMuted: true,
  },
  {
    id: "total-purchase",
    title: "Total Purchase",
    value: "$24,145,789",
    change: "+22%",
    trend: "up",
    accentColor: "#7364c2",
    iconBg: "#f2f3fb",
    iconSrc: "assets/img/dashboard/kpi/total-purchase.png",
    iconWidth: 24,
    iconHeight: 24,
    titleMuted: true,
  },
  {
    id: "total-purchase-return",
    title: "Total Purchase Return",
    value: "$18,458,747",
    change: "+22%",
    trend: "up",
    accentColor: "#f075af",
    iconBg: "#fdf2f7",
    iconSrc: "assets/img/dashboard/kpi/total-purchase-return.png",
    iconWidth: 24,
    iconHeight: 24,
    iconCircleInset: true,
    titleMuted: true,
  },
];

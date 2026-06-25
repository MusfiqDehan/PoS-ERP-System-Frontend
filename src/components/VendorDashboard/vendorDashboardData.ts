export type VendorStatData = {
  id: string;
  icon: string;
  iconBg: string;
  value: string;
  label: string;
  trend: "up" | "down";
  change: string;
};

export const vendorStatsData: VendorStatData[] = [
  {
    id: "companies",
    icon: "ti ti-building",
    iconBg: "#0ac79e",
    value: "5,465",
    label: "Total Companies",
    trend: "up",
    change: "+19.01%",
  },
  {
    id: "active",
    icon: "ti ti-carousel-vertical",
    iconBg: "#4687f4",
    value: "4,598",
    label: "Active Companies",
    trend: "down",
    change: "-12%",
  },
  {
    id: "subscribers",
    icon: "ti ti-chalkboard-off",
    iconBg: "#7364c2",
    value: "3,698",
    label: "Total Subscribers",
    trend: "up",
    change: "+6%",
  },
  {
    id: "earnings",
    icon: "ti ti-businessplan",
    iconBg: "#f075af",
    value: "$89,878.58",
    label: "Total Earnings",
    trend: "down",
    change: "-16%",
  },
];

export type RegisteredCompany = {
  id: string;
  name: string;
  icon: string;
  plan: string;
  users: string;
};

function iconPath(name: string): string {
  // company-icon-*.svg live under assets/img/icons/, company-*.svg under assets/img/company/
  return name.startsWith("company-icon-")
    ? `assets/img/icons/${name}`
    : `assets/img/company/${name}`;
}

export const recentlyRegisteredData: RegisteredCompany[] = [
  { id: "r1", name: "Pitch", icon: iconPath("company-icon-11.svg"), plan: "Basic (Monthly)", users: "150 Users" },
  { id: "r2", name: "Initech", icon: iconPath("company-icon-12.svg"), plan: "Enterprise (Yearly)", users: "200 Users" },
  { id: "r3", name: "Umbrella Corp", icon: iconPath("company-icon-13.svg"), plan: "Advanced (Monthly)", users: "129 Users" },
  { id: "r4", name: "Capital Partners", icon: iconPath("company-icon-14.svg"), plan: "Enterprise (Monthly)", users: "103 Users" },
  { id: "r5", name: "Massive Dynamic", icon: iconPath("company-icon-15.svg"), plan: "Premium (Yearly)", users: "108 Users" },
];

export type ExpiredPlan = {
  id: string;
  name: string;
  icon: string;
  expiredDate: string;
};

export const expiredPlansData: ExpiredPlan[] = [
  { id: "e1", name: "Silicon Corp", icon: iconPath("company-icon-16.svg"), expiredDate: "10 Apr 2025" },
  { id: "e2", name: "Hubspot", icon: iconPath("company-icon-14.svg"), expiredDate: "12 Jun 2025" },
  { id: "e3", name: "Licon Industries", icon: iconPath("company-icon-18.svg"), expiredDate: "16 Jun 2025" },
  { id: "e4", name: "TerraFusion Energy", icon: iconPath("company-07.svg"), expiredDate: "12 May 2025" },
  { id: "e5", name: "Epicurean Delights", icon: iconPath("company-08.svg"), expiredDate: "15 May 2025" },
];

export type PlanRequest = {
  id: string;
  name: string;
  domain: string;
  icon: string;
};

export const planRequestsData: PlanRequest[] = [
  { id: "p1", name: "Silicon Corp", domain: "silicon.example.com", icon: iconPath("company-icon-16.svg") },
  { id: "p2", name: "Hubspot", domain: "hubspot.example.com", icon: iconPath("company-icon-14.svg") },
  { id: "p3", name: "Licon Industries", domain: "licon.example.com", icon: iconPath("company-icon-18.svg") },
  { id: "p4", name: "TerraFusion Energy", domain: "fusion.example.com", icon: iconPath("company-07.svg") },
  { id: "p5", name: "Epicurean Delights", domain: "epicuran.example.com", icon: iconPath("company-08.svg") },
];

export type Transaction = {
  id: string;
  name: string;
  icon: string;
  invoice: string;
  date: string;
  amount: string;
  plan: string;
};

export const recentTransactionsData: Transaction[] = [
  { id: "t1", name: "Stellar Dynamics", icon: iconPath("company-02.svg"), invoice: "#12457", date: "14 Jan 2025", amount: "+$245", plan: "Basic" },
  { id: "t2", name: "Quantum Nexus", icon: iconPath("company-03.svg"), invoice: "#65974", date: "14 Jan 2025", amount: "+$395", plan: "Enterprise" },
  { id: "t3", name: "Aurora Technologies", icon: iconPath("company-04.svg"), invoice: "#89623", date: "13 Jan 2025", amount: "+$499", plan: "Premium" },
  { id: "t4", name: "Massive Dynamic", icon: iconPath("company-05.svg"), invoice: "#25669", date: "13 Jan 2025", amount: "+$179", plan: "Basic" },
  { id: "t5", name: "Mercury Corp", icon: iconPath("company-06.svg"), invoice: "#96589", date: "13 Jan 2025", amount: "+$849", plan: "Enterprise" },
];

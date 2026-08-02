"use client";

import dynamic from "next/dynamic";
import HeaderSwitcher from "@/core/common/header/HeaderSwitcher";
import Sidebar from "@/core/common/sidebar/sidebar";

const HorizontalSidebar = dynamic(
  () => import("@/core/common/sidebar/horizontalSidebar"),
);
const TwoColumnSidebar = dynamic(
  () => import("@/core/common/sidebar/two-column"),
);
const ThemeSettings = dynamic(
  () => import("@/core/common/sidebar/themeSettings"),
);

type FeatureLayoutChromeProps = {
  children: React.ReactNode;
};

export default function FeatureLayoutChrome({
  children,
}: FeatureLayoutChromeProps) {
  return (
    <div className="main-wrapper">
      <HeaderSwitcher />
      <Sidebar />
      <HorizontalSidebar />
      <TwoColumnSidebar />
      <ThemeSettings />
      {children}
    </div>
  );
}

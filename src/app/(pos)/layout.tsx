
import PosHeader from "@/components/pos-module/pos/posHeader";
import ThemeSettings from "@/core/common/sidebar/themeSettings";

export default function PosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pos-layout-shell">
      <PosHeader />
      <ThemeSettings />
      {children}
    </div>
  );
}

import dynamic from "next/dynamic";
import PosHeader from "@/components/pos-module/pos/posHeader";
import { SessionGuard } from "@/components/auth/SessionGuard";
import { AuthProvider } from "@/providers/auth-provider";
import { BranchProvider } from "@/providers/branch-provider";

const ThemeSettings = dynamic(
  () => import("@/core/common/sidebar/themeSettings"),
);

export default function PosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SessionGuard>
        <BranchProvider>
          <div className="pos-layout-shell">
            <PosHeader />
            <ThemeSettings />
            {children}
          </div>
        </BranchProvider>
      </SessionGuard>
    </AuthProvider>
  );
}

import PosHeader from "@/components/pos-module/pos/posHeader";
import ThemeSettings from "@/core/common/sidebar/themeSettings";
import { SessionGuard } from "@/components/auth/SessionGuard";
import { AuthProvider } from "@/providers/auth-provider";
import { BranchProvider } from "@/providers/branch-provider";

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

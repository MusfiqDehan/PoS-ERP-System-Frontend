import Header from "@/core/common/header/header";
import HorizontalSidebar from "@/core/common/sidebar/horizontalSidebar";
import Sidebar from "@/core/common/sidebar/sidebar";
import ThemeSettings from "@/core/common/sidebar/themeSettings";
import TwoColumnSidebar from "@/core/common/sidebar/two-column";
import { SessionGuard } from "@/components/auth/SessionGuard";
import { AuthProvider } from "@/providers/auth-provider";
import { BranchProvider } from "@/providers/branch-provider";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SessionGuard>
        <BranchProvider>
          <div className="main-wrapper">
            <Header />
            <Sidebar />
            <HorizontalSidebar />
            <TwoColumnSidebar />
            <ThemeSettings />
            {children}
          </div>
        </BranchProvider>
      </SessionGuard>
    </AuthProvider>
  );
}

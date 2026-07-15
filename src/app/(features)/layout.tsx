import FeatureLayoutChrome from "@/core/common/FeatureLayoutChrome";
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
          <FeatureLayoutChrome>{children}</FeatureLayoutChrome>
        </BranchProvider>
      </SessionGuard>
    </AuthProvider>
  );
}

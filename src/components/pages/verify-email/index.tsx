import { Suspense } from "react";
import { AuthCardPageLayout } from "@/core/common/auth";
import VerifyEmailPanel from "./VerifyEmailPanel";

export default function VerifyEmailPage() {
  return (
    <AuthCardPageLayout>
      <Suspense fallback={null}>
        <VerifyEmailPanel />
      </Suspense>
    </AuthCardPageLayout>
  );
}

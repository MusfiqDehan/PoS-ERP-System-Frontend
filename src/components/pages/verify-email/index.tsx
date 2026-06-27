import { Suspense } from "react";
import { AuthBrandPanel } from "@/core/common/auth";
import VerifyEmailPanel from "./VerifyEmailPanel";

export default function VerifyEmailPage() {
  return (
    <div className="auth-split-page auth-register-page">
      <div className="auth-split-page__layout">
        <AuthBrandPanel />
        <Suspense fallback={null}>
          <VerifyEmailPanel />
        </Suspense>
      </div>
    </div>
  );
}

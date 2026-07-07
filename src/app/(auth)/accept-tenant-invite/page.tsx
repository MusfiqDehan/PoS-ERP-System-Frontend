import { Suspense } from "react";
import AcceptTenantInvitePage from "@/components/pages/accept-tenant-invite";

export default function AcceptTenantInvite() {
  return (
    <Suspense
      fallback={
        <div className="auth-split-page auth-reset-password-page">
          <div className="auth-split-page__layout">
            <section className="auth-split-page__form-panel">
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e7e7e7] border-t-[#089b7c]" />
                  <span className="text-sm text-[#666666]">Loading...</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      }
    >
      <AcceptTenantInvitePage />
    </Suspense>
  );
}

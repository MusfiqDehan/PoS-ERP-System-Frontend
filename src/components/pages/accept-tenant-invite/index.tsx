"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCardPageLayout } from "@/core/common/auth";
import TenantInviteFormPanel from "./TenantInviteFormPanel";
import { validateTenantInvitation, type TenantInvitation } from "@/lib/platform";

function InviteStatusCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="auth-split-page__form-panel">
      <div className="auth-split-page__form auth-card-page__card">
        <div className="auth-split-page__form-top">
          <div className="auth-split-page__form-main">{children}</div>
        </div>
      </div>
    </section>
  );
}

function LoadingScreen() {
  return (
    <AuthCardPageLayout>
      <InviteStatusCard>
        <div className="flex flex-col items-center gap-3 py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e7e7e7] border-t-[#089b7c]" />
          <span className="text-sm text-[#666666]">Verifying invitation...</span>
        </div>
      </InviteStatusCard>
    </AuthCardPageLayout>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <AuthCardPageLayout>
      <InviteStatusCard>
        <div className="flex flex-col items-center gap-3 px-2 py-6 text-center">
          <i className="ti ti-alert-circle text-[32px] text-[#dc3545]" />
          <h2 className="m-0 text-lg font-semibold text-[#333333]">
            Invalid invitation
          </h2>
          <p className="m-0 max-w-xs text-sm text-[#666666]">{message}</p>
        </div>
      </InviteStatusCard>
    </AuthCardPageLayout>
  );
}

export default function AcceptTenantInvitePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [state, setState] = useState<{
    status: "loading" | "valid" | "invalid";
    invitation?: TenantInvitation;
    error?: string;
  }>({ status: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ status: "invalid", error: "No invitation token found in the URL." });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await validateTenantInvitation(token);
        if (cancelled) return;
        if (res.ok && res.body.success && res.body.data) {
          setState({ status: "valid", invitation: res.body.data });
        } else {
          setState({
            status: "invalid",
            error: res.body.message || "This invitation is invalid or has expired.",
          });
        }
      } catch {
        if (!cancelled) {
          setState({ status: "invalid", error: "Unable to verify invitation." });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (state.status === "loading") return <LoadingScreen />;
  if (state.status === "invalid") {
    return <ErrorScreen message={state.error ?? "Unknown error"} />;
  }

  return (
    <AuthCardPageLayout>
      <TenantInviteFormPanel token={token} invitation={state.invitation!} />
    </AuthCardPageLayout>
  );
}

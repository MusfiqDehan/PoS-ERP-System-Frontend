"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AuthBrandPanel, AUTH_SIGN_IN_LOTTIE_SRC } from "@/core/common/auth";
import EmployeeInviteFormPanel from "./EmployeeInviteFormPanel";
import { validateEmployeeInvitationToken, type ValidateInvitationTokenResult } from "@/lib/roles";

function LoadingScreen() {
  return (
    <div className="auth-split-page auth-reset-password-page">
      <div className="auth-split-page__layout">
        <AuthBrandPanel lottieSrc={AUTH_SIGN_IN_LOTTIE_SRC} />
        <section className="auth-split-page__form-panel">
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e7e7e7] border-t-[#089b7c]" />
              <span className="text-sm text-[#666666]">Verifying invitation...</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="auth-split-page auth-reset-password-page">
      <div className="auth-split-page__layout">
        <AuthBrandPanel lottieSrc={AUTH_SIGN_IN_LOTTIE_SRC} />
        <section className="auth-split-page__form-panel">
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center px-6">
              <i className="ti ti-alert-circle text-[32px] text-[#dc3545]" />
              <h2 className="m-0 text-lg font-semibold text-[#333333]">Invalid invitation</h2>
              <p className="m-0 max-w-xs text-sm text-[#666666]">{message}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function AcceptEmployeeInvitePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [state, setState] = useState<{
    status: "loading" | "valid" | "invalid";
    invitation?: ValidateInvitationTokenResult;
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
        const res = await validateEmployeeInvitationToken(token);
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
    return () => { cancelled = true; };
  }, [token]);

  if (state.status === "loading") return <LoadingScreen />;
  if (state.status === "invalid") return <ErrorScreen message={state.error ?? "Unknown error"} />;

  return (
    <div className="auth-split-page auth-reset-password-page">
      <div className="auth-split-page__layout">
        <AuthBrandPanel lottieSrc={AUTH_SIGN_IN_LOTTIE_SRC} />
        <EmployeeInviteFormPanel token={token} invitation={state.invitation!} />
      </div>
    </div>
  );
}

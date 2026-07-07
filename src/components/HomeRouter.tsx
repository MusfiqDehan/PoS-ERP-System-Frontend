"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LandingPage from "@/components/landing";
import TenantLandingPage from "@/components/tenant-landing";
import { all_routes } from "@/data/all_routes";
import {
  fetchPublicTenantLanding,
  normalizeLandingPage,
  type PublicTenantLanding,
} from "@/lib/tenant-landing";

type RouteState =
  | { kind: "loading" }
  | { kind: "platform" }
  | { kind: "tenant"; data: PublicTenantLanding }
  | { kind: "redirect_signin" };

export default function HomeRouter() {
  const router = useRouter();
  const [state, setState] = useState<RouteState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      const result = await fetchPublicTenantLanding();
      if (cancelled) return;

      if (result.ok && result.body.success && result.body.data) {
        const raw = result.body.data;
        setState({
          kind: "tenant",
          data: {
            ...raw,
            landing_page: normalizeLandingPage(raw.landing_page),
          },
        });
        return;
      }

      if (result.status === 403) {
        setState({ kind: "redirect_signin" });
        router.replace(all_routes.signin);
        return;
      }

      setState({ kind: "platform" });
    }

    void resolve();
    return function cleanup() {
      cancelled = true;
    };
  }, [router]);

  if (state.kind === "loading" || state.kind === "redirect_signin") {
    return (
      <div className="landing-page landing-page--loading" aria-busy="true">
        <p className="landing-page__status">Loading…</p>
      </div>
    );
  }

  if (state.kind === "tenant") {
    return <TenantLandingPage data={state.data} />;
  }

  return <LandingPage />;
}

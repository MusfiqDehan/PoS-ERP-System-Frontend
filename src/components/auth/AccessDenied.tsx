"use client";

import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { all_routes } from "@/data/all_routes";

export function AccessDenied() {
  const { sessionKind } = useAuth();

  const dashboardHref =
    sessionKind === "platform"
      ? all_routes.vendorDashboard
      : all_routes.newdashboard;

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
          <div className="text-center" style={{ maxWidth: 480 }}>
            <div className="mb-4">
              <i
                className="ti ti-shield-lock"
                style={{ fontSize: 64, color: "var(--bs-danger, #dc2626)" }}
              />
            </div>
            <h2 className="mb-3">Permission Denied</h2>
            <p className="text-muted mb-4">
              You don&apos;t have permission to access this page. Contact your
              administrator for access.
            </p>
            <Link href={dashboardHref} className="btn btn-primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { usePermission, type PermissionLevel } from "@/hooks/usePermission";
import { AccessDenied } from "./AccessDenied";

type Props = {
  featureKey: string;
  requiredLevel?: PermissionLevel;
  children: ReactNode;
};

/**
 * Wraps a page or section that requires a specific feature permission.
 *
 * Renders children when the user has at least `requiredLevel` for `featureKey`,
 * otherwise shows the AccessDenied screen.
 */
export function PermissionGuard({
  featureKey,
  requiredLevel = "view",
  children,
}: Props) {
  const { allowed, loading } = usePermission(featureKey, requiredLevel);

  if (loading) return null;

  if (!allowed) return <AccessDenied />;

  return <>{children}</>;
}

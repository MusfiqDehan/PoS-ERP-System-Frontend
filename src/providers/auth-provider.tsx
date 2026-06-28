"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  deriveAccessTier,
  removeLegacyAppRole,
  type AppTier,
  type PlatformAccessPayload,
  type TenantAccessPayload,
} from "@/data/rolePermissions";
import {
  fetchPlatformPermissions,
  fetchTenantPermissions,
  type TenantAccessResponse,
} from "@/lib/access";
import {
  clearSession,
  getAccessToken,
  getSessionKind,
  type SessionKind,
} from "@/lib/auth-session";

export type AuthContextValue = {
  loading: boolean;
  sessionKind: SessionKind | null;
  tier: AppTier | null;
  platformAccess: PlatformAccessPayload | null;
  tenantAccess: TenantAccessPayload | null;
  refreshAccess: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toTenantAccess(data: TenantAccessResponse): TenantAccessPayload {
  return {
    role_slugs: data.role_slugs ?? [],
    is_tenant_admin: Boolean(data.is_tenant_admin),
    permissions: data.permissions ?? {},
    enabled_features: data.enabled_features ?? [],
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [sessionKind, setSessionKind] = useState<SessionKind | null>(null);
  const [platformAccess, setPlatformAccess] =
    useState<PlatformAccessPayload | null>(null);
  const [tenantAccess, setTenantAccess] = useState<TenantAccessPayload | null>(
    null,
  );

  const resetAuth = useCallback(() => {
    setSessionKind(null);
    setPlatformAccess(null);
    setTenantAccess(null);
  }, []);

  const refreshAccess = useCallback(async () => {
    removeLegacyAppRole();
    const token = getAccessToken();
    const kind = getSessionKind();

    if (!token || !kind) {
      resetAuth();
      setLoading(false);
      return;
    }

    setLoading(true);
    setSessionKind(kind);

    if (kind === "platform") {
      const result = await fetchPlatformPermissions(token);
      if (!result.ok || !result.body.success || !result.body.data) {
        clearSession();
        resetAuth();
        setLoading(false);
        return;
      }
      setPlatformAccess(result.body.data);
      setTenantAccess(null);
      setLoading(false);
      return;
    }

    const result = await fetchTenantPermissions(token);
    if (!result.ok || !result.body.success || !result.body.data) {
      clearSession();
      resetAuth();
      setLoading(false);
      return;
    }
    setTenantAccess(toTenantAccess(result.body.data));
    setPlatformAccess(null);
    setLoading(false);
  }, [resetAuth]);

  useEffect(() => {
    void refreshAccess();
  }, [refreshAccess]);

  const logout = useCallback(() => {
    clearSession();
    resetAuth();
  }, [resetAuth]);

  const tier = deriveAccessTier(sessionKind, tenantAccess);

  const value = useMemo<AuthContextValue>(
    () => ({
      loading,
      sessionKind,
      tier,
      platformAccess,
      tenantAccess,
      refreshAccess,
      logout,
    }),
    [
      loading,
      sessionKind,
      tier,
      platformAccess,
      tenantAccess,
      refreshAccess,
      logout,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

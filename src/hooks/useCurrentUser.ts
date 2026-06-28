"use client";

import { useEffect, useState } from "react";
import { getMe, type CurrentUser } from "@/lib/tenancy";
import { getStoredTokens, clearStoredTokens } from "@/lib/api";

type UseCurrentUserResult = {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
};

/**
 * Fetch the currently logged-in tenant user from GET /api/v1/tenancy/me/.
 * Returns null when no JWT token is stored (user not logged in).
 */
export function useCurrentUser(): UseCurrentUserResult {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const tokens = getStoredTokens();

    if (!tokens?.access) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getMe()
      .then(({ ok, body }) => {
        if (!active) return;
        if (ok && body.success && body.data) {
          setUser(body.data);
        } else if (body.error_code === "TOKEN_EXPIRED" || !ok) {
          clearStoredTokens();
          setError(body.message || "Session expired.");
        } else {
          setError(body.message || "Could not load user profile.");
        }
      })
      .catch(() => {
        if (active) setError("Could not load user profile.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { user, loading, error };
}

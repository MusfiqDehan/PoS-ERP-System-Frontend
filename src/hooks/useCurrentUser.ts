"use client";

import { useEffect, useState } from "react";
import { getMe, type CurrentUser } from "@/lib/tenancy";
import { getAccessToken, getSessionKind } from "@/lib/auth-session";

type UseCurrentUserResult = {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
};

/**
 * Fetch the currently logged-in tenant user from GET /api/v1/tenancy/me/.
 * Only runs for "tenant" sessions; returns null for "platform" sessions.
 * Does NOT clear tokens — that's the AuthProvider's responsibility.
 */
export function useCurrentUser(): UseCurrentUserResult {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const token = getAccessToken();
    const kind = getSessionKind();

    // No token or not a tenant session — bail without fetching.
    if (!token || kind !== "tenant") {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getMe(token)
      .then(({ ok, body }) => {
        if (!active) return;
        if (ok && body.success && body.data) {
          setUser(body.data);
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

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchRoles,
  fetchUserRoleAssignments,
  type TenantRole,
  type UserRoleAssignment,
} from "@/lib/roles";
import { fetchTenantUsers, type TenantUser } from "@/lib/users";
import { getAccessToken } from "@/lib/auth-session";

export type RolesPermissionsData = {
  roles: TenantRole[];
  assignments: UserRoleAssignment[];
  users: TenantUser[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

export function useRolesPermissions(): RolesPermissionsData {
  const [roles, setRoles] = useState<TenantRole[]>([]);
  const [assignments, setAssignments] = useState<UserRoleAssignment[]>([]);
  const [users, setUsers] = useState<TenantUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [rolesRes, assignmentsRes, usersRes] = await Promise.all([
        fetchRoles(token),
        fetchUserRoleAssignments(token),
        fetchTenantUsers(token),
      ]);

      if (rolesRes.ok && rolesRes.body.data) {
        setRoles(rolesRes.body.data);
      }
      if (assignmentsRes.ok && assignmentsRes.body.data) {
        setAssignments(assignmentsRes.body.data);
      }
      if (usersRes.ok && usersRes.body.data) {
        setUsers(usersRes.body.data);
      }

      const hasFailure =
        !rolesRes.ok || !assignmentsRes.ok || !usersRes.ok;
      if (hasFailure) {
        setError("Some data could not be loaded. Please try again.");
      }
    } catch {
      setError("Failed to load roles and permissions data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { roles, assignments, users, loading, error, reload };
}

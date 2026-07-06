"use client";

import { useState, useEffect, useCallback } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchUnits,
  createUnit,
  updateUnit,
  deleteUnit,
  type Unit,
  type CreateUnitPayload,
  type UpdateUnitPayload,
} from "@/lib/inventory";

export function useUnits() {
  const [dataSource, setDataSource] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchUnits(getAccessToken());
    if (result.ok && result.body.data) {
      setDataSource(extractListItems<Unit>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load units.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addUnit = useCallback(
    async (payload: CreateUnitPayload): Promise<boolean> => {
      const result = await createUnit(payload, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  const editUnit = useCallback(
    async (id: string, payload: UpdateUnitPayload): Promise<boolean> => {
      const result = await updateUnit(id, payload, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  const removeUnit = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await deleteUnit(id, getAccessToken());
      if (result.ok) {
        await load();
        return true;
      }
      return false;
    },
    [load],
  );

  return { dataSource, loading, error, reload: load, addUnit, editUnit, removeUnit };
}

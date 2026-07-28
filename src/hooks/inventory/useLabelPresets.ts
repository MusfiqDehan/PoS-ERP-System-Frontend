"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import { extractListItems } from "@/lib/api";
import {
  fetchLabelPresets,
  type LabelCodeType,
  type LabelPreset,
} from "@/lib/labels";

export type LabelSizeMode = "preset" | "custom";

export function useLabelPresets(codeType: LabelCodeType) {
  const [presets, setPresets] = useState<LabelPreset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetchLabelPresets(getAccessToken(), codeType);
    if (result.ok && result.body.data) {
      setPresets(extractListItems<LabelPreset>(result.body.data));
    } else {
      setError(result.body.message ?? "Failed to load label presets.");
    }
    setLoading(false);
  }, [codeType]);

  useEffect(() => {
    load();
  }, [load]);

  const systemPresets = useMemo(
    () => presets.filter((p) => p.is_system),
    [presets],
  );
  const customPresets = useMemo(
    () => presets.filter((p) => !p.is_system),
    [presets],
  );

  return { presets, systemPresets, customPresets, loading, error, reload: load };
}

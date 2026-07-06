"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccessToken } from "@/lib/auth-session";
import {
  fetchPosConfig,
  updatePosConfig,
  fetchPaymentMethods,
  type PosConfig,
  type PaymentMethod,
} from "@/lib/pos";
import {
  fetchPosReceiptConfig,
  updatePosReceiptConfig,
  normalizeEnabledFields,
  normalizeEnabledOutputs,
  type PosReceiptConfig,
  type PosReceiptConfigPatch,
} from "@/lib/posConfiguration";
import { decimalToTaxPercent, taxPercentToDecimal } from "@/lib/posConfigUtils";
import { useActiveBranch } from "@/providers/branch-provider";
import { useAuth } from "@/providers/auth-provider";

export type PosSettingsScope = "tenant" | "branch";

export type PosSettingsFormState = {
  taxEnabled: boolean;
  taxPercent: number;
  currency: string;
  loyaltyEnabled: boolean;
  pointsPerDiscountPercent: number;
  maxLoyaltyDiscountPercent: number;
  pointsPerCurrencyUnit: string;
  minSubtotalToEarnPoints: string;
  lowStockThreshold: number;
  scanSoundEnabled: boolean;
  enabledFields: Record<string, boolean>;
  enabledOutputs: Record<string, boolean>;
  headerText: string;
  footerText: string;
  returnPolicyText: string;
  defaultOutputChannel: string;
  defaultFormatter: string;
  paperProfile: string;
};

function configToForm(config: PosConfig, receipt: PosReceiptConfig): PosSettingsFormState {
  return {
    taxEnabled: config.tax_enabled,
    taxPercent: decimalToTaxPercent(config.tax_rate),
    currency: config.currency,
    loyaltyEnabled: config.loyalty_enabled,
    pointsPerDiscountPercent: config.points_per_discount_percent,
    maxLoyaltyDiscountPercent: config.max_loyalty_discount_percent,
    pointsPerCurrencyUnit: config.points_per_currency_unit,
    minSubtotalToEarnPoints: config.min_subtotal_to_earn_points,
    lowStockThreshold: config.low_stock_threshold,
    scanSoundEnabled: config.scan_sound_enabled ?? true,
    enabledFields: normalizeEnabledFields(
      receipt.available_fields,
      receipt.enabled_fields,
    ),
    enabledOutputs: normalizeEnabledOutputs(
      receipt.available_outputs,
      receipt.enabled_outputs,
    ),
    headerText: receipt.header_text ?? "",
    footerText: receipt.footer_text ?? "",
    returnPolicyText: receipt.return_policy_text ?? "",
    defaultOutputChannel: receipt.default_output_channel,
    defaultFormatter: receipt.default_formatter,
    paperProfile: receipt.paper_profile,
  };
}

export function usePosSettings() {
  const { tier } = useAuth();
  const { branches, activeBranch, canSwitchBranch } = useActiveBranch();

  const [scope, setScope] = useState<PosSettingsScope>("tenant");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [posConfig, setPosConfig] = useState<PosConfig | null>(null);
  const [receiptConfig, setReceiptConfig] = useState<PosReceiptConfig | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [form, setForm] = useState<PosSettingsFormState | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isTenantAdmin = tier === "owner";
  const branchId = scope === "branch" ? activeBranch?.id ?? null : null;

  const canEditTenantScope = isTenantAdmin;
  const canEditBranchScope = Boolean(activeBranch?.id);
  const canSave =
    scope === "tenant" ? canEditTenantScope : canEditBranchScope;

  const branchOptions = useMemo(
    () => branches.map((branch) => ({ value: branch.id, label: branch.name })),
    [branches],
  );

  const load = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setFeedback(null);

    const effectiveBranchId = scope === "branch" ? activeBranch?.id ?? null : null;

    const [configRes, receiptRes, methodsRes] = await Promise.all([
      fetchPosConfig(token, effectiveBranchId),
      fetchPosReceiptConfig(token, effectiveBranchId),
      fetchPaymentMethods({ active: true }, token),
    ]);

    if (!configRes.ok || !configRes.body.data) {
      setFeedback({
        type: "error",
        message: configRes.body.message ?? "Failed to load POS configuration.",
      });
      setLoading(false);
      return;
    }

    if (!receiptRes.ok || !receiptRes.body.data) {
      setFeedback({
        type: "error",
        message: receiptRes.body.message ?? "Failed to load receipt configuration.",
      });
      setLoading(false);
      return;
    }

    setPosConfig(configRes.body.data);
    setReceiptConfig(receiptRes.body.data);
    setForm(configToForm(configRes.body.data, receiptRes.body.data));

    if (methodsRes.ok && methodsRes.body.data) {
      const raw = methodsRes.body.data;
      const list = Array.isArray(raw)
        ? raw
        : (raw as { items?: PaymentMethod[] }).items ?? [];
      setPaymentMethods(list);
    }

    setLoading(false);
  }, [activeBranch?.id, scope]);

  useEffect(() => {
    if (!isTenantAdmin && activeBranch) {
      setScope("branch");
    }
  }, [activeBranch, isTenantAdmin]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateForm = useCallback(
    (patch: Partial<PosSettingsFormState>) => {
      setForm((current) => (current ? { ...current, ...patch } : current));
    },
    [],
  );

  const toggleReceiptField = useCallback((key: string, enabled: boolean) => {
    setForm((current) => {
      if (!current) return current;
      return {
        ...current,
        enabledFields: { ...current.enabledFields, [key]: enabled },
      };
    });
  }, []);

  const toggleReceiptOutput = useCallback((key: string, enabled: boolean) => {
    setForm((current) => {
      if (!current) return current;
      return {
        ...current,
        enabledOutputs: { ...current.enabledOutputs, [key]: enabled },
      };
    });
  }, []);

  const save = useCallback(async () => {
    if (!form || !canSave) {
      return;
    }

    const token = getAccessToken();
    if (!token) {
      return;
    }

    setSaving(true);
    setFeedback(null);

    const effectiveBranchId = scope === "branch" ? activeBranch?.id ?? null : null;

    const posPayload: Partial<PosConfig> = {
      tax_enabled: form.taxEnabled,
      tax_rate: taxPercentToDecimal(form.taxPercent),
      currency: form.currency,
      loyalty_enabled: form.loyaltyEnabled,
      points_per_discount_percent: form.pointsPerDiscountPercent,
      max_loyalty_discount_percent: form.maxLoyaltyDiscountPercent,
      points_per_currency_unit: form.pointsPerCurrencyUnit,
      min_subtotal_to_earn_points: form.minSubtotalToEarnPoints,
      low_stock_threshold: form.lowStockThreshold,
      scan_sound_enabled: form.scanSoundEnabled,
    };

    const receiptPayload: PosReceiptConfigPatch = {
      enabled_fields: form.enabledFields,
      enabled_outputs: form.enabledOutputs,
      header_text: form.headerText,
      footer_text: form.footerText,
      return_policy_text: form.returnPolicyText,
      default_output_channel: form.defaultOutputChannel,
      default_formatter: form.defaultFormatter,
      paper_profile: form.paperProfile,
    };

    const [configRes, receiptRes] = await Promise.all([
      updatePosConfig(posPayload, token, effectiveBranchId),
      updatePosReceiptConfig(receiptPayload, token, effectiveBranchId),
    ]);

    if (!configRes.ok || !receiptRes.ok) {
      setFeedback({
        type: "error",
        message:
          configRes.body.message ??
          receiptRes.body.message ??
          "Failed to save POS settings.",
      });
      setSaving(false);
      return;
    }

    if (configRes.body.data && receiptRes.body.data) {
      setPosConfig(configRes.body.data);
      setReceiptConfig(receiptRes.body.data);
      setForm(configToForm(configRes.body.data, receiptRes.body.data));
    }

    setFeedback({ type: "success", message: "POS settings saved successfully." });
    setSaving(false);
  }, [activeBranch?.id, canSave, form, scope]);

  const reset = useCallback(() => {
    if (posConfig && receiptConfig) {
      setForm(configToForm(posConfig, receiptConfig));
      setFeedback(null);
    }
  }, [posConfig, receiptConfig]);

  return {
    scope,
    setScope,
    isTenantAdmin,
    canSwitchBranch,
    canSave,
    branchOptions,
    activeBranch,
    loading,
    saving,
    form,
    receiptConfig,
    paymentMethods,
    feedback,
    setFeedback,
    updateForm,
    toggleReceiptField,
    toggleReceiptOutput,
    save,
    reset,
    reload: load,
  };
}

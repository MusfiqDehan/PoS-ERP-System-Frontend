"use client";

import { useEffect, useState } from "react";
import {
  fetchTenantGateway,
  saveTenantGateway,
  deleteTenantGateway,
  type TenantPaymentGatewayConfig,
} from "@/lib/tenant-billing";
import { getAccessToken } from "@/lib/auth-session";

type Props = {
  gatewaySlug: string;
  gatewayName: string;
  gatewayIcon?: string;
  gatewayDescription?: string;
  refreshKey?: number;
};

const inputCls =
  "w-full border border-[#e7e7e7] rounded-md px-3 py-2 text-[13px] text-[#212B36] placeholder:text-[#9aa0a6] focus:border-[#0ac79e] focus:outline-none focus:ring-1 focus:ring-[#0ac79e] transition-colors";

export default function TenantPaymentGatewayCard({
  gatewaySlug, gatewayName, gatewayIcon, gatewayDescription, refreshKey,
}: Props) {
  const [config, setConfig] = useState<TenantPaymentGatewayConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState("{}");
  const [isSandbox, setIsSandbox] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(function () {
    const token = getAccessToken();
    if (!token) return;
    setLoading(true);
    fetchTenantGateway(gatewaySlug).then(function (result) {
      if (result.ok && result.body.success && result.body.data) {
        const cfg = result.body.data;
        setConfig(cfg);
        setIsSandbox(cfg.is_sandbox);
        setIsActive(cfg.is_active);
        setShowForm(true);
      }
      setLoading(false);
    });
  }, [gatewaySlug, refreshKey]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const token = getAccessToken();
    if (!token) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    let parsed: Record<string, unknown> = {};
    try { parsed = JSON.parse(credentials); } catch {
      setError("Invalid JSON in credentials.");
      setSaving(false);
      return;
    }
    try {
      const result = await saveTenantGateway(gatewaySlug, {
        credentials: parsed, is_sandbox: isSandbox, is_active: isActive,
      });
      if (result.ok && result.body.success) {
        setSuccess(true);
        setConfig(result.body.data as TenantPaymentGatewayConfig);
        setTimeout(function () { setSuccess(false); }, 3000);
      } else {
        setError(result.body.message || "Failed to save.");
      }
    } catch { setError("Unable to reach the server."); }
    finally { setSaving(false); }
  }

  async function handleDisconnect() {
    const token = getAccessToken();
    if (!token) return;
    setSaving(true);
    try { await deleteTenantGateway(gatewaySlug); setConfig(null); setShowForm(false); }
    catch { setError("Failed to disconnect."); }
    finally { setSaving(false); }
  }

  if (loading) {
    return (
      <div className="card flex-fill animate-pulse">
        <div className="card-body">
          <div className="h-4 bg-[#f1f1f1] rounded w-20 mb-3" />
          <div className="h-3 bg-[#f1f1f1] rounded w-32" />
        </div>
      </div>
    );
  }

  const connected = config && config.is_active;

  return (
    <div className="card flex-fill">
      <div className="card-body">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {gatewayIcon ? <i className={`${gatewayIcon} text-lg text-[#646B72]`} /> : null}
            <h6 className="m-0 text-[14px] font-semibold text-[#212B36]">{gatewayName}</h6>
          </div>
          <span
            className={
              "inline-flex items-center gap-1 px-2 py-[3px] rounded text-[11px] font-medium " +
              (connected ? "bg-[#E7FBF7] text-[#0ac79e]" : "bg-[#f6f6f6] text-[#646B72]")
            }
          >
            <i className="ti ti-point-filled" />
            {connected ? "Connected" : "Not Configured"}
          </span>
        </div>

        {gatewayDescription ? (
          <p className="text-[12px] text-[#646B72] mb-3">{gatewayDescription}</p>
        ) : null}

        {showForm ? (
          <form onSubmit={handleSave} className="space-y-3">
            <textarea
              className={`${inputCls} min-h-[80px] font-mono text-[12px]`}
              value={credentials}
              onChange={function (e) { setCredentials(e.target.value); }}
              placeholder='{"api_key": "...", "secret": "..."}'
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 text-[13px] text-[#212B36] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#0ac79e]" checked={isSandbox} onChange={function (e) { setIsSandbox(e.target.checked); }} />
                Sandbox mode
              </label>
              <label className="flex items-center gap-1.5 text-[13px] text-[#212B36] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#0ac79e]" checked={isActive} onChange={function (e) { setIsActive(e.target.checked); }} />
                Active
              </label>
            </div>
            {error ? <p className="text-[12px] text-[#c80000]">{error}</p> : null}
            {success ? <p className="text-[12px] text-[#0ac79e]">Saved successfully.</p> : null}
            <div className="flex items-center gap-2">
              <button type="submit" disabled={saving} className="btn btn-sm btn-primary">
                {saving ? "Saving..." : "Save"}
              </button>
              {connected ? (
                <button type="button" onClick={handleDisconnect} disabled={saving} className="btn btn-sm btn-outline-danger">
                  Disconnect
                </button>
              ) : null}
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={function () { setShowForm(true); }}
            className="btn btn-sm btn-outline-secondary w-100"
          >
            <i className="ti ti-plug-connected me-1" />
            Configure
          </button>
        )}
      </div>
    </div>
  );
}

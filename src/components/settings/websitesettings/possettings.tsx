"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import Select from "react-select";
import { PermissionGuard } from "@/components/auth/PermissionGuard";
import SettingsSideBar from "../settingssidebar";
import CommonFooter from "@/core/common/footer/commonFooter";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import { usePosSettings, type PosSettingsScope } from "@/hooks/settings/usePosSettings";
import { usePermission } from "@/hooks/usePermission";
import PosSettingsTaxSection from "./pos-settings/PosSettingsTaxSection";
import PosSettingsLoyaltySection from "./pos-settings/PosSettingsLoyaltySection";
import PosSettingsReceiptFieldsSection from "./pos-settings/PosSettingsReceiptFieldsSection";
import PosSettingsReceiptOutputSection from "./pos-settings/PosSettingsReceiptOutputSection";
import PosSettingsPaymentMethodsSection from "./pos-settings/PosSettingsPaymentMethodsSection";

const scopeOptions: { value: PosSettingsScope; label: string }[] = [
  { value: "tenant", label: "Tenant default" },
  { value: "branch", label: "Branch override" },
];

export default function PosSettingsComponent() {
  const canEditPos = usePermission("pos", "edit");
  const {
    scope,
    setScope,
    isTenantAdmin,
    canSwitchBranch,
    canSave,
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
    reload,
  } = usePosSettings();

  const formDisabled = !canEditPos || !canSave || saving;

  return (
    <PermissionGuard featureKey="pos" requiredLevel="view">
    <div>
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Configure POS tax, loyalty, and receipt options</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <button
                  type="button"
                  className="btn btn-link p-0 border-0 text-dark"
                  onClick={() => void reload()}
                  title="Refresh"
                  aria-label="Refresh POS settings"
                >
                  <i className="ti ti-refresh" />
                </button>
              </li>
              <CollapesIcon />
            </ul>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="card flex-fill mb-0">
                  <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <h4 className="mb-0">POS Settings</h4>
                    {isTenantAdmin && canSwitchBranch && (
                      <div style={{ minWidth: 220 }}>
                        <Select
                          classNamePrefix="react-select"
                          options={scopeOptions}
                          value={scopeOptions.find((o) => o.value === scope)}
                          onChange={(opt) => setScope(opt?.value ?? "tenant")}
                        />
                      </div>
                    )}
                  </div>

                  <div className="card-body">
                    {scope === "branch" && activeBranch && (
                      <div className="alert alert-light border py-2 mb-4">
                        Editing branch override for{" "}
                        <strong>{activeBranch.name}</strong>. Unset fields inherit
                        tenant defaults.
                      </div>
                    )}

                    {scope === "tenant" && isTenantAdmin && (
                      <div className="alert alert-light border py-2 mb-4">
                        Editing tenant-wide defaults. Branch overrides take precedence
                        where configured.
                      </div>
                    )}

                    {!canEditPos && (
                      <div className="alert alert-warning py-2 mb-4">
                        You have view-only access. POS edit permission is required to
                        save changes.
                      </div>
                    )}

                    {feedback && (
                      <div
                        className={`alert ${
                          feedback.type === "success"
                            ? "alert-success"
                            : "alert-danger"
                        } alert-dismissible fade show py-2`}
                        role="alert"
                      >
                        {feedback.message}
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setFeedback(null)}
                        />
                      </div>
                    )}

                    {loading || !form || !receiptConfig ? (
                      <div className="text-center py-5 text-muted">
                        <div className="spinner-border text-primary mb-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mb-0">Loading POS settings…</p>
                      </div>
                    ) : (
                      <>
                        <PosSettingsTaxSection
                          form={form}
                          onChange={updateForm}
                          disabled={formDisabled}
                        />

                        <PosSettingsLoyaltySection
                          form={form}
                          onChange={updateForm}
                          disabled={formDisabled}
                        />

                        <PosSettingsReceiptFieldsSection
                          receiptConfig={receiptConfig}
                          enabledFields={form.enabledFields}
                          onToggle={toggleReceiptField}
                          disabled={formDisabled}
                        />

                        <PosSettingsReceiptOutputSection
                          form={form}
                          receiptConfig={receiptConfig}
                          onChange={updateForm}
                          onToggleOutput={toggleReceiptOutput}
                          disabled={formDisabled}
                        />

                        <PosSettingsPaymentMethodsSection methods={paymentMethods} />

                        <div className="d-flex align-items-center justify-content-end pt-4">
                          <button
                            type="button"
                            className="btn btn-cancel me-2"
                            disabled={saving}
                            onClick={reset}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-submit"
                            disabled={formDisabled || saving}
                            onClick={() => void save()}
                          >
                            {saving ? "Saving…" : "Save Changes"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>
    </div>
    </PermissionGuard>
  );
}

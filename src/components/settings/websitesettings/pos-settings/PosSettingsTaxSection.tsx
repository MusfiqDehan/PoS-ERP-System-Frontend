"use client";

import type { PosSettingsFormState } from "@/hooks/settings/usePosSettings";

type Props = {
  form: PosSettingsFormState;
  onChange: (patch: Partial<PosSettingsFormState>) => void;
  disabled?: boolean;
};

export default function PosSettingsTaxSection({ form, onChange, disabled }: Props) {
  return (
    <div className="localization-info border-bottom pb-4 mb-4">
      <h5 className="mb-3">Tax &amp; Pricing</h5>

      <div className="row align-items-center mb-3">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Enable Tax</h6>
            <p className="text-muted small mb-0">Apply tax during checkout and on receipts.</p>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="status-toggle modal-status d-flex align-items-center">
            <input
              type="checkbox"
              id="pos-tax-enabled"
              className="check"
              checked={form.taxEnabled}
              disabled={disabled}
              onChange={(e) => onChange({ taxEnabled: e.target.checked })}
            />
            <label htmlFor="pos-tax-enabled" className="checktoggle" />
          </div>
        </div>
      </div>

      <div className="row align-items-center mb-3">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Tax Rate (%)</h6>
            <p className="text-muted small mb-0">Percentage applied to order subtotal.</p>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              min={0}
              max={100}
              step={0.01}
              value={form.taxPercent}
              disabled={disabled || !form.taxEnabled}
              onChange={(e) =>
                onChange({ taxPercent: parseFloat(e.target.value) || 0 })
              }
            />
            <span className="input-group-text">%</span>
          </div>
        </div>
      </div>

      <div className="row align-items-center mb-3">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Currency</h6>
          </div>
        </div>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            maxLength={3}
            value={form.currency}
            disabled={disabled}
            onChange={(e) => onChange({ currency: e.target.value.toUpperCase() })}
          />
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Low Stock Threshold</h6>
            <p className="text-muted small mb-0">Units remaining before a product is flagged low.</p>
          </div>
        </div>
        <div className="col-sm-4">
          <input
            type="number"
            className="form-control"
            min={0}
            step={1}
            value={form.lowStockThreshold}
            disabled={disabled}
            onChange={(e) =>
              onChange({ lowStockThreshold: parseInt(e.target.value, 10) || 0 })
            }
          />
        </div>
      </div>
    </div>
  );
}

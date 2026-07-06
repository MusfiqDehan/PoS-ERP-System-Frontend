"use client";

import type { PosSettingsFormState } from "@/hooks/settings/usePosSettings";

type Props = {
  form: PosSettingsFormState;
  onChange: (patch: Partial<PosSettingsFormState>) => void;
  disabled?: boolean;
};

export default function PosSettingsLoyaltySection({ form, onChange, disabled }: Props) {
  return (
    <div className="localization-info border-bottom pb-4 mb-4">
      <h5 className="mb-3">Loyalty Program</h5>

      <div className="row align-items-center mb-3">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Enable Loyalty</h6>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="status-toggle modal-status d-flex align-items-center">
            <input
              type="checkbox"
              id="pos-loyalty-enabled"
              className="check"
              checked={form.loyaltyEnabled}
              disabled={disabled}
              onChange={(e) => onChange({ loyaltyEnabled: e.target.checked })}
            />
            <label htmlFor="pos-loyalty-enabled" className="checktoggle" />
          </div>
        </div>
      </div>

      <div className="row align-items-center mb-3">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Points per Discount %</h6>
          </div>
        </div>
        <div className="col-sm-4">
          <input
            type="number"
            className="form-control"
            min={0}
            step={1}
            value={form.pointsPerDiscountPercent}
            disabled={disabled || !form.loyaltyEnabled}
            onChange={(e) =>
              onChange({
                pointsPerDiscountPercent: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </div>
      </div>

      <div className="row align-items-center mb-3">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Max Loyalty Discount (%)</h6>
          </div>
        </div>
        <div className="col-sm-4">
          <input
            type="number"
            className="form-control"
            min={0}
            max={100}
            step={1}
            value={form.maxLoyaltyDiscountPercent}
            disabled={disabled || !form.loyaltyEnabled}
            onChange={(e) =>
              onChange({
                maxLoyaltyDiscountPercent: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </div>
      </div>

      <div className="row align-items-center mb-3">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Points per Currency Unit</h6>
          </div>
        </div>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            value={form.pointsPerCurrencyUnit}
            disabled={disabled || !form.loyaltyEnabled}
            onChange={(e) => onChange({ pointsPerCurrencyUnit: e.target.value })}
          />
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Min Subtotal to Earn Points</h6>
          </div>
        </div>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            value={form.minSubtotalToEarnPoints}
            disabled={disabled || !form.loyaltyEnabled}
            onChange={(e) => onChange({ minSubtotalToEarnPoints: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

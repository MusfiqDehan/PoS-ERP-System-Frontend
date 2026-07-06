"use client";

import type { PosSettingsFormState } from "@/hooks/settings/usePosSettings";

type Props = {
  form: PosSettingsFormState;
  onChange: (patch: Partial<PosSettingsFormState>) => void;
  disabled?: boolean;
};

export default function PosSettingsScanSection({ form, onChange, disabled }: Props) {
  return (
    <div className="localization-info border-bottom pb-4 mb-4">
      <h5 className="mb-3">Barcode Scanning</h5>

      <div className="row align-items-center">
        <div className="col-sm-4">
          <div className="setting-info">
            <h6>Scan Sound Effects</h6>
            <p className="text-muted small mb-0">
              Play a short sound after each barcode scan on the POS screen — a
              success tone when a product is added, or an error tone when no
              product matches the barcode or it cannot be added.
            </p>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="status-toggle modal-status d-flex align-items-center">
            <input
              type="checkbox"
              id="pos-scan-sound-enabled"
              className="check"
              checked={form.scanSoundEnabled}
              disabled={disabled}
              onChange={(e) => onChange({ scanSoundEnabled: e.target.checked })}
            />
            <label htmlFor="pos-scan-sound-enabled" className="checktoggle" />
          </div>
        </div>
      </div>
    </div>
  );
}

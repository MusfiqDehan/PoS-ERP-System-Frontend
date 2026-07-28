"use client";

import Select from "react-select";
import type { PosSettingsFormState } from "@/hooks/settings/usePosSettings";
import type { PosReceiptConfig } from "@/lib/posConfiguration";
import {
  FORMATTER_OPTIONS,
  OUTPUT_CHANNEL_OPTIONS,
  PAPER_PROFILE_OPTIONS,
} from "@/lib/posConfiguration";

type Props = {
  form: PosSettingsFormState;
  receiptConfig: PosReceiptConfig;
  onChange: (patch: Partial<PosSettingsFormState>) => void;
  onToggleOutput: (key: string, enabled: boolean) => void;
  disabled?: boolean;
};

const selectOptions = {
  outputChannel: OUTPUT_CHANNEL_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
  })),
  formatter: FORMATTER_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  paper: PAPER_PROFILE_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
};

export default function PosSettingsReceiptOutputSection({
  form,
  receiptConfig,
  onChange,
  onToggleOutput,
  disabled,
}: Props) {
  return (
    <>
      <div className="localization-info border-bottom pb-4 mb-4">
        <h5 className="mb-3">Receipt Content</h5>

        <div className="row mb-3">
          <div className="col-sm-4">
            <label htmlFor="pos-receipt-header" className="form-label fw-semibold">
              Header Text
            </label>
          </div>
          <div className="col-sm-8">
            <textarea
              id="pos-receipt-header"
              className="form-control"
              rows={2}
              value={form.headerText}
              disabled={disabled}
              onChange={(e) => onChange({ headerText: e.target.value })}
              placeholder="Optional header shown at the top of receipts"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4">
            <label htmlFor="pos-receipt-footer" className="form-label fw-semibold">
              Footer Text
            </label>
          </div>
          <div className="col-sm-8">
            <textarea
              id="pos-receipt-footer"
              className="form-control"
              rows={2}
              value={form.footerText}
              disabled={disabled}
              onChange={(e) => onChange({ footerText: e.target.value })}
              placeholder="Thank-you message or contact info"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <label htmlFor="pos-return-policy" className="form-label fw-semibold">
              Return Policy
            </label>
          </div>
          <div className="col-sm-8">
            <textarea
              id="pos-return-policy"
              className="form-control"
              rows={3}
              value={form.returnPolicyText}
              disabled={disabled}
              onChange={(e) => onChange({ returnPolicyText: e.target.value })}
              placeholder="Return and exchange policy text"
            />
          </div>
        </div>
      </div>

      <div className="localization-info border-bottom pb-4 mb-4">
        <h5 className="mb-3">Output &amp; Printing</h5>

        <div className="row align-items-center mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Default Output Channel</h6>
          </div>
          <div className="col-sm-4">
            <Select
              classNamePrefix="react-select"
              isDisabled={disabled}
              options={selectOptions.outputChannel}
              value={selectOptions.outputChannel.find(
                (o) => o.value === form.defaultOutputChannel,
              )}
              onChange={(opt) =>
                onChange({ defaultOutputChannel: opt?.value ?? "digital" })
              }
            />
          </div>
        </div>

        <div className="row align-items-center mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Default Formatter</h6>
          </div>
          <div className="col-sm-4">
            <Select
              classNamePrefix="react-select"
              isDisabled={disabled}
              options={selectOptions.formatter}
              value={selectOptions.formatter.find(
                (o) => o.value === form.defaultFormatter,
              )}
              onChange={(opt) =>
                onChange({ defaultFormatter: opt?.value ?? "json" })
              }
            />
          </div>
        </div>

        <div className="row align-items-center mb-3">
          <div className="col-sm-4">
            <h6 className="mb-0">Paper Profile</h6>
          </div>
          <div className="col-sm-4">
            <Select
              classNamePrefix="react-select"
              isDisabled={disabled}
              options={selectOptions.paper}
              value={selectOptions.paper.find((o) => o.value === form.paperProfile)}
              onChange={(opt) =>
                onChange({ paperProfile: opt?.value ?? "thermal_80mm" })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <h6 className="mb-0">Enabled Output Channels</h6>
          </div>
          <div className="col-sm-8">
            <div className="d-flex flex-wrap gap-3 pos-payment-method mb-0 w-100">
              {receiptConfig.available_outputs.map((output) => (
                <div key={output.key} className="custom-control custom-checkbox">
                  <label className="checkboxs mb-0 pb-0 line-height-1">
                    <input
                      type="checkbox"
                      checked={Boolean(form.enabledOutputs[output.key])}
                      disabled={disabled}
                      onChange={(e) => onToggleOutput(output.key, e.target.checked)}
                    />
                    <span className="checkmarks" />
                    {output.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

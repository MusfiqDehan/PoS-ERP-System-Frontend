"use client";

import { useEffect, useMemo, useState } from "react";
import type { PosReceiptConfig } from "@/lib/posConfiguration";
import { RECEIPT_GROUP_LABELS } from "@/lib/posConfiguration";

type Props = {
  receiptConfig: PosReceiptConfig;
  enabledFields: Record<string, boolean>;
  onToggle: (key: string, enabled: boolean) => void;
  disabled?: boolean;
};

export default function PosSettingsReceiptFieldsSection({
  receiptConfig,
  enabledFields,
  onToggle,
  disabled,
}: Props) {
  const groupedFields = useMemo(() => {
    const catalog = receiptConfig.available_fields ?? [];
    const groups = new Map<string, typeof catalog>();

    for (const field of catalog) {
      const list = groups.get(field.group) ?? [];
      list.push(field);
      groups.set(field.group, list);
    }

    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [receiptConfig.available_fields]);

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    setExpandedGroups(new Set(groupedFields.map(([group]) => group)));
  }, [groupedFields]);

  const toggleGroup = (group: string) => {
    setExpandedGroups((current) => {
      const next = new Set(current);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  if (groupedFields.length === 0) {
    return (
      <div className="localization-info border-bottom pb-4 mb-4">
        <h5 className="mb-1">Sale Receipt Fields</h5>
        <p className="text-muted mb-0">No receipt field options are available.</p>
      </div>
    );
  }

  return (
    <div className="localization-info border-bottom pb-4 mb-4">
      <h5 className="mb-1">Sale Receipt Fields</h5>
      <p className="text-muted small mb-3">
        Choose which sections appear on printed and digital checkout receipts.
      </p>

      <div className="pos-receipt-field-groups">
        {groupedFields.map(([group, fields]) => {
          const expanded = expandedGroups.has(group);
          const enabledCount = fields.filter((field) => enabledFields[field.key]).length;

          return (
            <div key={group} className="pos-receipt-field-group border rounded mb-3">
              <button
                type="button"
                className="pos-receipt-field-group__toggle w-100 border-0 bg-transparent px-3 py-3 d-flex align-items-center justify-content-between text-start"
                aria-expanded={expanded}
                onClick={() => toggleGroup(group)}
              >
                <span className="fw-semibold text-dark">
                  {RECEIPT_GROUP_LABELS[group] ?? group}
                </span>
                <span className="d-flex align-items-center gap-2">
                  <span className="badge bg-light text-dark border">
                    {enabledCount}/{fields.length}
                  </span>
                  <i className={`ti ti-chevron-${expanded ? "up" : "down"}`} aria-hidden />
                </span>
              </button>

              {expanded && (
                <div className="px-3 pb-3 border-top">
                  <div className="pos-payment-method d-flex align-items-center mb-0 w-100 pt-3">
                    {fields.map((field) => (
                      <div
                        key={field.key}
                        className="custom-control custom-checkbox"
                      >
                        <label className="checkboxs mb-0 pb-0 line-height-1">
                          <input
                            type="checkbox"
                            checked={Boolean(enabledFields[field.key])}
                            disabled={disabled}
                            onChange={(e) => onToggle(field.key, e.target.checked)}
                          />
                          <span className="checkmarks" />
                          {field.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

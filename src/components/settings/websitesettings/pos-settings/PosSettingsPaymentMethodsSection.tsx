"use client";

import type { PaymentMethod } from "@/lib/pos";

type Props = {
  methods: PaymentMethod[];
};

export default function PosSettingsPaymentMethodsSection({ methods }: Props) {
  return (
    <div className="localization-info pb-2">
      <h5 className="mb-1">Active Payment Methods</h5>
      <p className="text-muted small mb-3">
        Payment methods configured for POS checkout. Manage methods from the POS module.
      </p>

      {methods.length === 0 ? (
        <p className="text-muted mb-0">No active payment methods found.</p>
      ) : (
        <div className="d-flex flex-wrap gap-2">
          {methods.map((method) => (
            <span key={method.id} className="badge bg-primary-transparent text-primary">
              {method.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

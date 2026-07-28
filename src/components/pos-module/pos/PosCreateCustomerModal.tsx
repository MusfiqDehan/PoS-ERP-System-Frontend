"use client";

import { useState } from "react";
import { closePosModal } from "./categories-modal/closePosModal";

export type CreateCustomerInput = {
  name: string;
  phone: string;
  email: string;
  address: string;
};

type PosCreateCustomerModalProps = {
  onCreateCustomer: (input: CreateCustomerInput) => void | Promise<void>;
};

const emptyForm: CreateCustomerInput = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

export default function PosCreateCustomerModal({
  onCreateCustomer,
}: PosCreateCustomerModalProps) {
  const [form, setForm] = useState<CreateCustomerInput>(emptyForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateCustomerInput, string>>
  >({});

  const updateField = (field: keyof CreateCustomerInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof CreateCustomerInput, string>> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Customer name is required";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleClose = () => {
    setForm(emptyForm);
    setErrors({});
    closePosModal("pos-create-customer");
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    onCreateCustomer({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
    });
    setForm(emptyForm);
    setErrors({});
    closePosModal("pos-create-customer");
  };

  return (
    <div
      className="modal fade pos-sale-modal"
      id="pos-create-customer"
      tabIndex={-1}
      aria-labelledby="pos-create-customer-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog pos-sale-modal__dialog--customer">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <div>
              <h5 className="pos-sale-modal__title" id="pos-create-customer-title">
                Create Customer
              </h5>
              <p className="pos-sale-modal__subtitle">
                Add a new customer to this sale
              </p>
            </div>
            <button
              type="button"
              className="pos-sale-modal__close"
              aria-label="Close"
              onClick={handleClose}
            >
              ×
            </button>
          </div>

          <div className="pos-sale-modal__body">
            <div className="pos-sale-modal__form-grid">
              <div className="pos-sale-modal__field-row">
                <label className="pos-sale-modal__label" htmlFor="pos-customer-name">
                  Customer Name <span className="pos-sale-modal__required">*</span>
                </label>
                <input
                  id="pos-customer-name"
                  type="text"
                  className={`pos-sale-modal__input pos-sale-modal__input--full${
                    errors.name ? " pos-sale-modal__input--error" : ""
                  }`}
                  placeholder="e.g. Miraz Hossian"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
                {errors.name && (
                  <span className="pos-sale-modal__error">{errors.name}</span>
                )}
              </div>

              <div className="pos-sale-modal__field-row">
                <label className="pos-sale-modal__label" htmlFor="pos-customer-phone">
                  Phone <span className="pos-sale-modal__required">*</span>
                </label>
                <input
                  id="pos-customer-phone"
                  type="tel"
                  className={`pos-sale-modal__input pos-sale-modal__input--full${
                    errors.phone ? " pos-sale-modal__input--error" : ""
                  }`}
                  placeholder="e.g. 01700000000"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
                {errors.phone && (
                  <span className="pos-sale-modal__error">{errors.phone}</span>
                )}
              </div>

              <div className="pos-sale-modal__field-row">
                <label className="pos-sale-modal__label" htmlFor="pos-customer-email">
                  Email
                </label>
                <input
                  id="pos-customer-email"
                  type="email"
                  className="pos-sale-modal__input pos-sale-modal__input--full"
                  placeholder="customer@email.com"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>

              <div className="pos-sale-modal__field-row">
                <label className="pos-sale-modal__label" htmlFor="pos-customer-address">
                  Address
                </label>
                <input
                  id="pos-customer-address"
                  type="text"
                  className="pos-sale-modal__input pos-sale-modal__input--full"
                  placeholder="City, area, or full address"
                  value={form.address}
                  onChange={(event) => updateField("address", event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pos-sale-modal__footer">
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--primary"
              onClick={handleSubmit}
            >
              Save Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

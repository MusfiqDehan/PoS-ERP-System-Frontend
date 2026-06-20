"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  posKeyboardShortcuts,
  posTodayProfitStats,
  posTodaySaleStats,
} from "./posHeaderData";

const CALC_KEYS = [
  "C",
  "/",
  "*",
  "←",
  "7",
  "8",
  "9",
  "-",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "=",
  "0",
  ".",
] as const;

function evaluateExpression(expression: string): string {
  if (!expression.trim()) {
    return "0";
  }

  const sanitized = expression.replace(/[^0-9+\-*/.]/g, "");
  if (!sanitized) {
    return "0";
  }

  try {
    // eslint-disable-next-line no-new-func
    const compute = new Function(`"use strict"; return (${sanitized})`);
    const result = compute();
    if (typeof result !== "number" || !Number.isFinite(result)) {
      return "Error";
    }
    return String(Math.round(result * 1e8) / 1e8);
  } catch {
    return "Error";
  }
}

function PosCalculatorModal() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const handleKey = (key: string) => {
    if (key === "C") {
      setExpression("");
      setResult("0");
      return;
    }

    if (key === "←") {
      setExpression((current) => current.slice(0, -1));
      return;
    }

    if (key === "=") {
      setResult(evaluateExpression(expression));
      return;
    }

    setExpression((current) => current + key);
  };

  return (
    <div
      className="modal fade pos-sale-modal"
      id="pos-calculator"
      tabIndex={-1}
      aria-labelledby="pos-calculator-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <h5 className="pos-sale-modal__title" id="pos-calculator-title">
              Calculator
            </h5>
            <button
              type="button"
              className="pos-sale-modal__close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="pos-sale-modal__body">
            <div className="pos-calculator__display">
              <span className="pos-calculator__expression">{expression || "0"}</span>
              <span className="pos-calculator__result">{result}</span>
            </div>

            <div className="pos-calculator__keys">
              {CALC_KEYS.map((key) => {
                const isOperator = ["/", "*", "-", "+", "="].includes(key);
                const isAction = key === "C" || key === "←";
                return (
                  <button
                    key={key}
                    type="button"
                    className={[
                      "pos-calculator__key",
                      isOperator ? "pos-calculator__key--operator" : "",
                      isAction ? "pos-calculator__key--action" : "",
                      key === "0" ? "pos-calculator__key--zero" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleKey(key)}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PosCashRegisterModal() {
  const openingBalance = 5000;
  const [movement, setMovement] = useState<"in" | "out">("in");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const parsedAmount = Number.parseFloat(amount) || 0;
  const projectedBalance = useMemo(() => {
    return movement === "in"
      ? openingBalance + parsedAmount
      : openingBalance - parsedAmount;
  }, [movement, parsedAmount]);

  const canSubmit = parsedAmount > 0;

  const handleConfirm = () => {
    if (!canSubmit) {
      return;
    }
    setConfirmed(
      `${movement === "in" ? "Cash In" : "Cash Out"} of $${parsedAmount.toFixed(
        2,
      )} recorded. Drawer balance: $${projectedBalance.toFixed(2)}.`,
    );
    setAmount("");
    setNote("");
  };

  return (
    <div
      className="modal fade pos-sale-modal"
      id="pos-cash-register"
      tabIndex={-1}
      aria-labelledby="pos-cash-register-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <div>
              <h5 className="pos-sale-modal__title" id="pos-cash-register-title">
                Cash Register
              </h5>
              <p className="pos-sale-modal__subtitle">Record cash in / cash out</p>
            </div>
            <button
              type="button"
              className="pos-sale-modal__close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="pos-sale-modal__body">
            <div className="pos-sale-modal__total-card">
              <span className="pos-sale-modal__total-label">Drawer Balance</span>
              <span className="pos-sale-modal__total-value">
                ${projectedBalance.toFixed(2)}
              </span>
            </div>

            <div className="pos-cash-toggle">
              <button
                type="button"
                className={`pos-cash-toggle__btn ${
                  movement === "in" ? "pos-cash-toggle__btn--active" : ""
                }`}
                onClick={() => setMovement("in")}
              >
                Cash In
              </button>
              <button
                type="button"
                className={`pos-cash-toggle__btn ${
                  movement === "out" ? "pos-cash-toggle__btn--active" : ""
                }`}
                onClick={() => setMovement("out")}
              >
                Cash Out
              </button>
            </div>

            <div className="pos-sale-modal__field-row">
              <label className="pos-sale-modal__label" htmlFor="pos-cash-amount">
                Amount
              </label>
              <div className="pos-sale-modal__input-wrap">
                <span className="pos-sale-modal__input-prefix">$</span>
                <input
                  id="pos-cash-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pos-sale-modal__input"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
            </div>

            <div className="pos-sale-modal__field-row">
              <label className="pos-sale-modal__label" htmlFor="pos-cash-note">
                Note (optional)
              </label>
              <input
                id="pos-cash-note"
                type="text"
                className="pos-sale-modal__input pos-sale-modal__input--full"
                placeholder="Reason for cash movement"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>

            {confirmed && <p className="pos-cash-confirm">{confirmed}</p>}
          </div>

          <div className="pos-sale-modal__footer">
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--primary"
              disabled={!canSubmit}
              onClick={handleConfirm}
            >
              Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type StatModalProps = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly stats: ReadonlyArray<{ label: string; value: string }>;
};

function PosStatModal({ id, title, subtitle, stats }: StatModalProps) {
  return (
    <div
      className="modal fade pos-sale-modal"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <div>
              <h5 className="pos-sale-modal__title" id={`${id}-title`}>
                {title}
              </h5>
              <p className="pos-sale-modal__subtitle">{subtitle}</p>
            </div>
            <button
              type="button"
              className="pos-sale-modal__close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="pos-sale-modal__body">
            <div className="pos-stat-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="pos-stat-grid__item">
                  <span className="pos-stat-grid__label">{stat.label}</span>
                  <span className="pos-stat-grid__value">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pos-sale-modal__footer">
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--primary"
              data-bs-dismiss="modal"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PosKeyboardShortcutsModal() {
  return (
    <div
      className="modal fade pos-sale-modal"
      id="pos-keyboard-shortcuts"
      tabIndex={-1}
      aria-labelledby="pos-keyboard-shortcuts-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <h5 className="pos-sale-modal__title" id="pos-keyboard-shortcuts-title">
              Keyboard Shortcuts
            </h5>
            <button
              type="button"
              className="pos-sale-modal__close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="pos-sale-modal__body">
            <ul className="pos-shortcuts">
              {posKeyboardShortcuts.map((shortcut) => (
                <li key={shortcut.keys} className="pos-shortcuts__item">
                  <span className="pos-shortcuts__desc">{shortcut.description}</span>
                  <kbd className="pos-shortcuts__keys">{shortcut.keys}</kbd>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function PosPrintReceiptModal() {
  const handlePrint = () => {
    globalThis.print();
  };

  return (
    <div
      className="modal fade pos-sale-modal"
      id="pos-print-receipt"
      tabIndex={-1}
      aria-labelledby="pos-print-receipt-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered pos-sale-modal__dialog">
        <div className="modal-content pos-sale-modal__content">
          <div className="pos-sale-modal__header">
            <h5 className="pos-sale-modal__title" id="pos-print-receipt-title">
              Last Receipt
            </h5>
            <button
              type="button"
              className="pos-sale-modal__close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="pos-sale-modal__body">
            <div className="pos-receipt">
              <p className="pos-receipt__store">Sortonium · Mirpur-12</p>
              <p className="pos-receipt__meta">Invoice #INV-2026-0086</p>
              <div className="pos-receipt__divider" />
              <div className="pos-receipt__row">
                <span>2 × Americano</span>
                <span>$9.00</span>
              </div>
              <div className="pos-receipt__row">
                <span>1 × Blueberry Muffin</span>
                <span>$4.50</span>
              </div>
              <div className="pos-receipt__divider" />
              <div className="pos-receipt__row pos-receipt__row--total">
                <span>Total</span>
                <span>$13.50</span>
              </div>
            </div>
          </div>

          <div className="pos-sale-modal__footer">
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--ghost"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="pos-sale-modal__btn pos-sale-modal__btn--primary"
              onClick={handlePrint}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PosHeaderModals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      <PosKeyboardShortcutsModal />
      <PosCashRegisterModal />
      <PosPrintReceiptModal />
      <PosStatModal
        id="pos-today-sale"
        title="Today's Sale"
        subtitle="Summary for the current session"
        stats={posTodaySaleStats}
      />
      <PosStatModal
        id="pos-today-profit"
        title="Today's Profit"
        subtitle="Summary for the current session"
        stats={posTodayProfitStats}
      />
      <PosCalculatorModal />
    </>,
    document.body,
  );
}

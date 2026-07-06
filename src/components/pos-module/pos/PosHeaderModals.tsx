"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PosCashRegisterModal from "./PosCashRegisterModal";
import PosPrintReceiptModal from "./PosPrintReceiptModal";
import PosTodaySaleModal from "./PosTodaySaleModal";
import {
  posKeyboardShortcuts,
  posTodayProfitStats,
} from "./posHeaderData";
import { closePosModal } from "./categories-modal/closePosModal";

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
              aria-label="Close"
              onClick={() => closePosModal("pos-calculator")}
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
              aria-label="Close"
              onClick={() => closePosModal(id)}
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
              onClick={() => closePosModal(id)}
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
              aria-label="Close"
              onClick={() => closePosModal("pos-keyboard-shortcuts")}
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
      <PosTodaySaleModal />
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

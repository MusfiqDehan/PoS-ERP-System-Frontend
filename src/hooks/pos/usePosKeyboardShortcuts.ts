"use client";

import { useEffect } from "react";
import { openPosModal } from "@/components/pos-module/pos/categories-modal/openPosModal";

export const POS_PRODUCT_SEARCH_ID = "pos-product-search";

export const POS_MODAL_IDS = {
  keyboardShortcuts: "pos-keyboard-shortcuts",
  cashRegister: "pos-cash-register",
  printReceipt: "pos-print-receipt",
} as const;

type UsePosKeyboardShortcutsOptions = {
  onHoldOrder: () => void;
  onStartNewOrder: () => void;
  onCompleteSale: () => void;
  onPrintLastReceipt: () => void;
  canCompleteSale: boolean;
};

function focusProductSearch(): void {
  const input = document.getElementById(POS_PRODUCT_SEARCH_ID);
  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  input.focus();
  input.select();
}

function isTypingInEditableField(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function usePosKeyboardShortcuts({
  onHoldOrder,
  onStartNewOrder,
  onCompleteSale,
  onPrintLastReceipt,
  canCompleteSale,
}: UsePosKeyboardShortcutsOptions): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (key === "F1") {
        event.preventDefault();
        openPosModal(POS_MODAL_IDS.keyboardShortcuts);
        return;
      }

      if (key === "F2") {
        event.preventDefault();
        focusProductSearch();
        return;
      }

      if (key === "F4") {
        event.preventDefault();
        openPosModal(POS_MODAL_IDS.cashRegister);
        return;
      }

      if (key === "F8") {
        event.preventDefault();
        onHoldOrder();
        return;
      }

      if (key === "F9") {
        event.preventDefault();
        onStartNewOrder();
        return;
      }

      const ctrlOrMeta = event.ctrlKey || event.metaKey;

      if (ctrlOrMeta && key.toLowerCase() === "p") {
        event.preventDefault();
        onPrintLastReceipt();
        return;
      }

      if (ctrlOrMeta && key === "Enter") {
        if (isTypingInEditableField(event.target) && !canCompleteSale) {
          return;
        }
        event.preventDefault();
        if (canCompleteSale) {
          onCompleteSale();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    canCompleteSale,
    onCompleteSale,
    onHoldOrder,
    onPrintLastReceipt,
    onStartNewOrder,
  ]);
}

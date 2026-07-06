"use client";

import { useEffect, useRef } from "react";
import { POS_PRODUCT_SEARCH_ID } from "@/hooks/pos/usePosKeyboardShortcuts";
import {
  isEditableElement,
  isPosProductSearchInput,
  isRapidWedgeInput,
  isScanTerminatorKey,
  POS_SCAN_DEDUP_MS,
  POS_SCAN_IDLE_MS,
  POS_SCAN_MIN_LENGTH,
  POS_SEARCH_SUBMIT_IDLE_MS,
  shouldResetWedgeBuffer,
} from "@/lib/posBarcodeWedge";
import { debugScanLog } from "@/lib/debugScanLog";

type Options = {
  enabled?: boolean;
  onScan: (code: string) => void;
  clearSearch?: () => void;
};

/**
 * Captures USB barcode scanner input (keyboard wedge) on the POS page.
 * Supports scanners with or without Enter/Tab suffix (e.g. Yumite YT-100).
 */
export function usePosBarcodeWedge({
  enabled = true,
  onScan,
  clearSearch,
}: Options): void {
  const onScanRef = useRef(onScan);
  const clearSearchRef = useRef(clearSearch);

  onScanRef.current = onScan;
  clearSearchRef.current = clearSearch;

  useEffect(() => {
    if (!enabled) {
      // #region agent log
      debugScanLog(
        "usePosBarcodeWedge.ts:mount",
        "wedge hook disabled",
        { enabled },
        "C",
      );
      // #endregion
      return;
    }

    // #region agent log
    debugScanLog(
      "usePosBarcodeWedge.ts:mount",
      "wedge hook active",
      { enabled },
      "C",
    );
    // #endregion

    const bufferRef = { value: "" };
    const lastKeyAtRef = { value: 0 };
    const lastSubmitRef = { code: "", at: 0 };
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const resetBuffer = () => {
      bufferRef.value = "";
      lastKeyAtRef.value = 0;
    };

    const submitCode = (code: string, source: string) => {
      const trimmed = code.trim();
      if (trimmed.length < POS_SCAN_MIN_LENGTH) {
        // #region agent log
        debugScanLog(
          "usePosBarcodeWedge.ts:submitCode",
          "code too short",
          { source, length: trimmed.length },
          "C",
        );
        // #endregion
        return;
      }

      const now = Date.now();
      if (
        trimmed === lastSubmitRef.code &&
        now - lastSubmitRef.at < POS_SCAN_DEDUP_MS
      ) {
        // #region agent log
        debugScanLog(
          "usePosBarcodeWedge.ts:submitCode",
          "deduped duplicate scan",
          { source, codeLength: trimmed.length },
          "C",
        );
        // #endregion
        return;
      }

      lastSubmitRef.code = trimmed;
      lastSubmitRef.at = now;
      // #region agent log
      debugScanLog(
        "usePosBarcodeWedge.ts:submitCode",
        "calling onScan",
        { source, codeLength: trimmed.length, codePrefix: trimmed.slice(0, 4) },
        "C",
      );
      // #endregion
      onScanRef.current(trimmed);
    };

    const scheduleBufferIdleSubmit = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
      idleTimer = setTimeout(() => {
        if (bufferRef.value.length >= POS_SCAN_MIN_LENGTH) {
          submitCode(bufferRef.value, "global-idle");
        }
        resetBuffer();
      }, POS_SCAN_IDLE_MS);
    };

    const completeSearchScan = (input: HTMLInputElement, source: string) => {
      const code = input.value.trim();
      if (code.length < POS_SCAN_MIN_LENGTH) {
        return;
      }
      submitCode(code, source);
      clearSearchRef.current?.();
      resetBuffer();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const targetId =
        target instanceof HTMLElement ? target.id || target.tagName : "unknown";

      if (isPosProductSearchInput(target)) {
        if (!isScanTerminatorKey(event)) {
          // #region agent log
          if (event.key.length === 1 || event.key === "Enter") {
            debugScanLog(
              "usePosBarcodeWedge.ts:keydown",
              "key in search field",
              {
                key: event.key,
                keyCode: event.keyCode,
                targetId,
                searchLen:
                  target instanceof HTMLInputElement
                    ? target.value.length
                    : 0,
              },
              "B",
            );
          }
          // #endregion
          return;
        }

        event.preventDefault();
        completeSearchScan(target, "search-keydown-terminator");
        return;
      }

      if (target instanceof HTMLElement && isEditableElement(target)) {
        // #region agent log
        if (event.key.length === 1 || isScanTerminatorKey(event)) {
          debugScanLog(
            "usePosBarcodeWedge.ts:keydown",
            "ignored editable target",
            { key: event.key, keyCode: event.keyCode, targetId },
            "B",
          );
        }
        // #endregion
        return;
      }

      if (isScanTerminatorKey(event)) {
        // #region agent log
        debugScanLog(
          "usePosBarcodeWedge.ts:keydown",
          "terminator key",
          {
            key: event.key,
            keyCode: event.keyCode,
            bufferLen: bufferRef.value.length,
          },
          "A",
        );
        // #endregion
        if (bufferRef.value.length >= POS_SCAN_MIN_LENGTH) {
          event.preventDefault();
          submitCode(bufferRef.value, "global-keydown-terminator");
        }
        resetBuffer();
        return;
      }

      if (
        event.key.length !== 1 ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      const now = Date.now();
      if (shouldResetWedgeBuffer(lastKeyAtRef.value, now)) {
        bufferRef.value = "";
      }

      lastKeyAtRef.value = now;
      bufferRef.value += event.key;
      // #region agent log
      debugScanLog(
        "usePosBarcodeWedge.ts:keydown",
        "global buffer char",
        {
          key: event.key,
          keyCode: event.keyCode,
          bufferLen: bufferRef.value.length,
          targetId,
        },
        "A",
      );
      // #endregion
      scheduleBufferIdleSubmit();
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!isScanTerminatorKey(event)) {
        return;
      }

      const target = event.target;
      if (isPosProductSearchInput(target)) {
        completeSearchScan(target, "search-keyup-terminator");
        return;
      }

      if (target instanceof HTMLElement && isEditableElement(target)) {
        return;
      }

      if (bufferRef.value.length >= POS_SCAN_MIN_LENGTH) {
        submitCode(bufferRef.value, "global-keyup-terminator");
      }
      resetBuffer();
    };

    const searchStartedAtRef = { value: 0 };
    let searchSubmitTimer: ReturnType<typeof setTimeout> | null = null;

    const handleSearchInput = (event: Event) => {
      const input = event.target;
      if (!isPosProductSearchInput(input)) {
        return;
      }

      const now = Date.now();
      if (
        !searchStartedAtRef.value ||
        now - searchStartedAtRef.value > POS_SCAN_IDLE_MS * 3
      ) {
        searchStartedAtRef.value = now;
      }

      if (searchSubmitTimer) {
        clearTimeout(searchSubmitTimer);
      }

      searchSubmitTimer = setTimeout(() => {
        const code = input.value.trim();
        const duration = Date.now() - searchStartedAtRef.value;
        const rapid = isRapidWedgeInput(duration, code.length);
        // #region agent log
        debugScanLog(
          "usePosBarcodeWedge.ts:searchInput",
          "search input idle",
          { codeLength: code.length, durationMs: duration, rapid },
          "B",
        );
        // #endregion
        if (rapid) {
          submitCode(code, "search-rapid-idle");
          clearSearchRef.current?.();
        }
        searchStartedAtRef.value = 0;
      }, POS_SEARCH_SUBMIT_IDLE_MS);
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);

    const attachSearchListener = () => {
      const searchEl = document.getElementById(POS_PRODUCT_SEARCH_ID);
      if (!(searchEl instanceof HTMLInputElement)) {
        // #region agent log
        debugScanLog(
          "usePosBarcodeWedge.ts:attachSearch",
          "search input not found",
          {},
          "B",
        );
        // #endregion
        return null;
      }
      // #region agent log
      debugScanLog(
        "usePosBarcodeWedge.ts:attachSearch",
        "search input listener attached",
        { id: searchEl.id },
        "B",
      );
      // #endregion
      searchEl.addEventListener("input", handleSearchInput);
      return searchEl;
    };

    let searchEl = attachSearchListener();
    const domObserver = new MutationObserver(() => {
      if (!searchEl || !document.contains(searchEl)) {
        searchEl = attachSearchListener();
      }
    });
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
      searchEl?.removeEventListener("input", handleSearchInput);
      domObserver.disconnect();
      if (idleTimer) {
        clearTimeout(idleTimer);
      }
      if (searchSubmitTimer) {
        clearTimeout(searchSubmitTimer);
      }
    };
  }, [enabled]);
}

"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo } from "react";
import type { LabelOutput } from "@/lib/labels";
import { escapeHtml, printHtmlDocument } from "@/lib/print";

type PrintLabelModalProps = {
  labels: LabelOutput[];
  title: string;
  onClose: () => void;
  onPrint?: () => void;
};

const MODAL_ID = "prints-barcode";

type BootstrapModal = {
  show: () => void;
  hide: () => void;
};

function getBootstrapModal(el: Element): BootstrapModal | null {
  const bootstrap = (
    window as Window & {
      bootstrap?: {
        Modal?: {
          getOrCreateInstance: (element: Element) => BootstrapModal;
        };
      };
    }
  ).bootstrap;

  return bootstrap?.Modal?.getOrCreateInstance(el) ?? null;
}

function hidePrintLabelModal(): void {
  const modalEl = document.getElementById(MODAL_ID);
  if (!modalEl) {
    return;
  }

  const modal = getBootstrapModal(modalEl);
  if (modal) {
    modal.hide();
    return;
  }

  modalEl.classList.remove("show");
  modalEl.style.display = "none";
  modalEl.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
  document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
}

function showPrintLabelModal(): void {
  const modalEl = document.getElementById(MODAL_ID);
  if (!modalEl) {
    return;
  }

  const modal = getBootstrapModal(modalEl);
  if (modal) {
    modal.show();
    return;
  }

  modalEl.classList.add("show");
  modalEl.style.display = "block";
  modalEl.removeAttribute("aria-hidden");
  document.body.classList.add("modal-open");
}

function buildLabelPrintHtml(
  groups: { name: string; cards: LabelOutput[] }[],
): string {
  return groups
    .map((group) => {
      const cards = group.cards
        .map((label) => {
          const fields = label.print_fields;
          const lines: string[] = [];
          if (fields.store_name) {
            lines.push(`<h6>${escapeHtml(fields.store_name)}</h6>`);
          }
          if (fields.warehouse_name) {
            lines.push(`<p>${escapeHtml(fields.warehouse_name)}</p>`);
          }
          if (fields.product_name) {
            lines.push(`<p>${escapeHtml(fields.product_name)}</p>`);
          }
          if (fields.price) {
            lines.push(`<p>${escapeHtml(fields.price)}</p>`);
          }
          if (fields.ref_number) {
            lines.push(`<p>${escapeHtml(fields.ref_number)}</p>`);
          }
          lines.push(
            `<img src="data:image/png;base64,${label.image_base64}" alt="Label" />`,
          );
          return `<div class="label-card">${lines.join("")}</div>`;
        })
        .join("");

      return `<section class="label-group"><h5 class="label-group-title">${escapeHtml(group.name)}</h5><div class="label-grid">${cards}</div></section>`;
    })
    .join("");
}

export default function PrintLabelModal({
  labels,
  title,
  onClose,
  onPrint,
}: PrintLabelModalProps) {
  const groups = useMemo(() => {
    const map = new Map<string, LabelOutput[]>();
    for (const label of labels) {
      const name =
        label.print_fields.product_name ??
        label.print_fields.package_name ??
        label.entity_id;
      const bucket = map.get(name) ?? [];
      bucket.push(label);
      map.set(name, bucket);
    }
    return Array.from(map.entries()).map(([name, cards]) => ({ name, cards }));
  }, [labels]);

  useEffect(() => {
    if (labels.length === 0) {
      return;
    }

    showPrintLabelModal();
  }, [labels]);

  useEffect(() => {
    const modalEl = document.getElementById(MODAL_ID);
    if (!modalEl || labels.length === 0) {
      return;
    }

    const handleHidden = () => onClose();
    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    return () => modalEl.removeEventListener("hidden.bs.modal", handleHidden);
  }, [labels.length, onClose]);

  const handleClose = () => {
    hidePrintLabelModal();
    const modalEl = document.getElementById(MODAL_ID);
    const hasBootstrap = Boolean(
      (window as Window & { bootstrap?: { Modal?: unknown } }).bootstrap?.Modal,
    );
    if (!hasBootstrap || !modalEl) {
      onClose();
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
      return;
    }
    if (labels.length === 0) return;
    printHtmlDocument(buildLabelPrintHtml(groups), title);
  };

  if (labels.length === 0) {
    return null;
  }

  return (
    <div className="modal fade" id={MODAL_ID}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">{title}</h4>
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className="w-7 h-7 inline-flex items-center justify-center rounded-md bg-[#dc3545] text-white text-[16px] hover:bg-[#c82333]"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="p-4" id="label-print-area">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#dc3545] text-white text-[14px] font-medium hover:bg-[#c82333] transition-colors"
              >
                <i className="fas fa-print" />
                Print
              </button>
            </div>
            {groups.map((group) => (
              <div key={group.name} className="mb-5 last:mb-0">
                <h5 className="text-[15px] font-semibold text-[#212B36] border-b border-[#f1f1f1] pb-2 mb-4">
                  {group.name}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {group.cards.map((label, index) => (
                    <div
                      key={`${label.entity_id}-${index}`}
                      className="text-center border border-[#f1f1f1] rounded-md p-3 break-inside-avoid"
                    >
                      {label.print_fields.store_name && (
                        <h6 className="text-[14px] font-semibold text-[#212B36]">
                          {label.print_fields.store_name}
                        </h6>
                      )}
                      {label.print_fields.warehouse_name && (
                        <p className="m-0 text-[12px] text-[#646B72]">
                          {label.print_fields.warehouse_name}
                        </p>
                      )}
                      {label.print_fields.product_name && (
                        <p className="m-0 text-[13px] text-[#646B72]">
                          {label.print_fields.product_name}
                        </p>
                      )}
                      {label.print_fields.price && (
                        <p className="mb-2 text-[13px] text-[#646B72]">
                          {label.print_fields.price}
                        </p>
                      )}
                      {label.print_fields.ref_number && (
                        <p className="mb-2 text-[12px] text-[#646B72]">
                          {label.print_fields.ref_number}
                        </p>
                      )}
                      <img
                        src={`data:image/png;base64,${label.image_base64}`}
                        alt="Label"
                        className="mx-auto max-h-[120px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

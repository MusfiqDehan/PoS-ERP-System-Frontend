export const POS_OPEN_SCAN_EVENT = "pos-open-scan";

export function openPosScanInput(): void {
  window.dispatchEvent(new CustomEvent(POS_OPEN_SCAN_EVENT));
}

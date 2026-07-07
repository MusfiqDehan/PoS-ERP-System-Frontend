/** Open a minimal window and print only the provided HTML (not the host page). */

const LABEL_PRINT_STYLES = `
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 16px;
      color: #212b36;
    }
    .label-group { margin-bottom: 24px; page-break-inside: avoid; }
    .label-group-title {
      font-size: 15px;
      font-weight: 600;
      border-bottom: 1px solid #e7e7e7;
      padding-bottom: 8px;
      margin: 0 0 12px;
    }
    .label-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
    }
    .label-card {
      text-align: center;
      border: 1px solid #e7e7e7;
      border-radius: 6px;
      padding: 12px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .label-card h6 {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 4px;
    }
    .label-card p {
      margin: 0 0 4px;
      font-size: 12px;
      color: #646b72;
    }
    .label-card img {
      display: block;
      max-height: 120px;
      max-width: 100%;
      margin: 8px auto 0;
    }
    @media print {
      body { padding: 0; }
      @page { margin: 10mm; }
    }
  </style>
`;

export function printHtmlDocument(html: string, title: string): void {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) return;

  printWindow.document.write(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>${LABEL_PRINT_STYLES}</head><body>${html}</body></html>`,
  );
  printWindow.document.close();
  printWindow.focus();

  const triggerPrint = () => {
    printWindow.print();
    printWindow.close();
  };

  printWindow.onload = triggerPrint;
  window.setTimeout(triggerPrint, 400);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export { escapeHtml };

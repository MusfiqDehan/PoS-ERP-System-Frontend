// #region agent log
const DEBUG_SCAN_ENDPOINT =
  "http://127.0.0.1:7611/ingest/05e589f4-0bea-48a2-9a1e-b004f4726a7d";
const DEBUG_SCAN_SESSION = "92b417";

export function debugScanLog(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
  runId = "pre-fix",
): void {
  if (typeof window === "undefined") {
    return;
  }
  fetch(DEBUG_SCAN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": DEBUG_SCAN_SESSION,
    },
    body: JSON.stringify({
      sessionId: DEBUG_SCAN_SESSION,
      location,
      message,
      data,
      hypothesisId,
      runId,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

/** Parse `/scan/{code}` from a pathname (supports static-export + nginx fallback). */
export function extractPublicScanCode(pathname: string): string | null {
  const normalized = pathname.replace(/\/$/, "");
  const match = normalized.match(/^\/scan\/(.+)$/);
  if (!match?.[1]) {
    return null;
  }

  const raw = match[1];
  if (raw === "index.html") {
    return null;
  }

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

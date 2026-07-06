import { describe, expect, it } from "vitest";
import { escapeHtml } from "./print";

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml(`Tom & Jerry <script>"x"`)).toBe(
      "Tom &amp; Jerry &lt;script&gt;&quot;x&quot;",
    );
  });
});
